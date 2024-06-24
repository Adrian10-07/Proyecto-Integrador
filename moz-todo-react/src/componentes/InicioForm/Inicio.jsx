import React from 'react';
import './Inicio.css';
import { FaRegUserCircle } from "react-icons/fa";
import { LiaUsersCogSolid } from "react-icons/lia";
import { PiStudentBold } from "react-icons/pi";
import { MdOutlinePayments } from "react-icons/md";
import { ImExit } from "react-icons/im";
import { useNavigate } from 'react-router-dom';




export default function Inicio() {
  const navigate = useNavigate();

  const handleUsuariosClick = () => {
    navigate('/usuarios');}

  const handleAlumnosClick = ()=>{
    navigate('/Alumnos');}
  
  const handleEmpleadosClick =()=>{
    navigate('/Empleados')
  }

  const handlePagoDeTramitesClick = ()=>{
    navigate('/PagoDeTramite')
  }

  const handlePagoDePersonalClick = ()=>{
    navigate('/PagoDePersonal')
  }

  const handleCerrarSesionClick = ()=>{
    navigate ('/Login')
  }

  return (
    <div className='menu'>
        <div className='header'><header><h1>Instituto Montebello</h1></header></div>
      <div>      
      <button onClick={handleUsuariosClick} className='menu-button'><FaRegUserCircle className='icon' />Usuarios</button>
      <button onClick={handleAlumnosClick} className='menu-button'><PiStudentBold className='icon' />Alumnos</button>
      <button onClick={handleEmpleadosClick} className='menu-button'><LiaUsersCogSolid className='icon' />Empleados</button>
      <button onClick={handlePagoDeTramitesClick} className='menu-button'><MdOutlinePayments className='icon' />Pagos de Tramite</button>
      <button onClick={handlePagoDePersonalClick} className='menu-button'><MdOutlinePayments className='icon' />Pago de Personal</button>
      <button onClick={handleCerrarSesionClick} className='menu-button'><ImExit className='icon' />Cerrar Sesion</button>
      </div>

    </div>
  );
}
