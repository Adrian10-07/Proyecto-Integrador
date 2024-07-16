import React, {useState} from 'react';
import './DataAlumno.css';

export default function DataAlumno ({idAlumno, show, handleClose, children}){
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return(
        <div className={showHideClassName}>
            <section className='modal-main'>
                {children}
                <button type='button' onClick={handleClose}>Cerrar</button>
            </section>
        </div>
    );
}