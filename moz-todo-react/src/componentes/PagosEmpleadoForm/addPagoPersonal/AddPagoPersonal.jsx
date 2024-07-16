import React, { useState, useEffect} from 'react';
import Logo2 from './AddAssets/Logo2.png';
import { FiSave } from 'react-icons/fi';
import { MdOutlineCancel } from 'react-icons/md';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { IoSearchSharp } from 'react-icons/io5';

export default function AddPagoPersonal () {
    const [namePersonal, setNamePersonal] = useState([]);
    const [searching, setSearching] = useState({
        nombre:''
    });
    const navigate = useNavigate();

    const handleSearchChange = (e) => {
        const { name, value } = e.target;
        setSearching(prevState => ({
            ...prevState, [name]: value
        }));
    };

    const optionPersonal = () => {
        const url = "http://localhost:3000/PagoEmp/optionPersonal";

        let dato = {
            "nombre_busqueda":"",
            "apellido_p_busqueda":"",
            "apellido_m_busqueda":""
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
    }

    const dbPersonal = () => {
        return new Promise ((resolve, reject) => {
            const url = "http://localhost:3000/PagoEmp/pagoPer";
            let data = {
                horasTrabajadas: "",
                totalPago: "",
                fechaDeCorte:"",
                idPersonal:"",

            };
            let registrarHoras = document.getElementById('inputHoras').value;
            let registrarTotal = document.getElementById('inputTotal').value;
            let registrarFecha = document.getElementById('inputFecha').value;
            let registraridPersonal = document.getElementById('inputIdPersonal').value;

            if (!registrarHoras || !registrarTotal || !registrarFecha ||registraridPersonal == "not valid") {
                resolve(false)
            } else {
                data.horasTrabajadas = registrarHoras;
                data.totalPago = registrarTotal;
                data.fechaDeCorte = registrarFecha;
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
                dbPersonal()
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
                    <p>Generar</p>
                <div className='pagoPersonal'>
                    <div className='box_personal'>
                        <input type="number" placeholder='Horas trabajadas' id='inputHoras' maxLength={10}/>
                        <input type="number" id="inputTotal" placeholder='Total a pagar'/>
                        <input type="date" id='inputFecha' />
                        
                    </div>
                    <div className='searchPersonal'>
                        <input type='text' placeholder='Nombre' id='inputPersonalName' maxLength={45}/>
                        <input type="text" placeholder='apellido paterno' id='inputPersonalApellidop' maxLength={45}/>
                        <input type="text" placeholder='apelllido materno' id='inputPersonalApellidom' maxLength={45}/>
                        <button onClick={optionPersonal}>< IoSearchSharp />Buscar</button>
                        
                    </div>
                    <div className='searchPersonal'>
                        <select name='nombre' id="inputIdPersonal">
                            <option value={"not valid"}>Personal</option>
                            {namePersonal.map(elemento => (
                                <option key={elemento.id} value={elemento.id}>{elemento.nombre} {elemento.apellido_p} {elemento.apellido_m}</option>
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