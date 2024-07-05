import React, { useState } from 'react';
import { IoMdPersonAdd } from "react-icons/io";
import { FaUserEdit } from "react-icons/fa";
import { LuHome } from "react-icons/lu";
import { ImExit } from "react-icons/im";
import EditModal from './ModalesForm/EditAlumno/EditModal';
import './Alumnos.css';

export default function Alumnos() {
  const [data, setData] = useState([
    { id: 1, nombre: 'Juan' },
    { id: 2, nombre: 'María' },
    { id: 3, nombre: 'Carlos' },
  ]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAlumnoId, setSelectedAlumnoId] = useState(null);

  const handleEdit = (id) => {
    setSelectedAlumnoId(id);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleDelete = () => {
    setData(data.filter(item => item.id !== selectedAlumnoId));
    closeEditModal();
  };

  const handleSave = () => {
    // Aquí puedes agregar la lógica para guardar los cambios
    console.log('Save changes for item with id:', selectedAlumnoId);
    closeEditModal();
  };

  return (
    <div>
      <div className='header-Alumnos'>
        <button className='home-left-button'><LuHome className='icon-home' /></button>

        <div className='content'>Alumnos</div>

        <button className='exit-right-button'><ImExit className='icon-exit' /></button>
      </div>

      <div className='search-container-alumnos'>

        <input type="search-A" placeholder='nombre de Alumno' />

          <a href={'/agg'}>
          <button className='add-Alumno'><IoMdPersonAdd /></button>
          </a>
        
      </div>

      <div className='table-Alumnos'>
        <table>
          <thead>
            <tr>
              <th>Matricula</th>
              <th>Nombre</th>
              <th>Estado</th>
              <th>Grado</th>
              <th>Grupo</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td></td>
                <td>{item.nombre}</td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <button onClick={() => handleEdit(item.id)}><FaUserEdit /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <EditModal
        isOpen={isEditModalOpen}
        onRequestClose={closeEditModal}
        onDelete={handleDelete}
        onSave={handleSave}
      />
    </div>
  );
}
