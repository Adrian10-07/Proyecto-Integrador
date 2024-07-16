import React, { useState, useEffect } from 'react';
import Logo2 from './AddAssets/Logo2.png';
import { FiSave } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { IoSearchSharp } from "react-icons/io5";
import './AddTramite.css'

export default function AddTramite() {
<<<<<<< HEAD
=======
    const [coincidencias, setCoincidencias] = useState([]);
>>>>>>> ac38bf34f75d7a37c7ae8c4bac96f9a84c445c94
    const [nameAlum, setNameAlum] = useState([]);
    const [searching, setSearching] = useState({
        nombre:'',
        apellido_p:'',
        apellido_m:'',
        folio:''
    });
    const navigate = useNavigate();

    useEffect(() => {
        optionAlumnosAlumnos();
<<<<<<< HEAD
        /*
        fetch("http://localhost:3000/alumnos/")
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('API response:', data); 
                setNameAlum(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                Swal.fire('Error fetching data', error.message, 'error');
            });
        */
    }, []);

    const handleSearchChange = (e) => {
        const { name, value } =e.target;
        setSearching(prevState => ({ ...prevState, [name]: value}));
    };

    const optionAlumnosAlumnos = () => {
        const url = "http://localhost:3000/tramites/optionsAlumnos";

        let dato = {
            "nombre_busqueda" : "", 
            "apellido_p_busqueda" : "", 
            "apellido_m_busqueda" : "", 
            "noControl_busqueda" : ""
        }
=======
    }, []);

    /*
    const comprobarSiEsNumeroFlotante = (cadenaAAnalizar) => {
    const valoresAceptados = /^-?\d+(\.\d+)?$/;
    if (valoresAceptados.test(cadenaAAnalizar)) {
        console.log(cadenaAAnalizar + " es un valor válido");
        return true;
    } else {
        console.log(cadenaAAnalizar + " no es un valor válido");
        return false;
    }
}
    */

    const comprobarSiYaExisteElFolio = async (folioComprobar) => {
        const url = `http://localhost:3000/tramites/buscarCoincidencias/${folioComprobar}`;
        try {
            const response = await fetch(url);
    
            if (!response.ok) {
                throw new Error('Error al buscar coincidencias: ' + response.status);
            }
    
            const data = await response.json();
            setCoincidencias(data);
    
            if (data.length > 0) {
                console.log("Hay coincidencias: " + data);
                return true;
            } else {
                console.log("No hay coincidencias");
                return false;
            }
        } catch (error) {
            console.log("Error: " + error);
            return false;
        }
    }

    const comprobarSiElMontoEsValido = (comprobarMonto) => {
        const valoresAceptados = /^-?\d+(\.\d+)?$/;
        if (valoresAceptados.test(comprobarMonto)) {
            console.log(comprobarMonto + " es un valor válido");
            return true;
        } else {
            console.log(comprobarMonto + " no es un valor válido");
            return false;
        }
    }

    const optionAlumnosAlumnos = () => {
        const url = "http://localhost:3000/tramites/optionsAlumnos";

        let dato = {
            "nombre_busqueda" : "", 
            "apellido_p_busqueda" : "", 
            "apellido_m_busqueda" : "", 
            "noControl_busqueda" : ""
        }
>>>>>>> ac38bf34f75d7a37c7ae8c4bac96f9a84c445c94

        let buscarPorNombre = document.getElementById("inputAlumnoSearchNombre").value;
        if(buscarPorNombre)
            dato.nombre_busqueda = buscarPorNombre;
        let buscarPorApellidoP = document.getElementById("inputAlumnoSearchApellidoP").value;
        if(buscarPorApellidoP)
            dato.apellido_p_busqueda = buscarPorApellidoP;
        let buscarPorApellidoM = document.getElementById("inputAlumnoSearchApellidoM").value;
        if(buscarPorApellidoM)
            dato.apellido_m_busqueda = buscarPorApellidoM;
        let buscarPorNoControl = document.getElementById("inputAlumnoSearchNoControl").value;
        if(buscarPorNoControl)
            dato.noControl_busqueda = buscarPorNoControl;

        fetch(url, {
            method:'POST',
            headers: { 'Content-Type':'application/json'},
            body:JSON.stringify(dato)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('No conecta');
            }
            return response.json();
        })
        .then(data => {
            setNameAlum(data);
        })
        .catch(error => {
            console.error('Error fetching data: ', error);
            Swal.fire('Error fetching data', error.message, 'error');
        });
    };

