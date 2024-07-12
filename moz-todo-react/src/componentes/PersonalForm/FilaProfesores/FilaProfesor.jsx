import React, { useState } from "react";

export default function FilaProfesor ({proId, proNombre, proApellioP, proApellidoM, proEspecialidad, proEstatus}){
    let profIdProp = proId;

    return (
        <tr key={proId} id="keyProfesor">
            <td>{proNombre}</td>
            <td>{proApellioP}</td>
            <td>{proApellidoM}</td>
            <td>Docente</td>
            <td>{proEspecialidad}</td>
            <td>{proEstatus}</td>
            <td>Aquí va el botón modal</td>
        </tr>
    );
}