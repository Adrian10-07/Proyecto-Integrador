import React from 'react';
import './Login.css';
import { CiUser, CiLock } from "react-icons/ci";
import LOGO from './AssetsLogin/LOGO.jpg'

function Login  ()  {


  return (
    <div className='wrapper'>
      <div>
      <img src={LOGO} alt="Left" className='header-image' />
      </div>
        <h1>Bienvenido</h1>
        <h2>Ingrese el nombre de usuario y su contraseña</h2>
        <div className='input-box'>
          <input type="text" placeholder='Nombre de Usuario' required />
          <CiUser className='icon' />
        </div>
        <div className='input-box'>
          <input type="password" placeholder='Contraseña' required />
          <CiLock className='icon' />
        </div>
        
        <a href={'/inicio'}>
        <button>Iniciar Sesion</button>
        </a>
             
    </div>
  );
};

export default Login;

