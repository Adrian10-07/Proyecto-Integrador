import React,{ useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LuHome } from "react-icons/lu";
import { ImExit, ImIcoMoon } from "react-icons/im";
import { FaFilter } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import { IoMdPersonAdd } from "react-icons/io";
import FilaPersonal from "./FilaPersonal/FilaPersonal";
import FilaProfesor from "./FilaProfesores/FilaProfesor";

export default function Personal (){
    const [dataPer, setDataPer] = useState([]);
    const [dataProf, setDataProf] = useState([]);
    const [recursos, setRecursos] = useState([]); //Necesario para obtener recursos
    const [error, setError] = useState(null); //Indica error al obtener recursos
    
    const operacionDeImpresionBusquedaYFiltroDePersonal = () => {
        const url = "http://localhost:3000/empleados/searchPer";
        //Inicia objeto que va a mandar los datos a la API
        let data = {
            nombre_busqueda : "", 
            apellido_p_busqueda : "", 
            apellido_m_busqueda : "", 
            estatusFiltro : "", 
            cargoFiltro : "", 
            areaFiltro : ""
        };
    
        //Obtiene objeto del elemento html, checa si tiene informacion, si la tiene, lo almacena en el objeto
        let searchName = document.getElementById("search-container-personalMaestro-inputSearchName").value;
        if (searchName) 
          data.nombre_busqueda = searchName;
    
        let searchApellidoP = document.getElementById("search-container-personalMaestro-inputSearchApellidoP").value;
        if (searchApellidoP) 
          data.apellido_p_busqueda = searchApellidoP;
    
        let searchApellidoM = document.getElementById("search-container-personalMaestro-inputSearchApellidoM").value;
        if (searchApellidoM) 
          data.apellido_m_busqueda = searchApellidoM;
    
        let searchEstatus = document.getElementById("search-container-personalMaestro-estatus").value;
        if (searchEstatus) 
          data.estatusFiltro = searchEstatus;

        let searchArea = document.getElementById("search-container-personal-area").value;
        if (searchArea)
            data.areaFiltro = searchArea;

        let searchCargo = document.getElementById("search-container-personal-cargo").value;
        if (searchCargo)
            data.cargoFiltro = searchCargo;
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
            setDataPer(response);
        })
        .catch(error => {
            setError(error.message);
        });
      }

    const operacionDeImpresionBusquedaYFiltroDeProfesores = (buscarNombre, buscarApellidoP, buscarApellidoM, buscarEstatus) => {
        const url = "http://localhost:3000/empleados/searchPro";
        //Inicia objeto que va a mandar los datos a la API
        let data = {
            nombre_busqueda : "", 
            apellido_p_busqueda : "", 
            apellido_m_busqueda : "", 
            estatusFiltro : "", 
            cargoFiltro : "", 
            areaFiltro : ""
        };
    } 
    
      useEffect(()=>{
        operacionDeImpresionBusquedaYFiltroDePersonal();
      }, []);

    return(
        <div>
            <div className='header-Alumnos'>
                <Link to={'/inicio'}>
                    <button className='home-left-button'><LuHome className='icon-home' /></button>
                </Link>
        
            <div className='content'>Personal y Maestros</div>
            <a href={'/'}>
                <button className='exit-right-button'><ImExit className='icon-exit' /></button>
            </a>
        
        </div>

        <div className='search-container-alumnos'>
            <input type="search-A" placeholder='Nombre' id='search-container-personalMaestro-inputSearchName'/>
            <input type="search-A" placeholder='Apell. Pat.' id='search-container-personalMaestro-inputSearchApellidoP'/>
            <input type='search-A' placeholder='Apell. Mat.' id='search-container-personalMaestro-inputSearchApellidoM'/>
            <button className='search-container-personalMaestro-aplicarBusqueda'><IoSearchSharp /></button>

            <a href={'/agg'}>
                <button className='add-Alumno'><IoMdPersonAdd /></button>
            </a>
        </div>

        <div className='search-container-alumnos'>
            <select id="search-container-personal-area">
                <option value="">Seleccionar Area</option>
                <option value={1}>Administrativa</option>
                <option value={2}>Dirección</option>
                <option value={3}>Financiera</option>
                <option value={4}>Control Escolar</option>
                <option value={5}>Recursos humanos</option>
            </select>
            <select id="search-container-personal-cargo">
                <option value="">Seleccionar Cargo</option>
                <option value={1}>Docente</option>
                <option value={2}>Coordinador</option>
                <option value={3}>Administrativo</option>
                <option value={4}>Directivo</option>
                <option value={5}>Contador</option>
            </select>
            <select id="search-container-profesor-especialidad">
                <option value="">Seleccionar especialidad</option>
                <option value={1}>Humanidades</option>
                <option value={2}>Matemáticas</option>
                <option value={3}>Ciencias</option>
                <option value={4}>Artes</option>
                <option value={5}>Informática</option>
            </select>
            <select id='search-container-personalMaestro-estatus'>
                <option id='status' value="">Seleccionar status</option>
                <option value={1}>Activo</option>
                <option value={2}>Inactivo</option>
                <option value={3}>Dado de baja</option>
                <option value={4}>Egresado</option>
            </select>
            <button id='filter' ><FaFilter /></button>
        </div>

        <div className='table-Alumnos'>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apell. Pat.</th>
                        <th>Apell. Mat.</th>
                        <th>Cargo</th>
                        <th>Área / Especialidad</th>
                        <th>Estatus</th>
                    </tr>
                </thead>
                <tbody>
                    {//Imprime los datos del recurso obtenido, por for each
                        dataPer.length > 0 ? (
                        dataPer.map((recursoPer) => (//Falta poner el componente de la fila de personal
                        <FilaPersonal perId={recursoPer.id} perNombre={recursoPer.nombre} perApellidoP={recursoPer.apellido_p} perApellidoM={recursoPer.apellido_m} perArea={recursoPer.nombre_area} perCargo={recursoPer.nombre_cargo} perEstatus={recursoPer.tipo_estatus} />
                    ))
                    ) : (
                    <tr>
                        <td colSpan="8">No hay datos</td>
                    </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
    );
}