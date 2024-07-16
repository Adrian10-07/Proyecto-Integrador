import React from "react";

export default function FilaMateria ({idProfesor, idMateria, nombreMateria, actualizar}){

    const quitarMateria = () => {
        const url = `http://localhost:3000/empleados/deltMat`

        const dataMater = {
            idProfesor : idProfesor, 
            idMateria : idMateria
        }

        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(dataMater)
        })
        .then(response => {
          if(!response.ok){
            throw new Error('Error al quitar la materia: ' + response.status);
          }
          return response.json();
        })
          //Si todo esta bien, recibe la respuesta
        .then(response => {
            console.log("Se quito la materia : ", response)
            actualizar()
        })
        .catch(error => {
            console.error('Error: ', error);
        });
    }

    return (
        <tr key={idMateria}>
            <td>{nombreMateria}</td>
            <td><button onClick={quitarMateria}>Quitar</button></td>
        </tr>
    );
}