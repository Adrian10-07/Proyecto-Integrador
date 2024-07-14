import * as React from 'react';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiSave } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";
import FilaMateria from './FilaMateria/FilaMateria';
//import Logo2 from '../AlumnosForm/Alum-Add/AggAssets/Logo2.png';
import Swal from 'sweetalert2';

export default function EditProfesor (){
    const location = useLocation();
    const [dataMat, setDataMat] = useState([]);
    const [error, setError] = useState(null);
    const { data } = location.state || {};
    console.log(data.id)

    const handleSaveClick = () => {
        Swal.fire({
            title: "¿Desea guardar los cambios?",
            showCancelButton: true,
            confirmButtonText: "Guardar",
        }).then((result) => {
            if (result.isConfirmed) {
                actualizarMaestro()
                    .then(success => {
                        if (success) {
                            Swal.fire("Registro actualizado!", "", "success");
                        } else {
                            Swal.fire("Error, asegurese de elegir el estatus y especialidad", "", "error");
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

    const actualizarMaestro = () => {
        return new Promise ((resolve, reject) => {
            const url = `http://localhost:3000/empleados/updateProfesor/${data.id}`

            let dato = {
                nombre : "", 
                apellido_p : "", 
                apellido_m : "", 
                telefono : "", 
                correo : "", 
                curp : "", 
                sueldoPorHora : "",
                id_estatus : "",
                id_especialidad : ""
            }

            let nombreRegistro = document.getElementById("inputNombre").value;
            let apellido_pRegistro = document.getElementById("inputApellidoP").value;
            let apellido_mRegistro = document.getElementById("inputApellidoM").value;
            let telefonoRegistro = document.getElementById("inputTelefono").value;
            let correoRegistro = document.getElementById("inputCorreo").value;
            let curpRegistro = document.getElementById("inputCurp").value;
            let especialidadRegistro = document.getElementById("selectEspecialidad").value
            let sueldoRegisro = document.getElementById("inputSueldo").value;
            let estatusRegistro = document.getElementById("selectEstatus").value;

            if(especialidadRegistro == 0 || estatusRegistro == 0){
                resolve(false);
            }
            else{
                if(nombreRegistro) dato.nombre = nombreRegistro; else dato.nombre = data.nombre;
                if(apellido_pRegistro) dato.apellido_p = apellido_pRegistro; else dato.apellido_p = data.apellido_p;
                if(apellido_mRegistro) dato.apellido_m = apellido_mRegistro; else dato.apellido_m = data.apellido_m;
                if(telefonoRegistro) dato.telefono = telefonoRegistro; else dato.telefono = data.telefono;
                if(correoRegistro) dato.correo = correoRegistro; else dato.correo = data.correo;
                if(curpRegistro) dato.curp = curpRegistro; else dato.curp = data.curp;
                dato.id_especialidad = especialidadRegistro;
                if(sueldoRegisro) dato.sueldoPorHora = sueldoRegisro; else dato.sueldoPorHora = data.sueldoPorHora;
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

    const imprimirMateriasDelProfesor = () => {
        const url = `http://localhost:3000/empleados/showMat`

        fetch(`${url}/${data.id}`)
        .then(response => {
            if (!response.ok) {
              throw new Error('Error al imprimir los datos del profesor: ' + response.status);
            }
            return response.json();
        })
        .then(response => {
            setDataMat(response);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            setError(error.message);
        });
    }

    const agregarMateria = () => {
        const url = `http://localhost:3000/empleados/materias`

        let dataMateria = {
            idMateria : "",
            idMaestro : data.id
        }

        let registrarMateria = document.getElementById("selectMateria").value;
        if(!registrarMateria)
            console.log("Seleccione una materia")
        else{

            dataMateria.idMateria = registrarMateria;

            fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(dataMateria)
            })
            .then(response => {
              if(!response.ok){
                throw new Error('Error al imprimir los alumnos: ' + response.status);
              }
              return response.json();
            })
              //Si todo esta bien, recibe la respuesta
            .then(response => {
                console.log("Se agrego la materia : ", response)
                imprimirMateriasDelProfesor();
            })
            .catch(error => {
                setError(error.message);
            });
        }
    }

    useEffect(() => {
        imprimirMateriasDelProfesor();
    }, []);

    return (
    <div>
        <header className='header'>
            <h1>             Datos del Profesor
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
                        <select id="selectEspecialidad">
                            <option value={0}>Seleccionar especialidad</option>
                            <option value={1}>Ciencias: Físico-Matemático</option>
                            <option value={2}>Ciencias: Químico-Biológicas</option>
                            <option value={3}>Ciencias Sociales y Humanidades</option>
                            <option value={4}>Lengua y Comunicación</option>
                        </select>
                        <input type="number" placeholder={data.sueldoPorHora} id="inputSueldo" maxLength={8}/>
                    </div>
                    <div className='con1'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Materias</th>
                                    <th>Opción</th>
                                </tr>
                                
                            </thead>
                            <tbody>
                                {error && <tr><td>Error: {error}</td></tr>}
                                {!dataMat.length && <tr><td>No imparte ninguna Materia</td></tr>}
                                {!error && dataMat.length > 0 && (
                                    dataMat.map((materia, index) => (
                                        <FilaMateria key={index} idProfesor={data.id} idMateria={materia.id} nombreMateria={materia.nombre} actualizar={imprimirMateriasDelProfesor}/>
                                    ))
                                )}
                                <tr>
                                    <td><select id='selectMateria'>
                                        <option value="">Seleccionar materia</option>
                                        <option value={1}>Pensamiento Matemático</option>
                                        <option value={2}>Pensamiento Analítico</option>
                                        <option value={3}>Física</option>
                                        <option value={4}>Química</option>
                                        <option value={5}>Biología</option>
                                        <option value={6}>Ciencias de la Salud</option>
                                        <option value={7}>Historia Universal y de México</option>
                                        <option value={8}>Geografia</option>
                                        <option value={9}>Filosofía</option>
                                        <option value={10}>Estructura de la Lengua</option>
                                        <option value={11}>Comprensión Lectora</option>
                                        <option value={12}>Literatura</option>
                                    </select></td>
                                    <td><button onClick={agregarMateria}>Agregar</button></td>
                                </tr>
                            </tbody>
                        </table>
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