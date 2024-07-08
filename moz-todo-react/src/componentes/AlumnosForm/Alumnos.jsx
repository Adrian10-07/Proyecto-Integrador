import React, { useEffect, useState } from 'react';
import { IoMdPersonAdd } from "react-icons/io";
import { FaUserEdit } from "react-icons/fa";
import { LuHome } from "react-icons/lu";
import { ImExit, ImIcoMoon } from "react-icons/im";
import EditModal from './ModalesForm/EditAlumno/EditModal';
import FilaDate from './filasAlumnos/FilaDate';
import { Link } from 'react-router-dom';

import './Alumnos.css';

export default function Alumnos() {
  const [data, setData] = useState([

  ]);

  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAlumnoId, setSelectedAlumnoId] = useState(null);
  const [recursos, setRecursos] = useState([]); //Necesario para obtener recursos
  const [error, setError] = useState(null); //Indica error al obtener recursos

  const handleEdit = (id) => {
    setSelectedAlumnoId(id);
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
    const url = "http://localhost:3000/alumnos/searchAlumnos";
    //Inicia objeto que va a mandar los datos a la API
    let data = {
      nombre_busqueda: "",
      apellido_p_busqueda: "",
      apellido_m_busqueda: "",
      noControlBusqueda: "",
      gradoFiltro: "",
      grupoFiltro: "",
      estatusFiltro: ""
    };

    //Obtiene objeto del elemento html, checa si tiene informacion, si la tiene, lo almacena en el objeto
    let searchName = document.getElementById("search-container-alumnos-inputSearchName").value;
    if (searchName) 
      data.nombre_busqueda = searchName;

    let searchApellidoP = document.getElementById("search-container-alumnos-inputSearchApellidoP").value;
    if (searchApellidoP) 
      data.apellido_p_busqueda = searchApellidoP;

    let searchApellidoM = document.getElementById("search-container-alumnos-inputSearchApellidoM").value;
    if (searchApellidoM) 
      data.apellido_m_busqueda = searchApellidoM;

    let searchNoControl = document.getElementById("search-container-alumnos-inputSearchNoControl").value;
    if (searchNoControl) 
      data.noControlBusqueda = parseInt(searchNoControl);

    let searchGrade = document.getElementById("search-container-alumnos-inputSearchGrade").value;
    if (searchGrade) 
      data.gradoFiltro = parseInt(searchGrade);

    let searchGroup = document.getElementById("search-container-alumnos-inputSearchGroup").value;
    if (searchGroup) 
      data.grupoFiltro = searchGroup;

    let searchEstatus = document.getElementById("search-container-alumnos-estatus").value;
    if (searchEstatus) 
      data.estatusFiltro = searchEstatus;

    //Envia la consulta a la API
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(data)
    })
    //Si hay error, imprime esto
    .then(response => {
      if(!response.ok){
        throw new Error('Error al imprimir los alumnos: ' + response.status);
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
        
        <div className='content'>Alumnos</div>
        <a href={'/'}>
          <button className='exit-right-button'><ImExit className='icon-exit' /></button>
        </a>
        
      </div>

      <div className='search-container-alumnos'>
        <input type="search-A" placeholder='Nombre' id='search-container-alumnos-inputSearchName'/>
        <input type="search-A" placeholder='Apell. Pat.' id='search-container-alumnos-inputSearchApellidoP'/>
        <input type='search-A' placeholder='Apell. Mat.' id='search-container-alumnos-inputSearchApellidoM'/>
        <input type='search-A' placeholder='No. Control.' id='search-container-alumnos-inputSearchNoControl'/>
        <button className='search-container-alumnos-aplicarBusqueda' onClick={operacionDeImpresionBusquedaYFiltro}>Buscar</button>

        <a href={'/agg'}>
          <button className='add-Alumno'><IoMdPersonAdd /></button>
        </a>
      </div>

      <div className='search-container-alumnos'>
        <input type='search-A' placeholder='Grado' id='search-container-alumnos-inputSearchGrade'/>
        <input type='search-A' placeholder='Grupo' id='search-container-alumnos-inputSearchGroup'/>
        <select id='search-container-alumnos-estatus'>
          <option id='status' value="">Seleccionar status</option>
          <option value={1}>Activo</option>
          <option value={2}>Inactivo</option>
          <option value={3}>Dado de baja</option>
          <option value={4}>Egresado</option>
        </select>
        <button id='filter' onClick={operacionDeImpresionBusquedaYFiltro}>Filtrar</button>
      </div>

      <div className='table-Alumnos'>
        <table>
          <thead>
            <tr>
              <th>No. Control</th>
              <th>Nombre</th>
              <th>Apell. Pat.</th>
              <th>Apell. Mat.</th>
              <th>Grado</th>
              <th>Grupo</th>
              <th>Turno</th>
              <th>Estatus</th>
              
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
                <td></td>
                <td></td>
                

              </tr>
            ))}
            {//Imprime los datos del recurso obtenido, por for each
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
