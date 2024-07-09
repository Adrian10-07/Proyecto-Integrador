import React, { useState, useEffect } from 'react';
import Logo2 from './AddAssets/Logo2.png';
import { FiSave } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export default function AddTramite() {
    const [nameAlum, setNameAlum] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
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
    }, []);

    const mandarALaBaseDeDatos = () => {
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

        if (!registrarFolio || !registrarConcepto || !registrarMonto || !registrarFecha || !registrarid_alumno) {
            Swal.fire('Hay campos obligatorios sin llenar');
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
            .then(data => {
                Swal.fire('Trámite registrado', '', 'success');
                setTimeout(() => {
                    navigate('/tramites');
                }, 3000);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
    };

    const handleSaveClick = () => {
        Swal.fire({
          title: "Do you want to save the changes?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Save",
          denyButtonText: "Don't save"
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire("Saved!", "", "success");
            mandarALaBaseDeDatos();
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

    return (
        <div>
            <header className='header'>
                <img src={Logo2} alt="Left" className='header-image-left' />
                Pago de trámites
                <img src={Logo2} alt="Right" className='header-image-right' />
            </header>

            <div className='Inputadd'>
                <div className='tramite'>
                    <div className='con1'>
                        <input type="text" placeholder='folio' id='inputFolio' />
                        <input type="text" placeholder='concepto' id='inputConcepto' />
                        <input type="text" placeholder='monto' id='inputMonto' />
                        <input type="date" id='inputFecha' />
                        <select name='nombre' id="inputId_alumno">
                            {nameAlum.map(elemento => (
                                <option key={elemento.id} value={elemento.id}>{elemento.nombre}</option>
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