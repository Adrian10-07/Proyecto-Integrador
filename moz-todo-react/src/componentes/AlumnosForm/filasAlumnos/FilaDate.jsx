import React from "react";

export default function FilaDate (
    {idAlumno, noControlAlumno, nombreAlumno, apellidoPAlumno, 
        apellidoMAlumno, gradoAlumno, grupoAlumno, turnoAlumno, estatusAlumno}){
    return(
        <tr key={idAlumno}>
            <td>{noControlAlumno}</td>
            <td>{nombreAlumno}</td>
            <td>{apellidoPAlumno}</td>
            <td>{apellidoMAlumno}</td>
            <td>{gradoAlumno}</td>
            <td>{grupoAlumno}</td>
            <td>{turnoAlumno}</td>
            <td>{estatusAlumno}</td>
        </tr>
    );
}