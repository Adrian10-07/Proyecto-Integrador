import React, { useState } from "react";
import ChildModal from "../../PagosEmpleadoForm/ChildModal"

export default function FilaDate (
    {idAlumno, noControlAlumno, nombreAlumno, apellidoPAlumno, 
        apellidoMAlumno, gradoAlumno, grupoAlumno, turnoAlumno, estatusAlumno, autenticar}){
    
    let idProp = idAlumno;

    return(
        <tr key={idAlumno} id="keyAlumno">
            <td>{noControlAlumno}</td>
            <td>{nombreAlumno}</td>
            <td>{apellidoPAlumno}</td>
            <td>{apellidoMAlumno}</td>
            <td>{gradoAlumno}</td>
            <td>{grupoAlumno}</td>
            <td>{turnoAlumno}</td>
            <td>{estatusAlumno}</td>
            <td><ChildModal
                valueId={idProp} autentificacion={autenticar}
            /></td>        
        </tr>
    );
}