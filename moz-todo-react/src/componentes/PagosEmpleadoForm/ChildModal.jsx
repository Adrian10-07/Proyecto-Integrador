import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ChildModal.css'; // Importa la hoja de estilos
import Logo2 from './AssetsDAlumn/Logo2.png';
<<<<<<< HEAD

function ChildModal({ valueId }) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
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
          setData(response[0]); // Ajuste aquí para asegurar que data sea un objeto
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
  
    return (
      <React.Fragment>
        <Button onClick={handleOpen}>Mostrar datos del Alumno</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box className="modal-box">

            <header id='header-DAlmun'>
              <img src={Logo2} alt="Left" className='image-left' />
              <h2 id="child-modal-title">Datos del Alumno</h2>
              <img src={Logo2} alt="Right" className='image-right' />
            </header>

            {error && <p>Error: {error}</p>}
            {!error && data && (
              <div>
                <ul>
                  <li>Nombre: {data.nombre || "N/A"} {data.apellido_p || "N/A"} {data.apellido_m || "N/A"}</li>
                  <li>Grado: {data.grado || "N/A"}</li>
                  <li>Grupo: {data.grupo || "N/A"}</li>
                  <li>Turno: {data.turno || "N/A"}</li>
                  <li>No. Control: {data.noControl || "N/A"}</li>
                  <li>Estatus: {data.tipo_estatus || "N/A"}</li>
                  <li>CURP: {data.curp || "N/A"}</li>
                  <li>Teléfono: {data.telefono || "N/A"}</li>
                  <li>Correo: {data.correo || "N/A"}</li>
                  <li>Tutor: {data.nombre_tutor || "N/A"} {data.apellidoP_tutor || "N/A"} {data.apellidoM_tutor || "N/A"}</li>
                  <li>Teléfono del tutor: {data.telefono_tutor || "N/A"}</li>
                  <li>Nivel académico: {data.nivelAcademico || "N/A"}</li>
                </ul>
                <p>Datos del Examen del Curso Pre-Universitario</p>
                <ul>
                  <li>Colegio de proveniencia: {data.escuelaProcedente}</li>
                  <li>Universidad a la que aspira: {data.colegioAspirado || "N/A"}</li>
                  <li>Carrera a la que aspira: {data.carreraAspirada || "N/A"}</li>
                  <li>Fecha de inicio del curso: {data.fechaInicioCurso || "N/A"}</li>
                  <li>Fecha de examen de diagnóstico: {data.fechaExamenDiagnostico || "N/A"}</li>
                  <li>Pensamiento Matemático: {data.nivelMatematico || "N/A"}</li>
                  <li>Pensamiento Analítico: {data.nivelAnalitico || "N/A"}</li>
                  <li>Nivel Lingüístico: {data.nivelLinguistico || "N/A"}</li>
                  <li>Comprensión Lectora: {data.nivelComprension || "N/A"}</li>
                  <li>Puntaje General: {data.nivelGeneral || "N/A"}</li>
                </ul>
                <Button onClick={() => navigate('/editAlumno', { state: { data } })}>
                  Editar Alumno
                </Button>
              </div>
            )}
            <Button onClick={handleClose}>Cerrar</Button>
          </Box>
        </Modal>
      </React.Fragment>
    );
  }
=======
import { FaUserEdit } from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons';
import { IoCloseCircleSharp } from "react-icons/io5"; //<IoCloseCircleSharp />
import { MdOutlineEditNote } from "react-icons/md";
>>>>>>> ac38bf34f75d7a37c7ae8c4bac96f9a84c445c94
  
export default function NestedModal({ valueId }) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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
        setData(response[0]); // Ajuste aquí para asegurar que data sea un objeto
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

  return (
    <div>
      <Button onClick={handleOpen}> <FaUserEdit /> </Button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box className="modal-box">
<<<<<<< HEAD
          <h2 id="parent-modal-title">Text in a modal</h2>
          <p id="parent-modal-description">
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </p>
          <ChildModal valueId={valueId} />
=======

          <header id='header-DAlmun'>
            <img src={Logo2} alt="Left" className='image-left' />
            <h2 id="child-modal-title">Datos del Alumno</h2>
            <img src={Logo2} alt="Right" className='image-right' />
          </header>

          {error && <p>Error: {error}</p>}
          {!error && data && (
          <div >
            <p>Datos del Alumno:</p>
            <ul>
              <li>Nombre: {data.nombre || "N/A"} {data.apellido_p || "N/A"} {data.apellido_m || "N/A"}</li>
              <li>Grado: {data.grado || "N/A"}</li>
              <li>Grupo: {data.grupo || "N/A"}</li>
              <li>Turno: {data.turno || "N/A"}</li>
              <li>No. Control: {data.noControl || "N/A"}</li>
              <li>Estatus: {data.tipo_estatus || "N/A"}</li>
              <li>CURP: {data.curp || "N/A"}</li>
              <li>Teléfono: {data.telefono || "N/A"}</li>
              <li>Correo: {data.correo || "N/A"}</li>
              <li>Tutor: {data.nombre_tutor || "N/A"} {data.apellidoP_tutor || "N/A"} {data.apellidoM_tutor || "N/A"}</li>
              <li>Teléfono del tutor: {data.telefono_tutor || "N/A"}</li>
              <li>Nivel académico: {data.nivelAcademico || "N/A"}</li>
            </ul>
            <p id='pd'>Datos del Examen del Curso Pre-Universitari:</p>
            <ul>
              <li>Colegio de proveniencia: {data.escuelaProcedente}</li>
              <li>Universidad a la que aspira: {data.colegioAspirado || "N/A"}</li>
              <li>Carrera a la que aspira: {data.carreraAspirada || "N/A"}</li>
              <li>Fecha de inicio del curso: {data.fechaInicioCurso || "N/A"}</li>
              <li>Fecha de examen de diagnóstico: {data.fechaExamenDiagnostico || "N/A"}</li>
              <li>Pensamiento Matemático: {data.nivelMatematico || "N/A"}</li>
              <li>Pensamiento Analítico: {data.nivelAnalitico || "N/A"}</li>
              <li>Nivel Lingüístico: {data.nivelLinguistico || "N/A"}</li>
              <li>Comprensión Lectora: {data.nivelComprension || "N/A"}</li>
              <li>Puntaje General: {data.nivelGeneral || "N/A"}</li>
            </ul>
            <Button className='EditA' onClick={() => navigate('/editAlumno', { state: { data } })}>
            Editar
            </Button>
          </div>
          )}
          <Button className='CloseA' onClick={handleClose}>Cerrar</Button>
>>>>>>> ac38bf34f75d7a37c7ae8c4bac96f9a84c445c94
        </Box>
      </Modal>
    </div>
  );
}