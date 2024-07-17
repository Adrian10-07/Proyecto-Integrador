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
  const [pagEmp, setPagEmp] = useState([]); //Necesario para obtener recursos
  const [pagPro, setPagPro] = useState([]);
  const [error, setError] = useState(null); //Indica error al obtener recursos

  const buscarOFiltrar = () => {
    //busqueda solo del personal
    const url1 = "http://localhost:3000/PagoEmp/searchP";
    const url2 = "http://localhost:3000/PagoEmp/searchPro";
    
    let data1 = {
        nombreB:"",
        apellido_pB:"",
        apellido_mB:"",
        fechaPagoB:"",
        estatusF:""
    };

    let data2 = {
        nombreB:"",
        apellido_pB:"",
        apellido_mB:"",
        fechaPagoB:"",
        estatusF:""
    }

    let searchNombre = document.getElementById("search-container-pagos-inputSearchNombre").value;
    if (searchNombre) {
      data1.nombreB = searchNombre;
      data2.nombreB = searchNombre;
    }

    let SearchApellidoP = document.getElementById("search-container-pagos-inputSearchApellidoP").value;
    if (SearchApellidoP) {
      data1.apellido_pB = SearchApellidoP;
      data2.apellido_pB = SearchApellidoP;
    }

    let SearchApellidoM = document.getElementById("search-container-pagos-inputSearchApellidoM").value;
    if (SearchApellidoM) {
      data1.apellido_mB = SearchApellidoM;
      data2.apellido_mB = SearchApellidoM;
    }

    let searchFecha = document.getElementById("search-container-tramites-inputSearchFecha").value;
    if (searchFecha){
      data1.fechaPagoB = searchFecha;
      data2.fechaPagoB = searchFecha;
    } 
    let searchEstatus = document.getElementById("search-container-pagos-estatus").value;
    if (searchEstatus) {
      data1.estatusF = searchEstatus;
      data2.estatusF = searchEstatus;
    }
;

    fetch(url1, {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(data1)
     })
    .then(response => {
      if(!response.ok){
        throw new Error('Error al imprimir los pagos: ' + response.status);
      }
      return response.json();
    })
    .then(response => {
      setPagEmp(response);
    })
    .catch(error => {
      setError(error.message);
    });

    fetch(url2, {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(data2)
     })
    .then(response => {
      if(!response.ok){
        throw new Error('Error al imprimir los pagos: ' + response.status);
      }
      return response.json();
    })
    .then(response => {
      setPagPro(response);
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
                <th>Empleado</th>
                <th>Cargo</th>
                <th>Horas trabajadas</th>
                <th>Total a pagar</th>
                <th>Fecha de pago</th>
                <th>Estatus del pago</th>
            </tr>
          </thead>
          <tbody>
            {pagEmp.length > 0 ? (
              pagEmp.map((recurso) => (
              <FilasPagosEmp key={recurso.id} idP={recurso.id} nombreEmp={recurso.nombre} apellidoP={recurso.apellido_p} apellidoM={recurso.apellido_m} carg={recurso.nombre_cargo} horasTra={recurso.horasTrabajadas} totalPago={recurso.totalPago}  fechaDeCorte={recurso.fechaPago} estatusTramite={recurso.tipo_estatus} actualizarLista={buscarOFiltrar}/>
              ))
            ) : (
              <tr>
                <td colSpan="6">No hay datos de pgos de empleados</td>
              </tr>
            )}
            {pagPro.length > 0 ? (
              pagPro.map((recurso) => (
                <FilasPagosEmp key={recurso.id} idP={recurso.id} nombreEmp={recurso.nombre} apellidoP={recurso.apellido_p} apellidoM={recurso.apellido_m} carg={"Docente"} horasTra={recurso.horasTrabajadas} totalPago={recurso.totalPago}  fechaDeCorte={recurso.fechaPago} estatusTramite={recurso.tipo_estatus} actualizarLista={buscarOFiltrar}/>
              ))
            ) : (
              <tr>
                <td colSpan="6">No hay datos de pago de maestros</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}