import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
    const [data, setData] = useState(null);
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
        <React.Fragment>
            <Button onClick={handleOpen}>Mostrar datos del Alumno</Button>
            
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, width: 400 }}>
                    <h2 id="child-modal-title">Datos del Alumno</h2>
                    {error && <p>Error: {error}</p>}
                    {!error && data && data != null && (
                        <div>
                            <p id="child-modal-description">Datos del Alumno</p>
                            <ul>
                                <li>Nombre: {data[0].nombre} {data[0].apellido_p} {data[0].apellido_m}</li>
                                <li>Grado: {data[0].grado}</li>
                                <li>Grupo: {data[0].grupo}</li>
                                <li>Turno: {data[0].turno}</li>
                                <li>No. Control: {data[0].noControl}</li>
                                <li>Estatus: {data[0].tipo_estatus}</li>
                                <li>CURP: {data[0].curp}</li>
                                <li>Teléfono: {data[0].telefono}</li>
                                <li>Correo: {data[0].correo}</li>
                                <li>Tutor: {data[0].nombre_tutor} {data[0].apellidoP_tutor} {data[0].apellidoM_tutor}</li>
                                <li>Teléfono del tutor: {data[0].telefono_tutor}</li>
                                <li>Escuela de procedencia: {data[0].nivelAcademico}</li>
                            </ul>
                            <p>Datos del Examen del Curso Pre-Universitario</p>
                            <ul>
                                <li>Universidad a la que aspira: {data[0].colegioAspirado}</li>
                                <li>Carrera a la que aspira: {data[0].carreraAspirada}</li>
                                <li>Fecha de inicio del curso: {data[0].fechaInicioCurso}</li>
                                <li>Fecha de examen de diagnóstico: {data[0].fechaExamenDiagnostico}</li>
                                <li>Pensamiento Matemático: {data[0].nivelMatematico}</li>
                                <li>Pensamiento Analítico: {data[0].nivelAnalitico}</li>
                                <li>Nivel Lingüístico: {data[0].nivelLinguistico}</li>
                                <li>Comprensión Lectora: {data[0].nivelComprension}</li>
                                <li>Puntaje General: {data[0].nivelGeneral}</li>
                            </ul>
                            <Link to={{ pathname : '/editAlumno', state : data[0]}}><Button>Editar Alumno</Button></Link>
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
