import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './componentes/LoginForm/Login.jsx';
import Inicio from './componentes/InicioForm/Inicio.jsx';
import Usuarios from './componentes/UsuariosForm/Usuarios.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;

