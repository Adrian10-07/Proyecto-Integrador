import React from "react";
import Logo2 from '../../AlumnosForm/Alum-Add/AggAssets/Logo2.png';
import { FiSave } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import { useState } from "react";

export default function AddProfesor (){
    const [coincidencias, setCoincidencias] = useState([]);

    const handleSaveClick = () => {
        Swal.fire({
            title: "¿Desea guardar los cambios?",
            showCancelButton: true,
            confirmButtonText: "Guardar",
        }).then((result) => {
            if (result.isConfirmed) {
                realizarRegistro();
            }
        });
    };

    const handleCancelClick = () =>{
        Swal.fire({
            title: "Cancelar Registro ¿?",
            text: "Se borraran los datos ingresados",
            icon: "warning",
            showCancelButton: true,
            cancelButtonColor: "#3085d6",
            confirmButtonColor: "#d33",
            confirmButtonText: "Si, Cancelar Registro",
            cancelButtonText: "Volver al Registro",
          }).then((result) => {
            if (result.isConfirmed) {
              setTimeout(() => {
                  navigate('/empleados');
              }, 1000);
            }
          })
    }

    const navigate = useNavigate();

    const comprobarSiEsNumero = (cadenaAAnalizar) => {
        var valoresAceptados = /^[0-9]+$/;
        if (valoresAceptados.test(cadenaAAnalizar)){
            console.log(cadenaAAnalizar + " es un valor valido")
            return true;
        } else {
            console.log(cadenaAAnalizar + " no es un valor valido")
            return false;
        }
    }

    const comprobarSiElSueldoEsValido = (comprobarMonto) => {
        const valoresAceptados = /^-?\d+(\.\d+)?$/;
        if (valoresAceptados.test(comprobarMonto)) {
            console.log(comprobarMonto + " es un valor válido");
            return true;
        } else {
            console.log(comprobarMonto + " no es un valor válido");
            return false;
        }
    }

    const comprobarSiExisteElMaestro = async (nombreEmpleado, apellidoPEmpleado, apellidoMEmpleado) => {
        const url = `http://localhost:3000/empleados/comprobarProfesores`;

        const comprobarProfe = {
            nombreComp : nombreEmpleado, 
            apellido_pComp : apellidoPEmpleado, 
            apellido_mComp : apellidoMEmpleado
        }

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(comprobarProfe)
            });
    
            if (!response.ok) {
                throw new Error('Error al buscar coincidencias: ' + response.status);
            }
    
            const data = await response.json();
            setCoincidencias(data);
    
            if (data.length > 0) {
                console.log("Hay coincidencias: " + data);
                return true;
            } else {
                console.log("No hay coincidencias");
                return false;
            }
        } catch (error) {
            console.log("Error: " + error);
            return false;
        }
    }

    const realizarRegistro = async () => {
            const url = "http://localhost:3000/empleados/addProfesor";
            let data = {
                nombre : "", 
                apellido_p : "", 
                apellido_m : "", 
                telefono : "", 
                correo : "", 
                curp : "", 
                sueldoPorHora : "", 
                id_especialidad : ""      
            };

            let nombreRegistro = document.getElementById("inputNombre").value;
            let apellido_pRegistro = document.getElementById("inputApellidoP").value;
            let apellido_mRegistro = document.getElementById("inputApellidoM").value;
            let telefonoRegistro = document.getElementById("inputTelefono").value;
            let correoRegistro = document.getElementById("inputCorreo").value;
            let curpRegistro = document.getElementById("inputCurp").value;
            let especialidadRegistro = document.getElementById("selectEspecialidad").value
            let sueldoRegisro = document.getElementById("inputSueldo").value;

            if(!nombreRegistro || !apellido_pRegistro || !apellido_mRegistro || !telefonoRegistro || !correoRegistro || !curpRegistro || !especialidadRegistro || !sueldoRegisro){
                Swal.fire({
                    title: "Error",
                    text: "Hay campos obligatorios sin llenar",
                    icon: "error",
                    timer: 1000
                });
                return false;
            } else if (!comprobarSiEsNumero(telefonoRegistro) || !comprobarSiElSueldoEsValido(sueldoRegisro)){
                Swal.fire({
                    title: "Error",
                    text: "Datos inválidos en los campos numéricos",
                    icon: "error",
                    timer: 1000
                });
                return false;
            }else if(sueldoRegisro <= 0 || sueldoRegisro > 100000.00){
                Swal.fire({
                    title: "Error",
                    text: "Ingrese un monto válido",
                    icon: "error",
                    timer: 1000
                });
                return false;
            }else if(await comprobarSiExisteElMaestro(nombreRegistro, apellido_pRegistro, apellido_mRegistro)){
                Swal.fire({
                    title: "Error",
                    text: "Al parecer ya está registrado este maestro",
                    icon: "error",
                    timer: 1000
                });
                return false;
            }else {
                data.nombre = nombreRegistro;
                data.apellido_p = apellido_pRegistro;
                data.apellido_m = apellido_mRegistro;
                data.telefono = telefonoRegistro;
                data.correo = correoRegistro;
                data.curp = curpRegistro;
                data.sueldoPorHora = sueldoRegisro;
                data.id_especialidad = especialidadRegistro;

                fetch(url, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data)
                })
                .then(response => {
                    if (!response.ok) {
                        return response.json().then(errorData => {
                            throw new Error(errorData.error);
                        });
                    }
                    return response.json();
                })
                .then(data => {
                    console.log("Alumno registrado: ", data);
                    setTimeout(() => {
                        navigate('/empleados');
                    }, 1000);
                    Swal.fire({
                        title: "Éxito",
                        text: "Empleado registrado correctamente",
                        icon: "success",
                        timer: 1000
                    });
                    return true;
                })
                .catch(error => {
                    console.error('Error: ', error);
                    let errorMessage = "Error desconocido";
                    if (error.message.includes("NetworkError")) {
                        errorMessage = "Error de red, por favor revisa tu conexión";
                    } else if (error.message.includes("404")) {
                        errorMessage = "Endpoint no encontrado";
                    } else if (error.message.includes("500")) {
                        errorMessage = "Error interno del servidor";
                    } else if (error.message.includes("datos duplicados")) {
                        errorMessage = "Datos duplicados, por favor revisa la información ingresada";
                    }
                    Swal.fire({
                        title: "Error",
                        text: errorMessage,
                        icon: "error",
                        timer: 1000
                    });
                    return false;
                });
            }
    }


    return (
    <div>
        <header className='header'>
            <img src={Logo2} alt="Left" className='header-image-left' />
            <h1>             Datos del Profesor
            </h1>
             <img src={Logo2} alt="Left" className='header-image-rigth' />

        </header>

        <div className='Inputsagg'>
            <div className='D-Alumno'>
                    <p id='CO'>Todos los campos son obligatorios</p>
                    <div className='con1'>
                        <input type="text" placeholder='Nombre' id='inputNombre' maxLength={45}/>
                        <input type="text" placeholder='Apellido Paterno' id='inputApellidoP' maxLength={45}/>
                        <input type="text" placeholder='Apellido Materno' id='inputApellidoM' maxLength={45}/>
                    </div>
                    <div className='con2'>
                        <input type="tel" placeholder='Telefono' id='inputTelefono' maxLength={12}/>
                        <input type="email" placeholder='Correo Electronico' id='inputCorreo' maxLength={45} />
                        <input type="text" placeholder='CURP' id='inputCurp' maxLength={18}/>
                    </div>
                    <div className='con1'>
                        <select id="selectEspecialidad">
                            <option value="">Seleccionar especialidad</option>
                            <option value={1}>Ciencias: Físico-Matemático</option>
                            <option value={2}>Ciencias: Químico-Biológicas</option>
                            <option value={3}>Ciencias Sociales y Humanidades</option>
                            <option value={4}>Lengua y Comunicación</option>
                        </select>
                        <input type="number" placeholder="Sueldo por hora" id="inputSueldo" maxLength={8}/>
                    </div>
                </div>
            <div className='botones'>

                <button onClick={handleCancelClick} className='uno'><MdOutlineCancel className='icon-cancel' /></button>
                <button onClick={handleSaveClick} className='dos'><FiSave className='icon-save'/></button>

            </div>
        </div>
    </div>
    );
}