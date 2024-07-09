import React, { useEffect, useState } from 'react';
import { IoMdPersonAdd } from "react-icons/io";
import { FaUserEdit } from "react-icons/fa";
import { LuHome } from "react-icons/lu";
import { ImExit, ImIcoMoon } from "react-icons/im";
import FilaTram from './filasTramites/FilaTram';

import { Link } from 'react-router-dom';

import './Tramites.css';

export default function Tramites() {
  const [data, setData] = useState([
    { id: 1, folio: 'Juan' },
    { id: 2, folio: 'María' },
    { id: 3, folio: 'Carlos' },
  ]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTramiteId, setSelectedTramiteId] = useState(null);
  const [recursos, setRecursos] = useState([]); //Necesario para obtener recursos
  const [error, setError] = useState(null); //Indica error al obtener recursos

  const handleEdit = (id) => {
    setSelectedTramiteId(id);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleDelete = () => {
    setRecursos(recursos.filter(item => item.id !== selectedTramiteId));
    closeEditModal();
  };

  const handleSave = () => {
    // Aquí puedes agregar la lógica para guardar los cambios
    console.log('Save changes for item with id:', selectedTramiteId);
    closeEditModal();
  };

  const operacionDeImpresionBusquedaYFiltro = () => {
    const url = "http://localhost:3000/tramites/search";
    let data = {
      folio_busqueda: "",
      concepto_busqueda: "",
      nombreBusqueda: "",
      apellido_p_busqueda: "",
      apellido_m_busqueda: "",
      fechaDeCorteFiltro: "",
      estatusFiltro: "",
      gradoFiltro: "",
      grupoFiltro: ""
    };

    let searchFolio = document.getElementById("search-container-tramites-inputSearchFolio").value;
    if (searchFolio) 
      data.folio_busqueda = parseInt(searchFolio);

    let searchConcepto = document.getElementById("search-container-tramites-inputSearchConcepto").value;
    if (searchConcepto) 
      data.concepto_busqueda = searchConcepto;

    let searchNombre = document.getElementById("search-container-alumnos-inputSearchNombre").value;
    if (searchNombre) 
      data.nombreBusqueda = searchNombre;

    let SearchApellidoP = document.getElementById("search-container-alumnos-inputSearchApellidoP").value;
    if (SearchApellidoP) 
      data.apellido_p_busqueda = SearchApellidoP;

    let SearchApellidoM = document.getElementById("search-container-alumnos-inputSearchApellidoM").value;
    if (SearchApellidoM) 
      data.apellido_m_busqueda = SearchApellidoM;

    let searchFecha = document.getElementById("search-container-tramites-inputSearchFecha").value;
    if (searchFecha){
      console.log(searchFecha)
      data.fechaDeCorteFiltro = searchFecha;
    } 
      

    let searchEstatus = document.getElementById("search-container-alumnos-estatus").value;
    if (searchEstatus) 
      data.estatusFiltro = searchEstatus;

    let SearchGrado = document.getElementById("search-container-alumnos-inputSearchGrade").value;
    if (SearchGrado) 
      data.gradoFiltro = SearchGrado;

    let SearchGrupo = document.getElementById("search-container-alumnos-inputSearchGroup").value;
    if (SearchGrado) 
      data.grupoFiltro = SearchGrupo;

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(data)
     })
    .then(response => {
      if(!response.ok){
        throw new Error('Error al imprimir los trámites: ' + response.status);
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
    operacionDeImpresionBusquedaYFiltro();
  }, []);

  return (
    <div>
      <div className='header-Alumnos'>
        <Link to={'/inicio'}>
          <button className='home-left-button'><LuHome className='icon-home' /></button>
        </Link>
        
        <div className='content'>Trámites</div>
        <button className='exit-right-button'><ImExit className='icon-exit' /></button>
      </div>

      <div className='search-container-alumnos'>
        <input type="search-A" placeholder='Folio' id='search-container-tramites-inputSearchFolio'/>
        <input type="search-A" placeholder='Concepto' id='search-container-tramites-inputSearchConcepto'/>
        <input type='search-A' placeholder='Nombre' id='search-container-alumnos-inputSearchNombre'/>
        <input type='search-A' placeholder='Ape. P.' id='search-container-alumnos-inputSearchApellidoP'/>
        <input type="search-A" placeholder='Ape. M' id='search-container-alumnos-inputSearchApellidoM'/>
        <input type="date" id='search-container-tramites-inputSearchFecha'/>

        <button id='search-container-alumnos-aplicarBusqueda' onClick={operacionDeImpresionBusquedaYFiltro}>Buscar</button>

        <a href={'/addTra'}>
          <button className='add-Alumno'>Agregar</button>
        </a>
      </div>

      <div className='search-container-alumnos'>
        <input type='search-A' placeholder='Grado' id='search-container-alumnos-inputSearchGrade'/>
        <input type='search-A' placeholder='Grupo' id='search-container-alumnos-inputSearchGroup'/>
        <select id='search-container-alumnos-estatus'>
          <option value="">--Seleccionar estatus--</option>
          <option value={1}>Pendiente</option>
          <option value={2}>Por pagar</option>
          <option value={3}>Pagado</option>
          <option value={4}>Atrasado</option>
        </select>
        <button onClick={operacionDeImpresionBusquedaYFiltro}>Filtrar</button>
      </div>

      <div className='table-Alumnos'>
        <table>
          <thead>
            <tr>
              <th>Folio</th>
              <th>Solicitante del trámite</th>
              <th>Grado</th>
              <th>Grupo</th>
              <th>Concepto</th>
              <th>Monto</th>
              <th>Fecha</th>
              <th>Estatus del pago</th>
            </tr>
          </thead>
          <tbody>
            {recursos.length > 0 ? (
              recursos.map((recurso) => (
              <FilaTram key={recurso.id} idT={recurso.id} folioT={recurso.folio} nombreAlm={recurso.nombre} 
                apellidoP={recurso.apellido_p} apellidoM={recurso.apellido_m} gradoAlm={recurso.grado}
                grupoAlm={recurso.grupo} conceptoT={recurso.concepto} montoT={recurso.monto}
                fechaDeCorteT={recurso.fechaDeCorte} estatusTramiteT={recurso.tipo_estatus}
              />
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