<<<<<<< HEAD
    const mandarALaBaseDeDatos = () => {
        return new Promise ((resolve, reject) => {
=======
    const mandarALaBaseDeDatos = async () => {
>>>>>>> ac38bf34f75d7a37c7ae8c4bac96f9a84c445c94
            const url = 'http://localhost:3000/tramites/add';
            let data = {
                folio: "",
                concepto: "",
                monto: "",
                fechaDeCorte: "",
                id_alumno: ""
            };

            let registrarFolio = document.getElementById('inputFolio').value;
            let registrarConcepto = document.getElementById('inputConcepto').value;
            let registrarMonto = document.getElementById('inputMonto').value;
            let registrarFecha = document.getElementById('inputFecha').value;
            let registrarid_alumno = document.getElementById('inputId_alumno').value;

            if (!registrarFolio || !registrarConcepto || !registrarMonto || !registrarFecha || !registrarid_alumno || registrarid_alumno == "not valid") {
<<<<<<< HEAD
                resolve(false)
            } else {
=======
                Swal.fire({
                    title: "Error",
                    text: "Hay campos obligatorios sin llenar",
                    icon: "error",
                    timer: 1000
                });
                return false;
            } else if (!comprobarSiElMontoEsValido(registrarMonto)){
                Swal.fire({
                    title: "Error",
                    text: "Ingrese un monto válido",
                    icon: "error",
                    timer: 1000
                });
                return false;
            }else if(registrarMonto <= 0 || registrarMonto > 100000.00){
                Swal.fire({
                    title: "Error",
                    text: "Ingrese un monto válido",
                    icon: "error",
                    timer: 1000
                });
                return false;
            }else if(await comprobarSiYaExisteElFolio(registrarFolio)){
                Swal.fire({
                    title: "Error",
                    text: "Ya existe un registro con ese folio",
                    icon: "error",
                    timer: 1000
                });
                return false;
            }else {
>>>>>>> ac38bf34f75d7a37c7ae8c4bac96f9a84c445c94
                data.folio = registrarFolio;
                data.concepto = registrarConcepto;
                data.monto = registrarMonto;
                data.fechaDeCorte = registrarFecha;
                data.id_alumno = registrarid_alumno;

                fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
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
                .then(datosReturn => {
                    console.log("Datos guardados: " + datosReturn)
<<<<<<< HEAD
                    resolve(true)
                    setTimeout(() => {
                        navigate('/tramites');
                    }, 1000);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            }
        }); 
=======
                    setTimeout(() => {
                        navigate('/tramites');
                    }, 1000);
                    Swal.fire({
                        title: "Éxito",
                        text: "Informe de pago de trámite registrado correctamente",
                        icon: "success",
                        timer: 1000
                    });
                    return true;
                })
                .catch(error => {
                    console.error('Error:', error);
                    let errorMessage = "Error desconocido";
                    if (error.message.includes("NetworkError")) {
                        errorMessage = "Error de red, por favor revisa tu conexión";
                    } else if (error.message.includes("404")) {
                        errorMessage = "Endpoint no encontrado";
                    } else if (error.message.includes("500")) {
                        errorMessage = "Error interno del servidor";
                    } else if (error.message.includes("datos duplicados")) {
                        errorMessage = "Datos duplicados, por favor revisa la información ingresada";
                    }
                    Swal.fire({
                        title: "Error",
                        text: errorMessage,
                        icon: "error",
                        timer: 1000
                    });
                    return false;
                });
            } 
>>>>>>> ac38bf34f75d7a37c7ae8c4bac96f9a84c445c94
    };

    const handleSaveClick = () => {
        Swal.fire({
            title: "¿Desea guardar los cambios?",
            showCancelButton: true,
            confirmButtonText: "Guardar",
        }).then((result) => {
            if (result.isConfirmed) {
<<<<<<< HEAD
                mandarALaBaseDeDatos()
                    .then(success => {
                        if (success) {
                            Swal.fire("Cambios guardados!", "", "success");
                        } else {
                            Swal.fire("Error, asegurese de llenar todos los campos", "", "error");
                        }
                    })
                    .catch(error => {
                        Swal.fire("Error al guardar los cambios", error.message, "error");
                    });
=======
                mandarALaBaseDeDatos();
>>>>>>> ac38bf34f75d7a37c7ae8c4bac96f9a84c445c94
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
                  navigate('/tramites');
              }, 1000);
            }
          })
    };

    return (
        <div>
            <header className='header'>
<<<<<<< HEAD
                <img src={Logo2} alt="Left" className='header-image-left' />
                Pago de trámites
                <img src={Logo2} alt="Right" className='header-image-right' />
=======
                <img src={Logo2} alt="Left" className='image-add-left' />
                Pago de trámites
                <img src={Logo2} alt="Right" className='image-add-right' />
>>>>>>> ac38bf34f75d7a37c7ae8c4bac96f9a84c445c94
            </header>

            <div className='Inputadd'>
                    <p>Generar Folio</p>
                <div className='tramite'>
                    <div className='con1'>
                        <input type="text" placeholder='folio' id='inputFolio' maxLength={32}/>
                        <input type="text" placeholder='concepto' id='inputConcepto' maxLength={75}/>
<<<<<<< HEAD
                        <input type="text" placeholder='monto' id='inputMonto' maxLength={8}/>
=======
                        <input type="number" placeholder='monto' id='inputMonto' maxLength={8}/>
>>>>>>> ac38bf34f75d7a37c7ae8c4bac96f9a84c445c94
                        <input type="date" id='inputFecha' />
                        
                    </div>
                    <p>Seleccionar Alumno</p>
                    <div className='con1'>
                        
                        <input type='text' placeholder='Nombre' id='inputAlumnoSearchNombre' maxLength={45}/>
                        <input type='text' placeholder='Apellido Paterno' id='inputAlumnoSearchApellidoP' maxLength={45}/>
                        <input type='text' placeholder='Apellido Materno' id='inputAlumnoSearchApellidoM' maxLength={45}/>
                        <input type='text' placeholder='No. Control' id='inputAlumnoSearchNoControl' maxLength={10}/>
<<<<<<< HEAD
                        <button onClick={optionAlumnosAlumnos}>Buscar</button>
=======
                        <button onClick={optionAlumnosAlumnos}>< IoSearchSharp />Buscar</button>
>>>>>>> ac38bf34f75d7a37c7ae8c4bac96f9a84c445c94
                        
                    </div>
                    <div className='con1'>
                        <select name='nombre' id="inputId_alumno">
<<<<<<< HEAD
                            <option value={"not valid"}>Seleccione Alumno*</option>
=======
                            <option value={"not valid"}>Seleccione Alumno</option>
>>>>>>> ac38bf34f75d7a37c7ae8c4bac96f9a84c445c94
                            {nameAlum.map(elemento => (
                                <option key={elemento.id} value={elemento.id}>{elemento.noControl} : {elemento.nombre} {elemento.apellido_p} {elemento.apellido_m} {elemento.grado}-{elemento.grupo}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <div className='botones'>
                <button onClick={handleCancelClick} className='uno'><MdOutlineCancel className='icon-cancel' /></button>
                <button onClick={handleSaveClick} className='dos'><FiSave className='icon-save' /></button>
            </div>
        </div>
    );
}