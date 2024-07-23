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
import Personal from './componentes/PersonalForm/Personal';
import AddEmpleado from './componentes/PersonalForm/AddEmpleado/AddEmpleado';
import AddProfesor from './componentes/PersonalForm/AddProfesor/AddProfesor';
import EditEmpleado from './componentes/PersonalForm/EditEmpleado/EditEmpleado';
import EditProfesor from './componentes/PersonalForm/EditProfesor/EditProfesor';
import AddPagoPersonal from './componentes/PagosEmpleadoForm/addPagoPersonal/AddPagoPersonal';
import AddPagoProfesor from './componentes/PagosEmpleadoForm/addPagoProfesor/AddPagoProfesor';
import PagoEmpleados from './componentes/PagosEmpleadoForm/PagoEmpleados';
import AddUser from './componentes/UsuariosForm/AddUser/AddUser';
import EditUser from './componentes/UsuariosForm/EditUser/EditUser';

import App from './App';

import { LogInfoProvider } from './LogInfo.jsx';

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
    path: "/aggUsers",
    element: <AddUser/>
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
    element: <Personal/>,
  },
  {
    path: "/addEmpleado",
    element: <AddEmpleado/>,
  },
  {
    path: "/addMaestro",
    element: <AddProfesor/>,
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
  {
    path: '/editEmpleado',
    element: <EditEmpleado/>
  },
  {
    path: '/editProfesor',
    element: <EditProfesor/>
  },
  {
    path: '/updateUsers',
    element: <EditUser/>
  },
  {
    path:'/addPer',
    element:<AddPagoPersonal/>
  },
  {
    path:'/addPro',
    element:<AddPagoProfesor/>
  },
  {
    path: '/pagosEmp',
    element: <PagoEmpleados/>
  }
])



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <LogInfoProvider>
    <RouterProvider  router = {router}/>
  </LogInfoProvider>

);
