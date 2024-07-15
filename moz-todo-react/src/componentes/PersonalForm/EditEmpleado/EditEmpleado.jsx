import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiSave } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";
import { useState } from 'react';
//import Logo2 from '../AlumnosForm/Alum-Add/AggAssets/Logo2.png';
import Swal from 'sweetalert2';

export default function EditEmpleado (){
    const [coincidencias, setCoincidencias] = useState([]);
    const location = useLocation();
    const { data } = location.state || {};
    console.log(data.id)

    const handleSaveClick = () => {
        Swal.fire({
            title: "¿Desea guardar los cambios?",
            showCancelButton: true,
            confirmButtonText: "Guardar",
        }).then((result) => {
            if (result.isConfirmed) {
                actualizarEmpleado();
            }
        });
    };

    const handleCancelClick = () =>{
        Swal.fire({
            title: "Cancelar actualización ¿?",
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

    if (!data) {
        return <div>No data available</div>;
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

    const comprobarSiExisteElEmpleado = async (nombreEmpleado, apellidoPEmpleado, apellidoMEmpleado) => {
        const url = `http://localhost:3000/empleados/comprobarPersonal`;

        const comprobarEmpleado = {
            nombreComp : nombreEmpleado, 
            apellido_pComp : apellidoPEmpleado, 
            apellido_mComp : apellidoMEmpleado
        }

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(comprobarEmpleado)
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

    const actualizarEmpleado = async () => {
            const url = `http://localhost:3000/empleados/updatePersonal/${data.id}`

            let dato = {
                nombre : "", 
                apellido_p : "", 
                apellido_m : "", 
                telefono : "", 
                correo : "", 
                curp : "", 
                sueldoHora : "",
                id_estatus : "",
                id_cargo : "", 
                id_area : ""
            }

            let nombreRegistro = document.getElementById("inputNombre").value;
            let apellido_pRegistro = document.getElementById("inputApellidoP").value;
            let apellido_mRegistro = document.getElementById("inputApellidoM").value;
            let telefonoRegistro = document.getElementById("inputTelefono").value;
            let correoRegistro = document.getElementById("inputCorreo").value;
            let curpRegistro = document.getElementById("inputCurp").value;
            let areaRegistro = document.getElementById("selectArea").value;
            let cargoRegistro = document.getElementById("selectCargo").value;
            let sueldoRegisro = document.getElementById("inputSueldo").value;
            let estatusRegistro = document.getElementById("selectEstatus").value;

            if(areaRegistro == 0 || cargoRegistro == 0 || estatusRegistro == 0){
                Swal.fire({
                    title: "Error",
                    text: "No olvide seleccionar el área, cargo y estatus del empleado",
                    icon: "error",
                    timer: 1000
                });
                return false;
            } else if(await comprobarSiExisteElEmpleado(nombreRegistro, apellido_pRegistro, apellido_mRegistro)){
                Swal.fire({
                    title: "Error",
                    text: "Al parecer ya está registrado este empleado",
                    icon: "error",
                    timer: 1000
                });
                return false;
            }else{
                if(nombreRegistro) dato.nombre = nombreRegistro; else dato.nombre = data.nombre;
                if(apellido_pRegistro) dato.apellido_p = apellido_pRegistro; else dato.apellido_p = data.apellido_p;
                if(apellido_mRegistro) dato.apellido_m = apellido_mRegistro; else dato.apellido_m = data.apellido_m;
                if(telefonoRegistro){
                    if(!comprobarSiEsNumero(telefonoRegistro)){
                        Swal.fire({
                            title: "Error",
                            text: "Número de teléfono inválido",
                            icon: "error",
                            timer: 1000
                        });
                        dato.telefono = data.telefono; 
                        return false;
                    } else dato.telefono = telefonoRegistro; 
                } else dato.telefono = data.telefono;
                if(correoRegistro) dato.correo = correoRegistro; else dato.correo = data.correo;
                if(curpRegistro) dato.curp = curpRegistro; else dato.curp = data.curp;
                dato.id_area = areaRegistro;
                dato.id_cargo = cargoRegistro;
                if(sueldoRegisro){
                    if(!comprobarSiElSueldoEsValido(sueldoRegisro) || sueldoRegisro <= 0 || sueldoRegisro > 100000.00){
                        Swal.fire({
                            title: "Error",
                            text: "Ingrese un monto válido",
                            icon: "error",
                            timer: 1000
                        });
                        dato.sueldoHora = data.sueldoHora;
                        return false; 
                    } else dato.sueldoHora = sueldoRegisro;
                } else dato.sueldoHora = data.sueldoHora;
                dato.id_estatus = estatusRegistro;

                fetch(url, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(dato)
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
                        text: "Empleado actualizado correctamente",
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
    };

    return(
    <div>
        <header className='header'>
            <h1>             Datos del Empleado
            </h1>

        </header>

        <div className='Inputsagg'>
            <div className='D-Alumno'>
                    <div className='con1'>
                        <input type="text" placeholder={data.nombre} id='inputNombre' maxLength={45}/>
                        <input type="text" placeholder={data.apellido_p} id='inputApellidoP' maxLength={45}/>
                        <input type="text" placeholder={data.apellido_m} id='inputApellidoM' maxLength={45}/>
                        <select id='selectEstatus'>
                            <option id='status' value={0}>Seleccionar status</option>
                            <option value={1}>Activo</option>
                            <option value={2}>Inactivo</option>
                            <option value={3}>Dado de baja</option>
                        </select>
                    </div>
                    <div className='con2'>
                        <input type="tel" placeholder={data.telefono} id='inputTelefono' maxLength={12}/>
                        <input type="email" placeholder={data.correo} id='inputCorreo' maxLength={45} />
                        <input type="text" placeholder={data.curp} id='inputCurp' maxLength={18}/>
                    </div>
                    <div className='con1'>
                        <select id="selectArea">
                            <option value={0}>Seleccionar Area</option>
                            <option value={1}>Dirección General</option>
                            <option value={2}>Dirección Administrativa</option>
                            <option value={3}>Dirección Académica</option>
                            <option value={4}>Dirección de Orientación Vocacional</option>
                            <option value={5}>Apoyo Contable y Administrativo</option>
                            <option value={6}>Cafetería</option>
                            <option value={7}>Limpieza y Servicios</option>
                        </select>
                        <select id="selectCargo">
                            <option value={0}>Seleccionar Cargo</option>
                            <option value={2}>Coordinador</option>
                            <option value={3}>Administrativo</option>
                            <option value={4}>Directivo</option>
                            <option value={5}>Contador</option>
                        </select>
                        <input type="number" placeholder={data.sueldoHora} id="inputSueldo" maxLength={8}/>
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