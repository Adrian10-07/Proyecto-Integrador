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
<<<<<<< HEAD
=======
import Personal from './componentes/PersonalForm/Personal';
import AddEmpleado from './componentes/PersonalForm/AddEmpleado/AddEmpleado';
import AddProfesor from './componentes/PersonalForm/AddProfesor/AddProfesor';
import EditEmpleado from './componentes/PersonalForm/EditEmpleado/EditEmpleado';
import EditProfesor from './componentes/PersonalForm/EditProfesor/EditProfesor';
import AddPagoPersonal from './componentes/PagosEmpleadoForm/addPagoPersonal/AddPagoPersonal';
import AddPagoProfesor from './componentes/PagosEmpleadoForm/addPagoProfesor/AddPagoProfesor';
import PagoEmpleados from './componentes/PagosEmpleadoForm/PagoEmpleados';
>>>>>>> ac38bf34f75d7a37c7ae8c4bac96f9a84c445c94

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
<<<<<<< HEAD
=======
  {
    path: '/editEmpleado',
    element: <EditEmpleado/>
  },
  {
    path: '/editProfesor',
    element: <EditProfesor/>
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
>>>>>>> ac38bf34f75d7a37c7ae8c4bac96f9a84c445c94
])



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider  router = {router}/>
  </React.StrictMode>
);
