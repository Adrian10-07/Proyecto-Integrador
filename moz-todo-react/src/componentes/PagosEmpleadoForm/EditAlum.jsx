import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Logo2 from '../AlumnosForm/Alum-Add/AggAssets/Logo2.png'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FiSave } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";
import { height } from '@fortawesome/free-brands-svg-icons/fa42Group';
import { useLocation } from 'react-router-dom';

export default function EditAlum({}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const location = useLocation();
  let {id, nombre, apellido_p, apellido_m, grado, grupo, turno, noControl, tipo_estatus, curp, telefono,
    correo, nombre_tutor, apellidoP_tutor, apellidoM_tutor, telefono_tutor, nivelAcademico,
    escuelaProcedente, colegioAspirado, carreraAspirada, fechaInicioCurso, fechaExamenDiagnostico, 
    nivelMatematico, nivelAnalitico, nivelLinguistico, nivelComprension, nivelGeneral} = location.state || {};
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);


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

  const imprimirDatoDeUnAlumno = async () => {
        const url = 'http://localhost:3000/alumnos';

        fetch(`${url}/${valueId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al imprimir los alumnos: ' + response.status);
            }
            return response.json();
        })
        .then(response => {
            setData(response);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            setError(error.message);
        });
    };

    useEffect(() => {
        if (open) {
            imprimirDatoDeUnAlumno();
        }
    }, [open]);

    useEffect(() => {
        console.log('Recursos has been updated:', data);
    }, [data]);



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
                        <input type='text' placeholder='No. Control' id='inputNoControl' value={noControl}/>
                        <input type="text" placeholder='Nombre*' id='inputNombre'value={nombre} />
                        <input type="text" placeholder='Apellido Paterno*' id='inputApellidoP' value={apellido_p} />
                        <input type="text" placeholder='Apellido Materno*' id='inputApellidoM' value={apellido_m}/>
                    </div>
                    <div className='con1'>
                        <input type='number' placeholder='Grado*' id='inputGrado' value={grado}/>
                        <input type='text' placeholder='Grupo*' id='inputGrupo' value={grupo}/>
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
  );
}