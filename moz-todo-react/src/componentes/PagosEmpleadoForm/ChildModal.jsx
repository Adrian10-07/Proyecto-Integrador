import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useState, useEffect } from 'react';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

function ChildModal({ valueId }) {
    const [data, setData] = useState({});
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const imprimirDatoDeUnAlumno = async () => {
      const url = 'http://localhost:3000/alumnos';
      try {
        const response = await fetch(`${url}/${valueId}`);
        const dato = await response.json();
        setData(dato);
      } catch (error) {
        console.error('Error al leer las tareas:', error);
      }
      /*
        

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
      */
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
        <React.Fragment>
            <Button onClick={handleOpen}>Mostrar datos del Alumno</Button>
            <Button>Editar Alumno</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, width: 400 }}>
                    <h2 id="child-modal-title">Datos del Alumno</h2>
                    {error && <p>Error: {error}</p>}
                    {!error && (
                        <div>
                            <p id="child-modal-description">Datos del Alumno</p>
                            <ul>
                                <li>Nombre: {data.nombre} {data.apellido_p} {data.apellido_m}</li>
                                <li>Grado: {data.grado}</li>
                                <li>Grupo: {data.grupo}</li>
                                <li>Turno: {data.turno}</li>
                                <li>No. Control: {data.noControl}</li>
                                <li>Estatus: {data.tipo_estatus}</li>
                                <li>CURP: {data.curp}</li>
                                <li>Teléfono: {data.telefono}</li>
                                <li>Correo: {data.correo}</li>
                                <li>Tutor: {data.nombre_tutor} {data.apellidoP_tutor} {data.apellidoM_tutor}</li>
                                <li>Teléfono del tutor: {data.telefono_tutor}</li>
                                <li>Escuela de procedencia: {data.nivelAcademico}</li>
                            </ul>
                            <p>Datos del Examen del Curso Pre-Universitario</p>
                            <ul>
                                <li>Universidad a la que aspira: {data.colegioAspirado}</li>
                                <li>Carrera a la que aspira: {data.carreraAspirada}</li>
                                <li>Fecha de inicio del curso: {data.fechaInicioCurso}</li>
                                <li>Fecha de examen de diagnóstico: {data.fechaExamenDiagnostico}</li>
                                <li>Pensamiento Matemático: {data.nivelMatematico}</li>
                                <li>Pensamiento Analítico: {data.nivelAnalitico}</li>
                                <li>Nivel Lingüístico: {data.nivelLinguistico}</li>
                                <li>Comprensión Lectora: {data.nivelComprension}</li>
                                <li>Puntaje General: {data.nivelGeneral}</li>
                            </ul>
                        </div>
                    )}
                    <Button onClick={handleClose}>Cerrar</Button>
                </Box>
            </Modal>
        </React.Fragment>
    );
}

export default function NestedModal({ valueId }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button onClick={handleOpen}>Open modal</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 400 }}>
                    <h2 id="parent-modal-title">Text in a modal</h2>
                    <p id="parent-modal-description">
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </p>
                    <ChildModal valueId={valueId} />
                </Box>
            </Modal>
        </div>
    );
}
