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
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`
    }).then((result) => {
      if (result.isConfirmed) {
        mandarCambiosALaBaseDeDatos();
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
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
    });
  };

  if (!data) {
    return <div>No data available</div>;
  }

  const navigate = useNavigate();

  const mandarCambiosALaBaseDeDatos = () => {
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

    if (!registrarNoControl || !registrarNombre || !registrarApellidoP && !registrarApellidoM || !registrarGrado || !registrarGrupo || !registrarTurno || !registrarEstado || !registrarTelefono || !registrarCorreo || !registrarCurp || !registrarlvlAcademico || !registrarNombreTutor || !registrarApellidoPTutor || !registrarApellidoMTutor || !registrarTelefonoTutor) {
        console.log("Hay campos obligatorios sin llenar");
        // Agregar logica del error
    } else {
        dato.nombre = registrarNombre;
        dato.apellido_p = registrarApellidoP;
        dato.apellido_m = registrarApellidoM;
        dato.grado = registrarGrado;
        dato.grupo = registrarGrupo;
        dato.turno = registrarTurno;
        dato.noControl = registrarNoControl;
        dato.estado = registrarEstado;
        dato.curp = registrarCurp;
        dato.telefono = registrarTelefono;
        dato.correo = registrarCorreo;
        dato.nombre_tutor = registrarNombreTutor;
        dato.apellido_p_tutor = registrarApellidoPTutor;
        dato.apellido_m_tutor = registrarApellidoMTutor;
        dato.telefono_tutor = registrarTelefonoTutor;
        dato.nivelAcademico = registrarlvlAcademico;
        if (registrarSchoolProcedente) dato.escuelaProcedente = registrarSchoolProcedente; else dato.escuelaProcedente = data.escuelaProcedente;
        if (registrarUniAspirada) dato.colegioAspirado = registrarUniAspirada; else dato.colegioAspirado = data.colegioAspirado;
        if (registrarCarreraAspirada) dato.carreraAspirada = registrarCarreraAspirada; else dato.carreraAspirada = data.carreraAspirada;
        const fechaISO1 = data.fechaInicioCurso;
        const fecha1 = new Date(fechaISO1);

        // Obtener la fecha en formato deseado
        const dia1 = fecha1.getDate(); // día del mes (1-31)
        const mes1 = fecha1.getMonth() + 1; // mes (0-11, sumamos 1 para obtener el mes real)
        const anio1 = fecha1.getFullYear(); // año

        // Puedes formatear la fecha como prefieras, por ejemplo:
        const newfecha1 = `${anio1}-${mes1}-${dia1}`;
        console.log(newfecha1); // Ejemplo de formato: "24/7/2024"
        if (registrarFechaCurso) dato.fechaInicioCurso = registrarFechaCurso; else dato.fechaInicioCurso = newfecha1;
        const fechaISO2 = data.fechaExamenDiagnostico;
        const fecha2 = new Date(fechaISO2);

        // Obtener la fecha en formato deseado
        const dia2 = fecha2.getDate(); // día del mes (1-31)
        const mes2 = fecha2.getMonth() + 1; // mes (0-11, sumamos 1 para obtener el mes real)
        const anio2 = fecha2.getFullYear(); // año

        // Puedes formatear la fecha como prefieras, por ejemplo:
        const newfecha2 = `${anio2}-${mes2}-${dia2}`;
        console.log(newfecha1); // Ejemplo de formato: "24/7/2024"
        if (registrarFechaExamen) dato.fechaExamenDiagnostico = registrarFechaExamen; else dato.fechaExamenDiagnostico = newfecha2;
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
            <input type='text' placeholder={data.noControl || 'N/A'} id='inputNoControl' />
            <input type="text" placeholder={data.nombre || 'Nombre*'} id='inputNombre' />
            <input type="text" placeholder={data.apellido_p || 'Apellido Paterno*'} id='inputApellidoP' />
            <input type="text" placeholder={data.apellido_m || 'Apellido Materno*'} id='inputApellidoM' />
          </div>
          <div className='con1'>
            <input type='number' placeholder={data.grado || 'Grado*'} id='inputGrado'/>
            <input type='text' placeholder={data.grupo || 'Grupo*'} id='inputGrupo' />
            <select id='inputTurno'>
              <option>--Seleccionar Turno*--</option>
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
