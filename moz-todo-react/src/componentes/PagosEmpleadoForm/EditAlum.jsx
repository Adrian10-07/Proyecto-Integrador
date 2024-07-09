import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiSave } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";
import Logo2 from '../AlumnosForm/Alum-Add/AggAssets/Logo2.png';
import Swal from 'sweetalert2';

export default function EditAlum() {
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
            mandarCambiosALaBaseDeDatos()
                .then(success => {
                    if (success) {
                        Swal.fire("Cambios guardados!", "", "success");
                    } else {
                        Swal.fire("Error, asegurese de seleccionar el turno y el estatus del alumno", "", "error");
                    }
                })
                .catch(error => {
                    Swal.fire("Error al guardar los cambios", error.message, "error");
                });
        }
    });
  };
  const handleCancelClick = () => {
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

  };

  if (!data) {
    return <div>No data available</div>;
  }

  const navigate = useNavigate();

  const mandarCambiosALaBaseDeDatos = () => {
    return new Promise((resolve, reject) => {
      const url = `http://localhost:3000/alumnos/update/${data.id}`;
      let dato = {
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

    if (registrarTurno == 0 || registrarEstado == 0) {
        console.log("No olvide elegir el turno y estatus");
        resolve(false)
        // Agregar logica del error
    } else {
        if(registrarNombre) dato.nombre = registrarNombre; else dato.nombre = data.nombre;
        if(registrarApellidoP) dato.apellido_p = registrarApellidoP; else dato.apellido_p = data.apellido_p;
        if(registrarApellidoM) dato.apellido_m = registrarApellidoM; else dato.apellido_m = data.apellido_m;
        if(registrarGrado) dato.grado = registrarGrado; else dato.grado = data.grado;
        if(registrarGrupo) dato.grupo = registrarGrupo; else dato.grupo = data.grupo;
        dato.turno = registrarTurno;
        if(registrarNoControl) dato.noControl = registrarNoControl; else dato.noControl = data.noControl;
        dato.estado = registrarEstado;
        if(registrarCurp) dato.curp = registrarCurp; else dato.curp = data.curp;
        if(registrarTelefono) dato.telefono = registrarTelefono; else dato.telefono = data.telefono;
        if(registrarCorreo) dato.correo = registrarCorreo; else dato.correo = data.correo;
        if(registrarNombreTutor) dato.nombre_tutor = registrarNombreTutor; else dato.nombre_tutor = data.nombre_tutor;
        if(registrarApellidoPTutor) dato.apellido_p_tutor = registrarApellidoPTutor; else dato.apellido_p_tutor = data.apellidoP_tutor;
        if(registrarApellidoMTutor) dato.apellido_m_tutor = registrarApellidoMTutor; else dato.apellido_m_tutor = data.apellidoM_tutor;
        if(registrarTelefonoTutor) dato.telefono_tutor = registrarTelefonoTutor; else dato.telefono_tutor = data.telefono_tutor;
        if(registrarlvlAcademico) dato.nivelAcademico = registrarlvlAcademico; else dato.nivelAcademico = data.nivelAcademico;
        if (registrarSchoolProcedente) dato.escuelaProcedente = registrarSchoolProcedente; else dato.escuelaProcedente = data.escuelaProcedente;
        if (registrarUniAspirada) dato.colegioAspirado = registrarUniAspirada; else dato.colegioAspirado = data.colegioAspirado;
        if (registrarCarreraAspirada) dato.carreraAspirada = registrarCarreraAspirada; else dato.carreraAspirada = data.carreraAspirada;
        
        if (registrarFechaCurso) dato.fechaInicioCurso = registrarFechaCurso; 
        else{
          if(data.fechaInicioCurso == null)
            dato.fechaInicioCurso = null;
          else{
            const fechaISO1 = data.fechaInicioCurso;
            const fecha1 = new Date(fechaISO1);
            const dia1 = fecha1.getDate();
            const mes1 = fecha1.getMonth() + 1;
            const anio1 = fecha1.getFullYear(); 
            const newfecha1 = `${anio1}-${mes1}-${dia1}`;
            console.log(newfecha1);
            dato.fechaInicioCurso = newfecha1
          }
        }
        
        if (registrarFechaExamen) dato.fechaExamenDiagnostico = registrarFechaExamen; 
        else {
          if(data.fechaExamenDiagnostico == null)
            dato.fechaExamenDiagnostico = null;
          else{
            const fechaISO2 = data.fechaExamenDiagnostico;
            const fecha2 = new Date(fechaISO2);
            const dia2 = fecha2.getDate();
            const mes2 = fecha2.getMonth() + 1;
            const anio2 = fecha2.getFullYear();
            const newfecha2 = `${anio2}-${mes2}-${dia2}`;
            console.log(newfecha2);
            dato.fechaExamenDiagnostico = newfecha2;
          }
        }
        if (registrarlvlMatematic) dato.nivelMatematico = registrarlvlMatematic; else dato.nivelMatematico = data.nivelMatematico;
        if (registrarlvlAnalitic) dato.nivelAnalitico = registrarlvlAnalitic; else dato.nivelAnalitico = data.nivelAnalitico;
        if (registrarlvlLang) dato.nivelLinguistico = registrarlvlLang; else dato.nivelLinguistico = data.nivelLinguistico;
        if (registrarlvlCompren) dato.nivelComprension = registrarlvlCompren; else dato.nivelComprension = data.nivelComprension;
        if (registrarlvlGeneral) dato.nivelGeneral = registrarlvlGeneral; else dato.nivelGeneral = data.nivelGeneral;

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
            .then(datos => {
                console.log("Alumno registrado: ", datos);
                resolve(true)
                setTimeout(() => {
                    navigate('/alumnos');
                }, 1000);
            })
            .catch(error => {
                
                //Agregar lógica para manejar el error en la interfaz de usuario
            });
    }
    })
    
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
            <input type='text' placeholder={data.noControl || 'N/A'} id='inputNoControl' />
            <input type="text" placeholder={data.nombre || 'Nombre*'} id='inputNombre' />
            <input type="text" placeholder={data.apellido_p || 'Apellido Paterno*'} id='inputApellidoP' />
            <input type="text" placeholder={data.apellido_m || 'Apellido Materno*'} id='inputApellidoM' />
          </div>
          <div className='con1'>
            <input type='number' placeholder={data.grado || 'Grado*'} id='inputGrado'/>
            <input type='text' placeholder={data.grupo || 'Grupo*'} id='inputGrupo' />
            <select id='inputTurno'>
              <option value={0}>--Seleccionar Turno*--</option>
              <option value={1}>Matutino</option>
              <option value={2}>Vespertino</option>
            </select>
            <select id='inputEstatus'>
              <option value={0}>--Seleccionar Estatus*--</option>
              <option value={1}>Activo</option>
              <option value={2}>Inactivo</option>
              <option value={3}>Dado de baja</option>
              <option value={4}>Egresado</option>
            </select>
          </div>
          <div className='con2'>
            <input type="number" placeholder={data.telefono || 'Telefono*'} id='inputTelefono' />
            <input type="text" placeholder={data.correo || 'Correo Electronico*'} id='inputCorreo' />
            <input type="text" placeholder={data.curp || 'CURP*'} id='inputCurp' />
          </div>
          <div className='con4'>
            <input type="text" placeholder={data.nivelAcademico || 'Nivel académico actual'} id='inputlvlAcademic' />
          </div>
        </div>
        <div>
          <h2>Datos del Tutor</h2>
          <div className='D-Tutor'>
            <input type="text" placeholder={data.nombre_tutor || 'Nombre*'} id='inputNombreTutor' />
            <input type="text" placeholder={data.apellidoP_tutor || 'Apellido Paterno*'} id='inputApellidoPTutor' />
            <input type="text" placeholder={data.apellidoM_tutor || 'Apellido Materno*'} id='inputApellidoMTutor' />
            <input type="number" placeholder={data.telefono_tutor || 'Telefono*'} id='inputTelefonoTutor' />
          </div>
        </div>
        <div>
          <h2>Datos del Examen de Diagnostico del curso Pre-universitario</h2>
          <div className='D-Diagnostico'>
            <h4>Examen Diagnostico Ceneval "EXANII II"</h4>
            <div className='con5'>
              <input type='text' placeholder={data.escuelaProcedente || 'Colegio de proveniencia'} id='inputColegioProveniente' />
              <input type="text" placeholder={data.colegioAspirado || 'Universidad a la que aplica'} id='inputUniversidadAspira' />
              <input type="text" placeholder={data.carreraAspirada || 'Carrera a la que aplica'} id='inputCarreraAspira' />
            </div>
            <div className='con1'>
              <label>Fecha de inicio del curso</label>
              <input type='date' id='inputFechaCurso' />
              <label>Fecha del examen de Diagnostico</label>
              <input type='date' id='inputFechaExamen' />
            </div>
            <h4>Puntajes del examen</h4>
            <div className='con5'>
              <input type="number" placeholder={data.nivelMatematico || 'Pensamiento Matematico'} id='inputMatScore' />
              <input type="number" placeholder={data.nivelAnalitico || 'Pensamiento Analitico'} id='inputAnalitScore' />
              <input type="number" placeholder={data.nivelLinguistico || 'Estructura de la lengua'} id='inputLangScore' />
              <input type="number" placeholder={data.nivelComprension || 'Comprension Lectora'} id='inputLectScore' />
            </div>
            <div className='con6'>
              <input type="number" placeholder={data.nivelGeneral || 'Puntaje general'} id='inputGenScore' />
            </div>
          </div>
        </div>
        <div className='botones'>
          <button onClick={handleCancelClick} className='uno'>
            <MdOutlineCancel className='icon-cancel' />
          </button>
          <button onClick={handleSaveClick} className='dos'>
            <FiSave className='icon-save'/>
          </button>
        </div>
      </div>
    </div>
  );
}
