import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './componentes/LoginForm/Login';
import Inicio from './componentes/InicioForm/Inicio';
import Usuarios from './componentes/UsuariosForm/Usuarios';
import Alumnos from './componentes/AlumnosForm/Alumnos';
import AggAlumno from './componentes/AlumnosForm/Alum-Add/AggAlumno';

const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>Home</h1>,
    errorElement: <h1>Error</h1>
  },
  {
    path: "/Login",
    element: <Login/>,
  },
  {
    path: "/Inicio",
    element: <Inicio />,
  },
  {
    path: "/Usuarios",
    element: <Usuarios/>,
  },
  {
    path: "/Alumnos",
    element: <Alumnos/>,
  },
  {
    path: "/Agg",
    element: <AggAlumno/>,
  },
])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider  router = {router}/>
  </React.StrictMode>
);
