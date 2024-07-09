import React, { useState } from "react";
import { SiGoogleforms } from "react-icons/si";
import { MdEdit } from "react-icons/md";
import DataTramite from "../ModalesForm/DataTramite/DataTramite";

export default function FilaTram (
    {idT, folioT, nombreAlm, apellidoP, apellidoM, gradoAlm, grupoAlm, conceptoT, montoT, 
        fechaDeCorteT, estatusTramiteT, }){
    
    const fechaISO = fechaDeCorteT;
    const fecha = new Date(fechaISO);
            
            // Obtener la fecha en formato deseado
    const dia = fecha.getDate(); // día del mes (1-31)
    const mes = fecha.getMonth() + 1; // mes (0-11, sumamos 1 para obtener el mes real)
    const anio = fecha.getFullYear(); // año
            
            // Puedes formatear la fecha como prefieras, por ejemplo:
    const fechaFormateada = `${dia}-${mes}-${anio}`;

    const actualizarAPagado = () => {
        const url = `http://localhost:3000/tramites/changePaid/${idT}`

        fetch(url, {
            method: "PUT"
        })
        .then(response => {
            if(!response.ok){
              throw new Error('Error al "Pagar tramite": ' + response.status);
            }
            return response.json();
        })
        .then(response => {
           console.log("Tramite pagado") 
        })
        .catch(error => {
            console.log("Error : ", error)
        });
    }

    return(
        <tr key={idT}>
            <td>{folioT}</td>
            <td>{nombreAlm} {apellidoP} {apellidoM}</td>
            <td>{gradoAlm}</td>
            <td>{grupoAlm}</td>
            <td>{conceptoT}</td>
            <td>{montoT}</td>
            <td>{fechaFormateada}</td>
            <td>{estatusTramiteT}</td>
            <td><button onClick={actualizarAPagado}>Pagar</button></td>
        </tr>
    );
}