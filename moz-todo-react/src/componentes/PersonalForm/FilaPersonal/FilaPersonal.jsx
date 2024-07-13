import React, { useState } from "react";

export default function FilaPersonal ({perId, perNombre, perApellidoP, perApellidoM, perArea, perCargo, perEstatus}){
    
    let idPropPersonal=perId;
    
    return (
    <tr key={perId} id="keyPersonal">
        <td>{perNombre}</td>
        <td>{perApellidoP}</td>
        <td>{perApellidoM}</td>
        <td>{perCargo}</td>
        <td>{perArea}</td>
        <td>{perEstatus}</td>
        <td>Aquí va el botón modal</td>
    </tr>
    );
}