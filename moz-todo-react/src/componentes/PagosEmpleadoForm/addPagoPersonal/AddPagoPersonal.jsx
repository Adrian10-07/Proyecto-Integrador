import React, { useState, useEffect} from 'react';
import Logo2 from './AddAssets/Logo2.png';
import { FiSave } from 'react-icons/fi';
import { MdOutlineCancel } from 'react-icons/md';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { IoSearchSharp } from 'react-icons/io5';
import './AddPagoPersonal.css'

export default function AddPagoPersonal () {
    const [namePersonal, setNamePersonal] = useState([]);
    const navigate = useNavigate();
    const [totalPago, setTotalPago] = useState(0);

    const optionPersonal = () => {
        const url = "http://localhost:3000/PagoEmp/buscarPers";

        let dato = {
            nombre_busqueda:"",
            apellido_p_busqueda:"",
            apellido_m_busqueda:""
        }

        let buscarPorNombre = document.getElementById("inputPersonalName").value;
        if(buscarPorNombre)
            dato.nombre_busqueda = buscarPorNombre;
        let buscarPorApellidoP = document.getElementById('inputPersonalApellidop').value;
        if (buscarPorApellidoP) 
            dato.apellido_p_busqueda = buscarPorApellidoP;
        let buscarPorApellidoM = document.getElementById('inputPersonalApellidom').value;
        if (buscarPorApellidoM)
            dato.apellido_m_busqueda = buscarPorApellidoM;

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
            setNamePersonal(data);
        })
        .catch(error => {
            console.error('Error fetching data: ', error);
            Swal.fire('Error fetching data', error.message, 'error');
        });
    }

    const comprobarSiEsNumero = (cadenaAAnalizar) => {
        var valoresAceptados = /^[0-9]+$/;
        if (valoresAceptados.test(cadenaAAnalizar)){
            console.log(cadenaAAnalizar + " es un valor valido")
            return true;
        } else {
            console.log(cadenaAAnalizar + " no es un valor valido")
            return false;
        }
    }

    const calcularTotalAPagar = () => {
        const idPersonalSelect = document.getElementById("inputIdPersonal").value;
        let registrarHoras = document.getElementById('inputHoras').value;
        if (idPersonalSelect == "not valid" || !registrarHoras || !comprobarSiEsNumero(registrarHoras) || registrarHoras <= 0){
            Swal.fire({
                title: "Error",
                text: "Seleccione un personal al cual calcular el pago y asigne las horas trabajadas",
                icon: "error",
                timer: 1000
            });
            return false;
        }
        else {
            const url = `http://localhost:3000/PagoEmp/calcularMontoPer/${idPersonalSelect}`
            fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('No conecta');
                }
                return response.json();
            })
            .then(data => {
                console.log(data[0].sueldoHora);
                setTotalPago(data[0].sueldoHora * registrarHoras);
                console.log(totalPago);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
                Swal.fire('Error fetching data', error.message, 'error');
            });
            
        }
    }

    const dbPersonal = () => {
            const url = "http://localhost:3000/PagoEmp/pagoPer";
            let data = {
                horasTrabajadas: "",
                totalPago: "",
                fechaPago:"",
                idPersonal:""
            };
            let registrarHoras = document.getElementById('inputHoras').value;
            let registrarTotal = totalPago;
            let registrarFecha = document.getElementById('inputFecha').value;
            let registraridPersonal = document.getElementById('inputIdPersonal').value;

            if (!registrarHoras || registrarTotal <= 0 || !registrarFecha ||registraridPersonal == "not valid") {
                Swal.fire({
                    title: "Error",
                    text: "Llene todos los campos y calcule el pago total",
                    icon: "error",
                    timer: 1000
                });
                return false;
            } else {
                data.horasTrabajadas = registrarHoras;
                data.totalPago = registrarTotal;
                data.fechaPago = registrarFecha;
                data.idPersonal = registraridPersonal;

                fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type':'application/json' },
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
                    setTimeout(() => {
                        navigate('/pagosEmp');
                    }, 1000);
                    Swal.fire({
                        title: "Éxito",
                        text: "Informe de pago de empleado registrado correctamente",
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
    };

    const handleSaveClick = () => {
        Swal.fire({
            title: "¿Desea guardar los cambios?",
            showCancelButton: true,
            confirmButtonText: "Guardar",
        }).then((result) => {
            if (result.isConfirmed) {
                dbPersonal()
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
                  navigate('/pagosEmp');
              }, 1000);
            }
          })
    };

    useEffect(() => {
        optionPersonal();
    }, []);


    return (
        <div >
            <header className='header'>
                <img src={Logo2} alt="Left" className='image-add-left' />
                Pago de trámites
                <img src={Logo2} alt="Right" className='image-add-right' />
            </header>

            <div className='Inputadd'>
                    <p>Generar</p>
                <div className='pagoPersonal'>
                    <div className='box_personal'>
                        <input type="number" placeholder='Horas trabajadas' id='inputHoras' maxLength={10}/>
                        <input type="date" id='inputFecha' />
                        
                    </div>
                    <div className='searchPersonal'>
                        <input type='text' placeholder='Nombre' id='inputPersonalName' maxLength={45}/>
                        <input type="text" placeholder='apellido paterno' id='inputPersonalApellidop' maxLength={45}/>
                        <input type="text" placeholder='apelllido materno' id='inputPersonalApellidom' maxLength={45}/>
                        <button className='Buscar' onClick={optionPersonal}>< IoSearchSharp />Buscar</button>
                        
                    </div>
                    <div className='searchPersonal'>
                        <select name='nombre' id="inputIdPersonal">
                            <option value={"not valid"}>Personal</option>
                            {namePersonal.map(elemento => (
                                <option key={elemento.id} value={elemento.id}>{elemento.nombre} {elemento.apellido_p} {elemento.apellido_m}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <h4>Calculando pago:</h4>
                        <button className='calcular' onClick={calcularTotalAPagar}>Calcular</button>
                        <p>{totalPago}</p>
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