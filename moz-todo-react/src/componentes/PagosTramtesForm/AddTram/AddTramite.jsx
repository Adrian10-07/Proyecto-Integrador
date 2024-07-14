import React, { useState, useEffect } from 'react';
import Logo2 from './AddAssets/Logo2.png';
import { FiSave } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { IoSearchSharp } from "react-icons/io5";
import './AddTramite.css'

export default function AddTramite() {
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

    const mandarALaBaseDeDatos = () => {
        return new Promise ((resolve, reject) => {
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
                resolve(false)
            } else {
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
    };

    const handleSaveClick = () => {
        Swal.fire({
            title: "¿Desea guardar los cambios?",
            showCancelButton: true,
            confirmButtonText: "Guardar",
        }).then((result) => {
            if (result.isConfirmed) {
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
                <img src={Logo2} alt="Left" className='image-add-left' />
                Pago de trámites
                <img src={Logo2} alt="Right" className='image-add-right' />
            </header>

            <div className='Inputadd'>
                    <p>Generar Folio</p>
                <div className='tramite'>
                    <div className='con1'>
                        <input type="text" placeholder='folio' id='inputFolio' maxLength={32}/>
                        <input type="text" placeholder='concepto' id='inputConcepto' maxLength={75}/>
                        <input type="text" placeholder='monto' id='inputMonto' maxLength={8}/>
                        <input type="date" id='inputFecha' />
                        
                    </div>
                    <p>Seleccionar Alumno</p>
                    <div className='con1'>
                        
                        <input type='text' placeholder='Nombre' id='inputAlumnoSearchNombre' maxLength={45}/>
                        <input type='text' placeholder='Apellido Paterno' id='inputAlumnoSearchApellidoP' maxLength={45}/>
                        <input type='text' placeholder='Apellido Materno' id='inputAlumnoSearchApellidoM' maxLength={45}/>
                        <input type='text' placeholder='No. Control' id='inputAlumnoSearchNoControl' maxLength={10}/>
                        <button onClick={optionAlumnosAlumnos}>< IoSearchSharp />Buscar</button>
                        
                    </div>
                    <div className='con1'>
                        <select name='nombre' id="inputId_alumno">
                            <option value={"not valid"}>Seleccione Alumno</option>
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