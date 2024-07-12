import React, { useState, useEffect } from "react";
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
    /*
    const determinarEstatusDePago = () => {
        if (estatusTramiteT == "Pagado"){
            console.log("Tramite ya pagado");
        }
        else{
            const fecha = new Date();
            const dia = String(fecha.getDate()).padStart(2, '0');
            const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses empiezan en 0
            const anio = fecha.getFullYear();
            const fechaComparacion = `${anio}-${mes}-${dia}`;
            const diferenciaMilisegundos = fechaFormateada - fechaComparacion;
            const diferenciaDias = diferenciaMilisegundos / (1000 * 60 * 60 * 24);

            console.log(`Diferencia en días: ${diferenciaDias}`);
        }
    }

    useEffect(()=>{
        console.log(fechaFormateada);
        determinarEstatusDePago();
    }, []);
    */
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