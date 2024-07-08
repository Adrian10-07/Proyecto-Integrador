import React, { useState } from "react";
import { SiGoogleforms } from "react-icons/si";
import { MdEdit } from "react-icons/md";
import DataAlumno from "../ModalesForm/DataAlumno/DataAlumno";

export default function FilaDate (
    {idAlumno, noControlAlumno, nombreAlumno, apellidoPAlumno, 
        apellidoMAlumno, gradoAlumno, grupoAlumno, turnoAlumno, estatusAlumno}){
    
    const [show, setShow] = useState(false);

    const showModal = () => {
        setShow(true);
    }

    const hideModal = () => {
        setShow(false);
    }

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
            <td><button type="button" onClick={showModal}><SiGoogleforms/></button></td>
            <td><button><MdEdit/></button></td>
            <DataAlumno/>
        </tr>
    );
}