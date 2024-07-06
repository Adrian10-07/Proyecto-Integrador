import React from 'react';
import './Inicio.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircleUser, faUserGraduate, faChalkboardUser, faMoneyBill} from '@fortawesome/free-solid-svg-icons';
import { FaRegUserCircle } from "react-icons/fa";
import { LiaUsersCogSolid } from "react-icons/lia";
import { PiStudentBold } from "react-icons/pi";
import { MdOutlinePayments } from "react-icons/md";
import { ImExit } from "react-icons/im";
import CardsOptions from './CardsInicio/CardsOptions';
import { Link } from 'react-router-dom';

export default function Inicio() {

  return (
    <div className='menu'>

      <div className='header'>
          <header>
            <h1>Instituto Montebello</h1>

            <a href={'/'}>
              <button className='menu-exit'><ImExit className='icon-exit'/></button>
            </a>

          </header>
      </div>
        
      <div className='content-cards'>
          <CardsOptions
            icono={faCircleUser} action={"Usuarios"} widhtFont={100} enlace={'/usuarios'}
          />
        
        <CardsOptions
          icono={faUserGraduate} action={"Alumnos"} widhtFont={90} enlace={'/alumnos'}
        />
        <CardsOptions
          icono={faChalkboardUser} action={"Empleados/ Profesores"} widhtFont={90} enlace={'/empleados'}
        />
        <CardsOptions
          icono={faMoneyBill} action={"Informes de pago de trámites"} widhtFont={90}
        />
        <CardsOptions
          icono={faMoneyBill} action={"Informes de pago del personal"} widhtFont={90}
        />
      </div>

    </div>
  );
}

/*
        <div className="card">
            <div>
              <FontAwesomeIcon icon={faCircleUser} fontSize={100}/>
            </div>
            <div>
              <p>Usuarios</p>
            </div>
        </div>
        <div className="card">
            <div>
              <FontAwesomeIcon icon={faUserGraduate} fontSize={90}/>
            </div>
            <div>
              <p>Alumnos</p>
            </div>
        </div>
*/

/*
  <FontAwesomeIcon icon="faUserGraduate" />
  <FontAwesomeIcon icon="faChalkboardUser"/>
  <FontAwesomeIcon icon="faMoneyBill"/>
*/


/*
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
      
*/