import React, { useEffect, useState } from 'react';
import { IoMdPersonAdd } from "react-icons/io";
import { FaUserEdit } from "react-icons/fa";
import { LuHome } from "react-icons/lu";
import { ImExit, ImIcoMoon } from "react-icons/im";
import FilaTram from './filasTramites/FilaTram';
import { MdNoteAdd } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";
import { FaFilter } from "react-icons/fa";
<<<<<<< HEAD




=======
>>>>>>> ac38bf34f75d7a37c7ae8c4bac96f9a84c445c94
import { Link } from 'react-router-dom';
import './Tramites.css';

export default function Tramites() {
  const [recursos, setRecursos] = useState([]); //Necesario para obtener recursos
  const [error, setError] = useState(null); //Indica error al obtener recursos


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

    let searchNombre = document.getElementById("search-container-pagos-inputSearchNombre").value;
    if (searchNombre) 
      data.nombreBusqueda = searchNombre;

    let SearchApellidoP = document.getElementById("search-container-pagos-inputSearchApellidoP").value;
    if (SearchApellidoP) 
      data.apellido_p_busqueda = SearchApellidoP;

    let SearchApellidoM = document.getElementById("search-container-pagos-inputSearchApellidoM").value;
    if (SearchApellidoM) 
      data.apellido_m_busqueda = SearchApellidoM;

    let searchFecha = document.getElementById("search-container-tramites-inputSearchFecha").value;
    if (searchFecha){
<<<<<<< HEAD
      console.log('Fecha seleccionada:', searchFecha)
    const date = new Date(searchFecha);
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    data.fechaDeCorteFiltro = formattedDate;
    console.log('Fecha formateada:', formattedDate);
    } 
      
=======
      data.fechaDeCorteFiltro = searchFecha;
    } 
>>>>>>> ac38bf34f75d7a37c7ae8c4bac96f9a84c445c94

    let searchEstatus = document.getElementById("search-container-pagos-estatus").value;
    if (searchEstatus) 
      data.estatusFiltro = searchEstatus;

    let SearchGrado = document.getElementById("search-container-pagos-inputSearchGrade").value;
    if (SearchGrado) 
      data.gradoFiltro = SearchGrado;

    let SearchGrupo = document.getElementById("search-container-pagos-inputSearchGroup").value;
<<<<<<< HEAD
    if (SearchGrado) 
=======
    if (SearchGrupo) 
>>>>>>> ac38bf34f75d7a37c7ae8c4bac96f9a84c445c94
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
      <div className='header-Pagos'>
        <Link to={'/inicio'}>
          <button className='home-left-button-pagos'><LuHome className='icon-home-pagos' /></button>
        </Link>
        
        <div className='content'>Trámites</div>
        <button className='exit-right-button-pagos'><ImExit className='icon-exit-pagos' /></button>
      </div>

      <div className='search-container-pagos'>
        <input type="search-A" placeholder='Folio' id='search-container-tramites-inputSearchFolio'/>
        <input type="search-A" placeholder='Concepto' id='search-container-tramites-inputSearchConcepto'/>
        <input type='search-A' placeholder='Nombre' id='search-container-pagos-inputSearchNombre'/>
        <input type='search-A' placeholder='Ape. P.' id='search-container-pagos-inputSearchApellidoP'/>
        <input type="search-A" placeholder='Ape. M' id='search-container-pagos-inputSearchApellidoM'/>
        <input type="date" id='search-container-tramites-inputSearchFecha'/>

        <button id='search-container-pagos-aplicarBusqueda' onClick={operacionDeImpresionBusquedaYFiltro}><IoSearchSharp /></button>

        <a href={'/addTra'}>
          <button className='add-pago'>< MdNoteAdd /></button>
        </a>
      </div>

      <div className='search-container-pagos'>
        <input type='search-A' placeholder='Grado' id='search-container-pagos-inputSearchGrade'/>
<<<<<<< HEAD
        <input type='search-A' placeholder='Grupo' id='search-container-pagos-inputSearchGroup'/>
=======
        <input type='search-A' placeholder='Grupo' id='search-container-pagos-inputSearchGroup' maxLength={1}/>
>>>>>>> ac38bf34f75d7a37c7ae8c4bac96f9a84c445c94
        <select id='search-container-pagos-estatus'>
          <option id='status-pago' value="">Seleccionar estatus</option>
          <option value={1}>Pendiente</option>
          <option value={2}>Por pagar</option>
          <option value={3}>Pagado</option>
          <option value={4}>Atrasado</option>
        </select>
        <button id='filter-pago' onClick={operacionDeImpresionBusquedaYFiltro}><FaFilter /></button>
      </div>

      <div className='table-tramites'>
        <table>
          <thead>
            <tr>
              <th>Folio</th>
              <th>Solicitante del trámite</th>
              <th>Grado</th>
              <th>Grupo</th>
              <th>Concepto</th>
              <th>Monto</th>
              <th>Fecha de corte</th>
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
                actualizarLista={operacionDeImpresionBusquedaYFiltro}
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
