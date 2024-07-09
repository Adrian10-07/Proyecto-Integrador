import React, { useEffect, useState } from 'react';
import { IoMdPersonAdd } from "react-icons/io";
import { FaUserEdit } from "react-icons/fa";
import { LuHome } from "react-icons/lu";
import { ImExit, ImIcoMoon } from "react-icons/im";
import EditModal from './ModalesForm/EditAlumno/EditModal';
import FilaDate from './filasAlumnos/FilaDate';
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
    setRecursos(recursos.filter(item => item.id !== selectedAlumnoId));
    closeEditModal();
  };

  const handleSave = () => {
    // Aquí puedes agregar la lógica para guardar los cambios
    console.log('Save changes for item with id:', selectedAlumnoId);
    closeEditModal();
  };

  //Funcion que imprime los datos de los alumnos en la tabla
  const operacionDeImpresionBusquedaYFiltro = () => {
    const url = "http://localhost:3000/tramites/search";
    //Inicia objeto que va a mandar los datos a la API
    let data = {
        folio_busqueda:"",
        concepto_busqueda:"",
        nombreBusqueda:"",
        apellido_p_busqueda:"",
        apellido_m_busqueda:"",
        fechaDeCorteFiltro:"",
        estatusFiltro:"",
        gradoFiltro:"",
        grupoFiltro:""
    };

    //Obtiene objeto del elemento html, checha si tiene informacion, si la tiene, lo almacena en el objeto
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
    if (searchFecha) 
      data.fechaDeCorteFiltro = searchFecha;

    let searchEstatus = document.getElementById("search-container-tramites-estatus").value;
    if (searchEstatus) 
      data.estatusFiltro = searchEstatus;
    let SearchGrado = document.getElementById("search-container-alumnos-inputSearchGrado").value;
    if (SearchGrado) 
      data.gradoFiltro = SearchGrado;
    let SearchGrupo = document.getElementById("search-container-alumnos-inputSearchGrupo").value;
    if (SearchGrado) 
      data.grupoFiltro = SearchGrupo;

    //Envia la consulta a la API
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(data)
     })
    //Si hay error, imprime esto
    .then(response => {
      if(!response.ok){
        throw new Error('Error al imprimir los trámites: ' + response.status);
      }
      return response.json();
    })
    //Si todo esta bien, recibe la respuesta
    .then(response => {
      setRecursos(response);
    })
    .catch(error => {
      setError(error.message);
    });
  }

  //Al cargar la page, ejecuta la funcion
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
          <button className='add-Alumno'><IoMdPersonAdd /></button>
        </a>
      </div>

      <div className='search-container-alumnos'>
        <input type='search-A' placeholder='Grado' id='search-container-alumnos-inputSearchGrade'/>
        <input type='search-A' placeholder='Grupo' id='search-container-alumnos-inputSearchGroup'/>
        <select id='search-container-alumnos-estatus'>
          <option value="">--Seleccionar status--</option>
          <option value={1}>Activo</option>
          <option value={2}>Inactivo</option>
          <option value={3}>Dado de baja</option>
          <option value={4}>Egresado</option>
        </select>
        <button onClick={operacionDeImpresionBusquedaYFiltro}>Filtrar</button>
      </div>

      <div className='table-Alumnos'>
        <table>
          <thead>
            <tr>
              <th>Folio</th>
              <th>Concepto</th>
              <th>Monto</th>
              <th>Fecha</th>
              <th>id del alumno</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td></td>
                <td>{item.nombre}</td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <button onClick={() => handleEdit(item.id)}><FaUserEdit /></button>
                </td>
              </tr>
            ))}
          
            {//Imprime los datos del recurso obtenido, por for each
            //NO EDITE NADA DE AQUI
              recursos.length > 0 ? (
              recursos.map((recurso) => (
                <FilaDate key={recurso.id} idAlumno={recurso.id} noControlAlumno={recurso.noControl} nombreAlumno={recurso.nombre} apellidoPAlumno={recurso.apellido_p} apellidoMAlumno={recurso.apellido_m} gradoAlumno={recurso.grado} grupoAlumno={recurso.grupo} turnoAlumno={recurso.turno} estatusAlumno={recurso.tipo_estatus} />
              ))
            ) : (
              <tr>
                <td colSpan="8">No hay datos</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <EditModal
        isOpen={isEditModalOpen}
        onRequestClose={closeEditModal}
        onDelete={handleDelete}
        onSave={handleSave}
      />
    </div>
  );
}
