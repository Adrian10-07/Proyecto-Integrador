import React from 'react';
import './Inicio.css';
import { FaRegUserCircle } from "react-icons/fa";
import { LiaUsersCogSolid } from "react-icons/lia";
import { PiStudentBold } from "react-icons/pi";
import { MdOutlinePayments } from "react-icons/md";
import { ImExit } from "react-icons/im";




export default function Inicio() {

  return (
    <div className='menu'>

      <div className='header'>
          <header>
            <h1>Instituto Montebello</h1>

            <a href={'/'}>
              <button className='menu-exit'><ImExit className='icon-exit' /></button>
            </a>

          </header>
      </div>

      <div>
      
      <a href={'/usuarios'}>
      <button  className='menu-button'><FaRegUserCircle className='icon' />Usuarios</button>
      </a>

      <a href={'/alumnos'}>
      <button  className='menu-button'><PiStudentBold className='icon' />Alumnos</button>
      </a>

      <a href={'/empleados'}>
      <button  className='menu-button'><LiaUsersCogSolid className='icon' />Empleados</button>
      </a>
      
      <button  className='menu-button'><MdOutlinePayments className='icon' />Pagos de Tramite</button>
      <button  className='menu-button'><MdOutlinePayments className='icon' />Pago de Personal</button>
      
      </div>

    </div>
  );
}
