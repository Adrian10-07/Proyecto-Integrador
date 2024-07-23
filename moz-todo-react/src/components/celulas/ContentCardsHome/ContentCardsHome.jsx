import React from "react";
import CardsOptions from "../../../componentes/InicioForm/CardsInicio/CardsOptions";
import './ContentCardsHome.css'

export default function ContentCardshome () {

    const tipoUsuario = localStorage.getItem('typeUser');
    if(tipoUsuario == "employe"){
        return(
            <div className='content-cards'>
                <CardsOptions
                    icono={faUserGraduate} action={"Alumnos"} widhtFont={90} enlace={'/alumnos'}
                />
                <CardsOptions
                    icono={faChalkboardUser} action={"Empleados/ Profesores"} widhtFont={90} enlace={'/empleados'}
                />
                <CardsOptions
                    icono={faMoneyBill} action={"Informes de pago de trámites"} widhtFont={90} enlace={'/tramites'}
                />
            </div>
        );
    }

    return(
        <div className='content-cards'>
            <CardsOptions
                icono={faCircleUser} action={"Usuarios"} widhtFont={100} enlace={'/usuarios'}
            />
        
            <CardsOptions
                icono={faUserGraduate} action={"Alumnos"} widhtFont={90} enlace={'/alumnos'}
            />
            <CardsOptions
                icono={faChalkboardUser} action={"Empleados/ Profesores"} widhtFont={90} enlace={'/empleados'}
            />
            <CardsOptions
                icono={faMoneyBill} action={"Informes de pago de trámites"} widhtFont={90} enlace={'/tramites'}
            />
            <CardsOptions
                icono={faMoneyBill} action={"Informes de pago del personal"} widhtFont={90} enlace={'/pagosEmp'}
            />
        </div>

    );
}