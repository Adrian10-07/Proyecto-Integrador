import React, {useState} from 'react';
import './DataTramite.css';

export default function DataTramite ({id, show, handleClose, children}){
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