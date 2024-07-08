import React, { useState } from "react";
import { SiGoogleforms } from "react-icons/si";
import { MdEdit } from "react-icons/md";
import DataAlumno from "../ModalesForm/DataAlumno/DataAlumno";
import ChildModal from "../../PagosEmpleadoForm/ChildModal"

export default function FilaDate (
    {idAlumno, noControlAlumno, nombreAlumno, apellidoPAlumno, 
        apellidoMAlumno, gradoAlumno, grupoAlumno, turnoAlumno, estatusAlumno}){
    
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
                valueId={idProp}
            /></td>        
        </tr>
    );
}