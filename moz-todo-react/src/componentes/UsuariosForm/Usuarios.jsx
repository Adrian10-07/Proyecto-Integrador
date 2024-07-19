import React, { useState, useEffect } from 'react';
import { IoMdPersonAdd } from "react-icons/io";
import { FaUserEdit } from "react-icons/fa";
import { LuHome } from "react-icons/lu";
import { ImExit } from "react-icons/im";
import { Link } from 'react-router-dom';
import FilaUsuarios from './FilaUsuarios/FilaUsuarios';
import './Usuarios.css';

const TableComponent = () => {
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);

  const imprimirUsuarios = () => {
    const url = `http://localhost:3000/usersJWT/`;

    fetch(url)
    .then(response => {
      if(!response.ok){
        throw new Error('Error al imprimir los alumnos: ' + response.status);
      }
      return response.json();
    })
    //Si todo esta bien, recibe la respuesta
    .then(response => {
      setUsers(response);
    })
    .catch(error => {
      setError(error.message);
    });
  }

  useEffect(()=>{
    imprimirUsuarios();
  }, []);

  return (
    <div>
      <div className='header'>
        <Link to={'/inicio'}>
          <button className='home-left-button'><LuHome className='icon-home' /></button>
        </Link>
        <div className='header-content'>Usuarios</div>
        <button className='header-right-button'><ImExit className='icon-exit' /></button>
      </div>

      <div>
        <Link to={"/aggUsers"}>
          <button>Agregar</button>
        </Link>
      </div>

      <div className='table'>      
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre de Usuario</th>
              <th>Tipo de Usuario</th>
              <th>Empleado al que fue Asignado</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item) => (
              <FilaUsuarios key={item.id} data={item} actualizar={imprimirUsuarios}/>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableComponent;

/* 
      <div className='search-container'>
        <input type="search" placeholder='nombre de usuario' />
        <button className='add'><IoMdPersonAdd /></button>
      </div>
*/