import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {useState, useEffect} from 'react';
import EditAlum from './EditAlum';

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

function ChildModal({valueId}) {

  console.log("id: "+valueId);

    const [recursos, setRecursos] = useState({}); // Changed to an object
    const [error, setError] = useState(null); //Indica error al obtener recursos

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
        imprimirDatoDeUnAlumno(); // Fetch data when the modal opens
    };
    const handleClose = () => {
        setOpen(false);
    };

    let name;

    const imprimirDatoDeUnAlumno = () => {
        const url = 'http://localhost:3000/alumnos';

        console.log(`${url}/${valueId}`)

        fetch(`${url}/${valueId}`, {
            method: "GET",
        })
        .then(response => {
          console.log('Response status:', response.status);
            if(!response.ok){
                throw new Error('Error al imprimir los alumnos: ' + response.status);
            }
            return response.json();
        })
        .then(response => {
          console.log('Data received:', response);
          setRecursos(response);
          console.log('Recursos after setting state:', recursos);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
            setError(error.message);
        });
    }

    useEffect(() => {
        if (open) {
            imprimirDatoDeUnAlumno();
        }
    }, [open]);

    return (
        <React.Fragment>
            <Button onClick={handleOpen}>Mostrar datos del Alumno</Button>
            <Button><EditAlum/></Button>
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
                                <li>Nombre: {recursos.nombre} {recursos.apellido_p} {recursos.apellido_m}</li>
                                <li>Grado: {recursos.grado}</li>
                                <li>Grupo: {recursos.grupo}</li>
                                <li>Turno: {recursos.turno}</li>
                                <li>No. Control: {recursos.noControl}</li>
                                <li>Estatus: {recursos.tipo_estatus}</li>
                                <li>CURP: {recursos.curp}</li>
                                <li>Teléfono: {recursos.telefono}</li>
                                <li>Correo: {recursos.correo}</li>
                                <li>Tutor: {recursos.nombre_tutor} {recursos.apellidoP_tutor} {recursos.apellidoM_tutor}</li>
                                <li>Teléfono del tutor: {recursos.telefono_tutor}</li>
                                <li>Escuela de procedencia: {recursos.nivelAcademico}</li>
                            </ul>
                            <p>Datos del Examen del Curso Pre-Universitario</p>
                            <ul>
                                <li>Universidad a la que aspira: {recursos.colegioAspirado}</li>
                                <li>Carrera a la que aspira: {recursos.carreraAspirada}</li>
                                <li>Fecha de inicio del curso: {recursos.fechaInicioCurso}</li>
                                <li>Fecha de examen de diagnóstico: {recursos.fechaExamenDiagnostico}</li>
                                <li>Pensamiento Matemático: {recursos.nivelMatematico}</li>
                                <li>Pensamiento Analítico: {recursos.nivelAnalitico}</li>
                                <li>Nivel Lingüístico: {recursos.nivelLinguistico}</li>
                                <li>Comprensión Lectora: {recursos.nivelComprension}</li>
                                <li>Puntaje General: {recursos.nivelGeneral}</li>
                            </ul>
                        </div>
                    )}
                    <Button onClick={handleClose}>Cerrar</Button>
                </Box>
            </Modal>
        </React.Fragment>
    );
}

export default function NestedModal({valueId}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
      setOpen(true);
  };
  const handleClose = () => {
      setOpen(false);
  };

  const valorId = valueId; // Pasa el ID correcto según sea necesario

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
                  <ChildModal valueId={valorId} />
              </Box>
          </Modal>
      </div>
  );
}
