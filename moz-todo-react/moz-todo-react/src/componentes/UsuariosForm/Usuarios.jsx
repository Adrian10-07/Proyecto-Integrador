import React, { useState } from 'react';
import { IoMdPersonAdd } from "react-icons/io";
import { FaUserEdit } from "react-icons/fa";
import { LuHome } from "react-icons/lu";
import { ImExit } from "react-icons/im";
import './Usuarios.css';

const TableComponent = () => {
  const [data, setData] = useState([
    { id: 1, nombre: 'Juan' },
    { id: 2, nombre: 'María' },
    { id: 3, nombre: 'Carlos' },
  ]);

  const handleEdit = (id) => {
    // Implement your edit logic here
    console.log('Edit item with id:', id);
  };

  return (
    <div>
      <div className='header'>
        <button className='header-left-button'><LuHome className='icon-home' /></button>
        <div className='header-content'>Usuarios</div>
        <button className='header-right-button'><ImExit className='icon-exit' /></button>
      </div>

      <div className='search-container'>
        <input type="search" placeholder='nombre de usuario' />
        <button className='add'><IoMdPersonAdd /></button>
      </div>

      <div className='table'>      
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nombre}</td>
                <td>
                  <button onClick={() => handleEdit(item.id)}><FaUserEdit /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableComponent;
