import React from 'react'
import './AggAlumno.css'
import Logo2 from './AggAssets/Logo2.png'
import { FiSave } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';


    

export default function AggAlumno() {
    const handleSaveClick = () => {
        Swal.fire({
          title: "Do you want to save the changes?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Save",
          denyButtonText: `Don't save`
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire("Saved!", "", "success");
            mandarALaBaseDeDatos();
          } else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "info");
          }
        });
    }

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
          })
    }

    const navigate = useNavigate();

    const mandarALaBaseDeDatos = () => {
        const url = "http://localhost:3000/alumnos/addAlumno";
        let data = {
            nombre: "", 
            apellido_p: "", 
            apellido_m: "", 
            grado: "", 
            grupo: "", 
            turno: "", 
            noControl: "", 
            estado: "", 
            curp: "", 
            telefono: "", 
            correo: "", 
            nombre_tutor: "", 
            apellido_p_tutor: "", 
            apellido_m_tutor: "", 
            telefono_tutor: "", 
            nivelAcademico: "", 
            escuelaProcedente: "", 
            colegioAspirado: "", 
            carreraAspirada: "", 
            fechaInicioCurso: "", 
            fechaExamenDiagnostico: "", 
            nivelMatematico: "", 
            nivelAnalitico: "", 
            nivelLinguistico: "", 
            nivelComprension: "", 
            nivelGeneral: ""
        };

        let registrarNombre = document.getElementById("inputNombre").value;
        let registrarApellidoP = document.getElementById("inputApellidoP").value;
        let registrarApellidoM = document.getElementById("inputApellidoM").value;
        let registrarGrado = document.getElementById("inputGrado").value;
        let registrarGrupo = document.getElementById("inputGrupo").value;
        let registrarTurno = document.getElementById("inputTurno").value;
        let registrarNoControl = document.getElementById("inputNoControl").value;
        let registrarEstado = document.getElementById("inputEstatus").value;
        let registrarCurp = document.getElementById("inputCurp").value;
        let registrarTelefono = document.getElementById("inputTelefono").value;
        let registrarCorreo = document.getElementById("inputCorreo").value;
        let registrarNombreTutor = document.getElementById("inputNombreTutor").value;
        let registrarApellidoPTutor = document.getElementById("inputApellidoPTutor").value;
        let registrarApellidoMTutor = document.getElementById("inputApellidoMTutor").value;
        let registrarTelefonoTutor = document.getElementById("inputTelefonoTutor").value;
        let registrarlvlAcademico = document.getElementById("inputlvlAcademic").value;
        let registrarSchoolProcedente = document.getElementById("inputColegioProveniente").value;
        let registrarUniAspirada = document.getElementById("inputUniversidadAspira").value;
        let registrarCarreraAspirada = document.getElementById("inputCarreraAspira").value;
        let registrarFechaCurso = document.getElementById("inputFechaCurso").value;
        let registrarFechaExamen = document.getElementById("inputFechaExamen").value;
        let registrarlvlMatematic = document.getElementById("inputMatScore").value;
        let registrarlvlAnalitic = document.getElementById("inputAnalitScore").value;
        let registrarlvlLang = document.getElementById("inputLangScore").value;
        let registrarlvlCompren = document.getElementById("inputLectScore").value;
        let registrarlvlGeneral = document.getElementById("inputGenScore").value;

        if (!registrarNoControl || !registrarNombre || !registrarApellidoP && !registrarApellidoM || !registrarGrado || !registrarGrupo || !registrarTurno || !registrarEstado || !registrarTelefono || !registrarCorreo || !registrarCurp || !registrarlvlAcademico || !registrarNombreTutor || !registrarApellidoPTutor || !registrarApellidoMTutor || !registrarTelefonoTutor) {
            console.log("Hay campos obligatorios sin llenar");
            // Agregar logica del error
        } else {
            data.nombre = registrarNombre;
            data.apellido_p = registrarApellidoP;
            data.apellido_m = registrarApellidoM;
            data.grado = registrarGrado;
            data.grupo = registrarGrupo;
            data.turno = registrarTurno;
            data.noControl = registrarNoControl;
            data.estado = registrarEstado;
            data.curp = registrarCurp;
            data.telefono = registrarTelefono;
            data.correo = registrarCorreo;
            data.nombre_tutor = registrarNombreTutor;
            data.apellido_p_tutor = registrarApellidoPTutor;
            data.apellido_m_tutor = registrarApellidoMTutor;
            data.telefono_tutor = registrarTelefonoTutor;
            data.nivelAcademico = registrarlvlAcademico;
            if (registrarSchoolProcedente) data.escuelaProcedente = registrarSchoolProcedente;
            if (registrarUniAspirada) data.colegioAspirado = registrarUniAspirada;
            if (registrarCarreraAspirada) data.carreraAspirada = registrarCarreraAspirada;
            if (registrarFechaCurso) data.fechaInicioCurso = registrarFechaCurso; else data.fechaInicioCurso = null;
            if (registrarFechaExamen) data.fechaExamenDiagnostico = registrarFechaExamen; else data.fechaExamenDiagnostico = null;
            if (registrarlvlMatematic) data.nivelMatematico = registrarlvlMatematic; else data.nivelMatematico = 0;
            if (registrarlvlAnalitic) data.nivelAnalitico = registrarlvlAnalitic; else data.nivelAnalitico = 0;
            if (registrarlvlLang) data.nivelLinguistico = registrarlvlLang; else data.nivelLinguistico = 0;
            if (registrarlvlCompren) data.nivelComprension = registrarlvlCompren; else data.nivelComprension = 0;
            if (registrarlvlGeneral) data.nivelGeneral = registrarlvlGeneral; else data.nivelGeneral = 0;

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
                        navigate('/alumnos');
                    }, 3000);
                })
                .catch(error => {
                    console.error('Error: ', error);
                    //Agregar lógica para manejar el error en la interfaz de usuario
                });
        }
    };



  return (
    <div>
        <header className='header'>
            <img src={Logo2} alt="Left" className='header-image-left' />
             Datos del Alumno
             <img src={Logo2} alt="Left" className='header-image-rigth' />

        </header>

        <div className='Inputsagg'>
        <div className='D-Alumno'>
                    <p>Siendo los campos con * obligatorios</p>
                    <div className='con1'>
                        <input type='text' placeholder='No. Control' id='inputNoControl' />
                        <input type="text" placeholder='Nombre*' id='inputNombre' />
                        <input type="text" placeholder='Apellido Paterno*' id='inputApellidoP' />
                        <input type="text" placeholder='Apellido Materno*' id='inputApellidoM' />
                    </div>
                    <div className='con1'>
                        <input type='number' placeholder='Grado*' id='inputGrado' />
                        <input type='text' placeholder='Grupo*' id='inputGrupo' />
                        <select id='inputTurno'>
                            <option>--Seleccionar turno*--</option>
                            <option value={1}>Matutino</option>
                            <option value={2}>Vespertino</option>
                        </select>
                        <select id='inputEstatus'>
                            <option>--Seleccionar Estatus*--</option>
                            <option value={1}>Activo</option>
                            <option value={2}>Inactivo</option>
                            <option value={3}>Dado de baja</option>
                            <option value={4}>Egresado</option>
                        </select>
                    </div>
                    <div className='con2'>
                        <input type="number" placeholder='Telefono*' id='inputTelefono' />
                        <input type="text" placeholder='Correo Electronico*' id='inputCorreo' />
                        <input type="text" placeholder='CURP*' id='inputCurp' />
                    </div>
                    <div className='con4'>
                        <input type="text" placeholder='Nivel académico actual' id='inputlvlAcademic' />
                    </div>
                </div>
                <div>
                    <h2>Datos del Tutor</h2>
                    <div className='D-Tutor'>
                        <input type="text" placeholder='Nombre*' id='inputNombreTutor' />
                        <input type="text" placeholder='Apellido Paterno*' id='inputApellidoPTutor' />
                        <input type="text" placeholder='Apellido Materno*' id='inputApellidoMTutor' />
                        <input type="number" placeholder='Telefono*' id='inputTelefonoTutor' />
                    </div>
                </div>
                <div>
                    <h2>Datos del Examen de Diagnostico del curso Pre-universitario</h2>
                    <div className='D-Diagnostico'>
                        <h4>Examen Diagnostico Ceneval "EXANII II"</h4>
                        <div className='con5'>
                            <input type='text' placeholder='Colegio de proveniencia' id='inputColegioProveniente' />
                            <input type="text" placeholder='Universidad a la que aplica' id='inputUniversidadAspira' />
                            <input type="text" placeholder='Carrera a la que aplica' id='inputCarreraAspira' />
                        </div>
                        <div className='con1'>
                            <label>Fecha de inicio del curso</label>
                            <input type='date' id='inputFechaCurso' />
                            <label>Fecha del examen de Diagnostico</label>
                            <input type='date' id='inputFechaExamen' />
                        </div>
                        <h4>Puntajes del examen</h4>
                        <div className='con5'>
                            <input type="number" placeholder='Pensamiento Matematico' id='inputMatScore' />
                            <input type="number" placeholder='Pensamiento Analitico' id='inputAnalitScore' />
                            <input type="number" placeholder='Estructura de la lengua' id='inputLangScore' />
                            <input type="number" placeholder='Comprension Lectora' id='inputLectScore' />
                        </div>
                        <div className='con6'>
                            <input type="number" placeholder='Puntaje general' id='inputGenScore' />
                        </div>
                    </div>
                </div>
            <div className='botones'>

            <button onClick={handleCancelClick} className='uno'><MdOutlineCancel className='icon-cancel' /></button>
            <button onClick={handleSaveClick} className='dos'><FiSave className='icon-save'/></button>

            </div>

        </div>


      
    </div>
  )
}
