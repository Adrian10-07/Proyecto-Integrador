import React, { useState } from "react";
import { SiGoogleforms } from "react-icons/si";
import { MdEdit } from "react-icons/md";
import DataTramite from "../ModalesForm/DataTramite/DataTramite";

export default function FilaDate (
    {id, folio, concepto, monto, 
        fechaDeCorte, estatusTramite, id_alumno}){
    
    const [show, setShow] = useState(false);

    const showModal = () => {
        setShow(true);
    }

    const hideModal = () => {
        setShow(false);
    }

    return(
        <tr key={id}>
            <td>{folio}</td>
            <td>{concepto}</td>
            <td>{monto}</td>
            <td>{fechaDeCorte}</td>
            <td>{estatusTramite}</td>
            <td>{id_alumno}</td>
            <td><button type="button" onClick={showModal}><SiGoogleforms/></button></td>
            <td><button><MdEdit/></button></td>
            <DataTramite/>
        </tr>
    );
}