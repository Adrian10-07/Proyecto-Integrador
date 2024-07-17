import React from "react";

export default function FilaUsuarios ({data}){
    return(
        <tr>
            <td>{data.id}</td>
            <td>{data.nombre_usuario}</td>
            <td>{data.tipo}</td>
            <td>{data.nombre} {data.apellido_p} {data.apellido_m}</td>
            <td><button>Editar</button></td>
            <td><button>Borrar</button></td>
        </tr>
    );
}