import React, { useState, useEffect} from 'react';
import Logo2 from './AddAssets/Logo2.png';
import { FiSave } from 'react-icons/fi';
import { MdOutlineCancel } from 'react-icons/md';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { IoSearchSharp } from 'react-icons/io5';

export default function AddPagoProfesor () {
    const [nameProfesor, setNameProfesor] = useState([]);
    const [totalPago, setTotalPago] = useState(0);
    const navigate = useNavigate();

    const handleSearchChange = (e) => {
        const { name, value } = e.target;
        setSearching(prevState => ({
            ...prevState, [name]: value
        }));
    };

    const optionProfesor = () => {
        const url = "http://localhost:3000/PagoEmp/optionProfesor";

        let dato = {
            nombre_busqueda :"",
            apellido_p_busqueda : "",
            apellido_m_busqueda : ""
        }

        let buscarPorNombre = document.getElementById("inputProfesorName").value;
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
            setNameProfesor(data);
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
        const idProfesorSelect = document.getElementById("inputIdProfesor").value;
        let registrarHoras = document.getElementById('inputHoras').value;
        if (idProfesorSelect == "not valid" || !registrarHoras || !comprobarSiEsNumero(registrarHoras) || registrarHoras <= 0){
            Swal.fire({
                title: "Error",
                text: "Seleccione un maestro al cual calcular el pago y asigne las horas trabajadas",
                icon: "error",
                timer: 1000
            });
            return false;
        }
        else {
            const url = `http://localhost:3000/PagoEmp/calcularMontoPro/${idProfesorSelect}`
            fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('No conecta');
                }
                return response.json();
            })
            .then(data => {
                console.log(data[0].sueldoPorHora);
                setTotalPago(data[0].sueldoPorHora * registrarHoras);
                console.log(totalPago);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
                Swal.fire('Error fetching data', error.message, 'error');
            });
            
        }
    }

    const dbPersonal = () => {
        
            const url = "http://localhost:3000/PagoEmp/pagoPro";
            let data = {
                horasTrabajadas: "",
                totalPago: "",
                fechaPago:"",
                idProfesor:"",

            };
            let registrarHoras = document.getElementById('inputHoras').value;
            let registrarTotal = totalPago;
            let registrarFecha = document.getElementById('inputFecha').value;
            let registraridProfesor = document.getElementById('inputIdProfesor').value;

            if (!registrarHoras || registrarTotal <= 0 || !registrarFecha ||registraridProfesor == "not valid") {
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
                data.idProfesor = registraridProfesor;

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
                        text: "Informe de pago de maestro registrado correctamente",
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
                dbPersonal();
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
        optionProfesor();
    }, []);

    return (
        <div>
            <header className='header'>
                <img src={Logo2} alt="Left" className='image-add-left' />
                Pago de profesores
                <img src={Logo2} alt="Right" className='image-add-right' />
            </header>

            <div className='Inputadd'>
                    <p>Generar</p>
                <div className='pagoProfesor'>
                    <div className='box_profesor'>
                        <input type="number" placeholder='Horas trabajadas' id='inputHoras' maxLength={10}/>
                        <input type="date" id='inputFecha' />
                        
                    </div>
                    <div className='searchProfesor'>
                        <input type='text' placeholder='Nombre' id='inputProfesorName' maxLength={45}/>
                        <input type="text" placeholder='apellido paterno' id='inputPersonalApellidop' maxLength={45}/>
                        <input type="text" placeholder='apelllido materno' id='inputPersonalApellidom' maxLength={45}/>
                        <button onClick={optionProfesor}>< IoSearchSharp />Buscar</button>
                        
                    </div>
                    <div className='searchProfesor'>
                        <select name='nombre' id="inputIdProfesor">
                            <option value={"not valid"}>profesores</option>
                            {nameProfesor.map(elemento => (
                                <option key={elemento.id} value={elemento.id}>{elemento.nombre} {elemento.apellido_p} {elemento.apellido_m}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <h4>Calculando pago:</h4>
                        <button onClick={calcularTotalAPagar}>Calcular</button>
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