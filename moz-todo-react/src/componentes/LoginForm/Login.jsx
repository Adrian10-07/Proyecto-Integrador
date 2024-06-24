import React from 'react';
import './Login.css';
import { CiUser, CiLock } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/inicio');
  };

  return (
    <div className='wrapper'>
      <form onSubmit={handleSubmit}>
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
        <button type='submit'>Iniciar Sesion</button>
        <div className='register-link'>
          <p>Aún no tienes una cuenta? <a href="#">Registrarse</a></p>
        </div>
      </form>
    </div>
  );
};

export default Login;

