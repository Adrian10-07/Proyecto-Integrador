import React from 'react';
import './Inicio.css';
import {faCircleUser, faUserGraduate, faChalkboardUser, faMoneyBill} from '@fortawesome/free-solid-svg-icons';

import { ImExit } from "react-icons/im";
import CardsOptions from './CardsInicio/CardsOptions';

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
          icono={faMoneyBill} action={"Informes de pago de trámites"} widhtFont={90} enlace={'/tramites'}
        />
        <CardsOptions
          icono={faMoneyBill} action={"Informes de pago del personal"} widhtFont={90} enlace={'/pagosEmp'}
        />
      </div>

    </div>
  );
}