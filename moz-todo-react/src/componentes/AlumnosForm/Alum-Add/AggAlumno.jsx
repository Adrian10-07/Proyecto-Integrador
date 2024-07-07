import React from 'react'
import './AggAlumno.css'
import Logo2 from './AggAssets/Logo2.png'
import { FiSave } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";


export default function AggAlumno() {
  return (
    <div>
        <header className='header'>
            <img src={Logo2} alt="Left" className='header-image-left' />
             Datos del Alumno
             <img src={Logo2} alt="Left" className='header-image-rigth' />

        </header>

        <div className='Inputsagg'>
                 <div className='D-Alumno'>
            <div className='con1'>            
                <input type="text" placeholder='Primer Nombre'/>
                <input type="text" placeholder='Segundo Nombre'/>
                <input type="text" placeholder='Apellido Paterno'/>
                <input type="text" placeholder='Apellido Materno'/>
                <label >Fecha de Nacimiento <input type="date" /></label>
            </div>
            <div className='con2'>
                <input type="number" placeholder='Telefono'/>
                <input type="text" placeholder='Correo Electronico' />
                <input type="text" placeholder='CURP' />
            </div>
            <div className='con3'>
                <input type="text" placeholder='Grado al que ingresa'/>
                <input type="text" placeholder='Grupo al que ingresa' />
                <input type="" placeholder='Asignar Numero de Control'/>
                <input type="text" placeholder='Turno' />
            </div>
            <div className='con4'>
                <input type="text" placeholder='Donde estudia (o estudio el Bachillerato)' />
                <input type="text" placeholder='Universidad a la que aspira' />
                <input type="text" placeholder='Licenciaturas a la que aplicara' />
            </div>

        </div>
        <div>
            <h2>Datos del Tutor</h2>
            <div className='D-Tutor'>
            <input type="text" placeholder=' Primer Nombre' />
            <input type="text" placeholder='Segundo Nombre' />

            <input type="text" placeholder='Apellido Paterno' />
            <input type="text" placeholder='Apellidos Materno' />
            <input type="number" placeholder='Telefono' />
            </div>
        </div>
        <div>
            <h2>Datos Diagnostico</h2>
            <div className='D-Diagnostico'>
                <h4>Examen Diagnostico Ceneval "EXANII II"</h4>
                <div className='con5'>
                <input type="number" placeholder='Puntaje Pensamiento Matematico' />
                <input type="number" placeholder='Puntaje Pensamiento Analitico' />
                <input type="number" placeholder='Puntaje Estructura de la lengua' />
                <input type="number" placeholder='Puntaje Comprension Lectora' />    
                </div>

                <div className='con6'>
                <input type="number" placeholder='Resultado de Porcentaje' />
                <input type="number" placeholder='Aciertos' />
                <input type="number" placeholder='Errores' />
                <input type="number" placeholder='Resultados De Examen Final' />
                </div>

            </div>
        </div>

        <div>
            <h4>Examen De Diagnostico, Velocidad Lectora</h4>
            <div className='D-Diagnostico'>
                <div className='con7'>

                <input type="text" placeholder='Velocidad Virtual Lectora'/>
                <input type="ppm" placeholder='velocidad De Un Texto Escrito (ppm)' />
                <input type="text" placeholder='Comprension Lectora' />

                </div>

            </div>

        </div>

            <div className='botones'>

            <button className='uno'><MdOutlineCancel className='icon-cancel' /></button>
            <button className='dos'><FiSave className='icon-save'/></button>

            </div>

        </div>


      
    </div>
  )
}
