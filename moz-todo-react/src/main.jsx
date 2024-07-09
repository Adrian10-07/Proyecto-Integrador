import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Inicio from './componentes/InicioForm/Inicio';
import Usuarios from './componentes/UsuariosForm/Usuarios';
import Alumnos from './componentes/AlumnosForm/Alumnos';
import AggAlumno from './componentes/AlumnosForm/Alum-Add/AggAlumno';
import NestedModal from './componentes/PagosEmpleadoForm/ChildModal';
import Tramites from './componentes/PagosTramtesForm/Tramites';
import AddTramite from './componentes/PagosTramtesForm/AddTram/AddTramite';
import EditAlum from './componentes/PagosEmpleadoForm/EditAlum';

import App from './App';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <h1>Error</h1>
  },
  
  {
    path: "/inicio",
    element: <Inicio/>,
  },
  {
    path: "/usuarios",
    element: <Usuarios/>,
  },
  {
    path: "/alumnos",
    element: <Alumnos/>,
  },
  {
    path: "/agg",
    element: <AggAlumno/>,
  },
  {
    path: "/empleados",
    element: <NestedModal/>,
  },
  {
    path:'/tramites',
    element:<Tramites/>,
  },
  {
    path: "/addTra",
    element: <AddTramite/>,
  },
  {
    path: '/editAlumno',
    element: <EditAlum></EditAlum>,
  },
])



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider  router = {router}/>
  </React.StrictMode>
);
