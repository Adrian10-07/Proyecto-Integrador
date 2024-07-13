import React, { useState, useEffect } from "react";
import { SiGoogleforms } from "react-icons/si";
import { MdEdit } from "react-icons/md";
import DataTramite from "../ModalesForm/DataTramite/DataTramite";

export default function FilaTram (
    {idT, folioT, nombreAlm, apellidoP, apellidoM, gradoAlm, grupoAlm, conceptoT, montoT, 
        fechaDeCorteT, estatusTramiteT, }){
    
    //Hace maromas para pasar la fecha tipo SQL a una fecha de JS
    const fechaISO = fechaDeCorteT;
    const fecha = new Date(fechaISO);
            
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1;
    const anio = fecha.getFullYear();
            
    const fechaFormateada = `${dia}-${mes}-${anio}`;
    const fechaAComparar = `${anio}-${String(mes).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
    
    
    const determinarEstatusDePago = () => {
        if (estatusTramiteT == "Pagado"){
            //Si el estatus de pago ya esta pagado, no hace nada
            console.log("Tramite ya pagado");
        }
        else{
            //Si se cuentra pendiende, hace la operacion
            //Extrae la fecha actual
            const fechaActual = new Date();
            const diaActual = String(fechaActual.getDate()).padStart(2, '0');
            const mesActual = String(fechaActual.getMonth() + 1).padStart(2, '0');
            const anioActual = fechaActual.getFullYear();
            const fechaComparacion = `${anioActual}-${mesActual}-${diaActual}`;
        
            console.log("Hoy es " + fechaComparacion);

            //Crea dis instancias de tipo Date para comparar las fechas
            const fechaActualObj = new Date(fechaComparacion);
            const fechaACompararObj = new Date(fechaAComparar);

            //Compara ambas fechas, obtiene milisegundos, y los pasa a dias de diferencia
            const diferenciaMilisegundos = fechaACompararObj - fechaActualObj;
            const diferenciaDias = diferenciaMilisegundos / (1000 * 60 * 60 * 24);

            console.log(`Diferencia en días: ${diferenciaDias}`);
            if(diferenciaDias < 10 && estatusTramiteT != "Por pagar"){
                //Si faltan 10 dias para que se venza el pago, lo marcara como proximo
                    actualizarAProximoAPagar();
            }
            if(diferenciaDias <= 0 && estatusTramiteT != "Atrasado"){
                //Si faltan 0 dias o ya paso la fecha limite, lo marca como atrasado
                    actualizarAAtrasado();
            }
        }
    }

    useEffect(()=>{
        determinarEstatusDePago();
    }, []);

    const actualizarAProximoAPagar = () => {
        const url = `http://localhost:3000/tramites/changeNext/${idT}`;

        fetch(url, {
            method: "PUT"
        })
        .then(response => {
            if(!response.ok){
                throw new Error('Error al "Pagar cambiar estado de tramite a proximo": ' + response.status);
              }
              return response.json();
        })
        .then(response => {
            console.log("Cambiando estado de tramite a proximo");
        })
        .catch(error => {
            console.log("Error : ", error);
        })
    }

    const actualizarAAtrasado = () => {
        const url = `http://localhost:3000/tramites/changeArrears/${idT}`;

        fetch(url, {
            method: "PUT"
        })
        .then(response => {
            if(!response.ok){
                throw new Error('Error al "Pagar cambiar estado de tramite a atrasado": ' + response.status);
              }
              return response.json();
        })
        .then(response => {
            console.log("Cambiando estado de tramite a atrasado");
        })
        .catch(error => {
            console.log("Error : ", error);
        })
    }
    
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