import React from 'react'
import './AggAlumno.css'
import LOGO from './AggAssets/LOGO.jpg'
export default function AggAlumno() {
  return (
    <div>
        <header className='header'>
            <img src={LOGO} alt="Left" className='header-image-left' />
             Datos del Alumno
             <img src={LOGO} alt="Left" className='header-image-rigth' />

        </header>

        <div className='D-Alumno'>
            <input type="text" placeholder='Nombre'/>
            <input type="text" placeholder='Apellidos'/>
            <label >Fecha de Nacimiento <input type="date" /></label>

            <input type="number" placeholder='Telefono'/>
            <input type="text" placeholder='Correo Electronico' />
            <input type="text" placeholder='CURP' />

            <input type="text" placeholder='Grado al que ingresa'/>
            <input type="text" placeholder='Grupo al que ingresa' />
            <input type="text" placeholder='Turno' />
        </div>
        <div>
            <h2>Datos del Tutor</h2>
            <div className='D-Tutor'>
            <input type="text" placeholder='Nombre' />
            <input type="text" placeholder='Apellidos' />
            <input type="number" placeholder='Telefono' />
            </div>
        </div>
        <div>
            <h2>Datos Diagnostico</h2>
            <div className='D-Diagnostico'>
                <h4>Examen Diagnostico Ceneval "EXANII II"</h4>
                <input type="number" placeholder='Puntaje Pensamiento Matematico' />
                <input type="number" placeholder='Puntaje Pensamiento Analitico' />
                <input type="number" placeholder='Puntaje Estructura de la lengua' />
                <input type="number" placeholder='Puntaje Comprension Lectora' />
                <input type="number" placeholder='Resultado de Porcentaje' />
                <input type="number" placeholder='Aciertos' />
                <input type="number" placeholder='Errores' />
                <input type="number" placeholder='Resultados De Examen Final' />

            </div>
        </div>

        <div>
            <h4>Examen De Diagnostico, Velocidad Lectora</h4>
            <div className='D-Diagnostico'>
                <input type="text" placeholder='Velocidad Virtual Lectora'/>
                <input type="ppm" placeholder='velocidad De Un Texto Escrito (ppm)' />
                <input type="text" placeholder='Comprension Lectora' />
            </div>
        </div>
      
    </div>
  )
}
