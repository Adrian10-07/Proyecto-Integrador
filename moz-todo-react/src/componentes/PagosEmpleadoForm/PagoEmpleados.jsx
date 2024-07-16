import React, { useEffect, useState } from 'react';
import { IoMdPersonAdd } from "react-icons/io";
import { FaUserEdit } from "react-icons/fa";
import { LuHome } from "react-icons/lu";
import { ImExit, ImIcoMoon } from "react-icons/im";
import { MdNoteAdd } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";
import { FaFilter } from "react-icons/fa";
import FilasPagosEmp from './FilasPagos/FilasPagosEmp';

import { Link } from 'react-router-dom';


export default function PagoEmpleados() {
  const [data, setData] = useState([
    { id: 1, folio: 'Juan' },
    { id: 2, folio: 'María' },
    { id: 3, folio: 'Carlos' },
  ]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [recursos, setRecursos] = useState([]); //Necesario para obtener recursos
  const [error, setError] = useState(null); //Indica error al obtener recursos

  const handleEdit = (id) => {
    setSelectedId(id);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleDelete = () => {
    setRecursos(recursos.filter(item => item.id !== selectedId));
    closeEditModal();
  };

  const handleSave = () => {
    // Aquí puedes agregar la lógica para guardar los cambios
    console.log('Save changes for item with id:', selectedId);
    closeEditModal();
  };

  const buscarOFiltrar = () => {
    //busqueda solo del personal
    const url = "http://localhost:3000/PagoEmp/searchP";
    let data = {
        nombreB:"",
        apellido_pB:"",
        apellido_mB:"",
        fechaPagoB:"",
        estatusF:""
    };


    let searchNombre = document.getElementById("search-container-pagos-inputSearchNombre").value;
    if (searchNombre) 
      data.nombreB = searchNombre;

    let SearchApellidoP = document.getElementById("search-container-pagos-inputSearchApellidoP").value;
    if (SearchApellidoP) 
      data.apellido_pB = SearchApellidoP;

    let SearchApellidoM = document.getElementById("search-container-pagos-inputSearchApellidoM").value;
    if (SearchApellidoM) 
      data.apellido_mB = SearchApellidoM;

    let searchFecha = document.getElementById("search-container-tramites-inputSearchFecha").value;
    if (searchFecha){
      data.fechaPagoB = searchFecha;
    } 
    let searchEstatus = document.getElementById("search-container-pagos-estatus").value;
    if (searchEstatus) 
      data.estatusF = searchEstatus;
;

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(data)
     })
    .then(response => {
      if(!response.ok){
        throw new Error('Error al imprimir los pagos: ' + response.status);
      }
      return response.json();
    })
    .then(response => {
      setRecursos(response);
    })
    .catch(error => {
      setError(error.message);
    });
  }

  useEffect(()=>{
    buscarOFiltrar();
  }, []);

  return (
    <div>
      <div className='header-Pagos'>
        <Link to={'/inicio'}>
          <button className='home-left-button-pagos'><LuHome className='icon-home-pagos' /></button>
        </Link>
        
        <div className='content'>Pagos de empleados</div>
        <button className='exit-right-button-pagos'><ImExit className='icon-exit-pagos' /></button>
      </div>

      <div className='search-container-pagos'>
        <input type='search-A' placeholder='Nombre' id='search-container-pagos-inputSearchNombre'/>
        <input type='search-A' placeholder='Ape. P.' id='search-container-pagos-inputSearchApellidoP'/>
        <input type="search-A" placeholder='Ape. M' id='search-container-pagos-inputSearchApellidoM'/>
        <input type="date" id='search-container-tramites-inputSearchFecha'/>

        <button id='search-container-pagos-aplicarBusqueda' onClick={buscarOFiltrar}><IoSearchSharp /></button>

        <a href={'/addPer'}>
          <button className='add-pago'>PagoEmpleado< MdNoteAdd /></button>
        </a>
        <a href={'/addPro'}>
          <button className='add-pago'>PagoMaestro< MdNoteAdd /></button>
        </a>
      </div>

      <div className='search-container-pagos'>
        <select id='search-container-pagos-estatus'>
          <option id='status-pago' value="">Seleccionar estatus</option>
          <option value={1}>Pendiente</option>
          <option value={2}>Por pagar</option>
          <option value={3}>Pagado</option>
          <option value={4}>Atrasado</option>
        </select>
        <button id='filter-pago' onClick={buscarOFiltrar}><FaFilter /></button>
      </div>

      <div className='table-tramites'>
        <table>
          <thead>
            <tr> 
                <th>Fecha</th>
                <th>Empleado</th>
                <th>Horas trabajadas</th>
                <th>Cargo</th>
                <th>Estatus del pago</th>
                <th>Total a pagar</th>
            </tr>
          </thead>
          <tbody>
            {recursos.length > 0 ? (
              recursos.map((recurso) => (
              <tr><td></td></tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No hay datos</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
