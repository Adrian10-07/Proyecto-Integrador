import React from "react";
import Logo2 from '../../AlumnosForm/Alum-Add/AggAssets/Logo2.png';
import { FiSave } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

export default function AddEmpleado (){

    const handleSaveClick = () => {
        Swal.fire({
            title: "¿Desea guardar los cambios?",
            showCancelButton: true,
            confirmButtonText: "Guardar",
        }).then((result) => {
            if (result.isConfirmed) {
                realizarRegistro()
                    .then(success => {
                        if (success) {
                            Swal.fire("Registro guardado!", "", "success");
                        } else {
                            Swal.fire("Error, asegurese de llenar todos los campos", "", "error");
                        }
                    })
                    .catch(error => {
                        Swal.fire("Error al guardar los cambios", error.message, "error");
                    });
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
                  navigate('/alumnos');
              }, 1000);
            }
          })
    }

    const navigate = useNavigate();

    const realizarRegistro = () => {
        return new Promise ((resolve, reject) => {
            const url = "http://localhost:3000/empleados/addPersonal";
            let data = {
                nombre : "", 
                apellido_p : "", 
                apellido_m : "", 
                telefono : "", 
                correo : "", 
                curp : "", 
                sueldoHora : "", 
                id_cargo : "", 
                id_area : ""          
            };

            let nombreRegistro = document.getElementById("inputNombre").value;
            let apellido_pRegistro = document.getElementById("inputApellidoP").value;
            let apellido_mRegistro = document.getElementById("inputApellidoM").value;
            let telefonoRegistro = document.getElementById("inputTelefono").value;
            let correoRegistro = document.getElementById("inputCorreo").value;
            let curpRegistro = document.getElementById("inputCurp").value;
            let areaRegistro = document.getElementById("selectArea").value;
            let cargoRegistro = document.getElementById("selectCargo").value;
            let sueldoRegisro = document.getElementById("inputSueldo").value;

            if(!nombreRegistro || !apellido_pRegistro || !apellido_mRegistro || !telefonoRegistro || !correoRegistro || !curpRegistro || !areaRegistro || !cargoRegistro || !sueldoRegisro){
                //Mensaje de error
                resolve(false);
            }
            else {
                data.nombre = nombreRegistro;
                data.apellido_p = apellido_pRegistro;
                data.apellido_m = apellido_mRegistro;
                data.telefono = telefonoRegistro;
                data.correo = correoRegistro;
                data.curp = curpRegistro;
                data.sueldoHora = sueldoRegisro;
                data.id_cargo = cargoRegistro;
                data.id_area = areaRegistro;

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
                    resolve(true)
                    setTimeout(() => {
                        navigate('/empleados');
                    }, 1000);
                })
                .catch(error => {
                    console.error('Error: ', error);
                    //Agregar lógica para manejar el error en la interfaz de usuario
                });
            }
            
        });
    }

    return(
    <div>
        <header className='header'>
            <img src={Logo2} alt="Left" className='header-image-left' />
            <h1>             Datos del Empleado
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
                        <select id="selectArea">
                            <option value="">Seleccionar Area</option>
                            <option value={1}>Dirección General</option>
                            <option value={2}>Dirección Administrativa</option>
                            <option value={3}>Dirección Académica</option>
                            <option value={4}>Dirección de Orientación Vocacional</option>
                            <option value={5}>Apoyo Contable y Administrativo</option>
                            <option value={6}>Cafetería</option>
                            <option value={7}>Limpieza y Servicios</option>
                        </select>
                        <select id="selectCargo">
                            <option value="">Seleccionar Cargo</option>
                            <option value={2}>Coordinador</option>
                            <option value={3}>Administrativo</option>
                            <option value={4}>Directivo</option>
                            <option value={5}>Contador</option>
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