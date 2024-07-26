import React, { useState, useEffect, useContext } from 'react';
import { FiSave } from 'react-icons/fi';
import { MdOutlineCancel } from 'react-icons/md';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { IoSearchSharp } from 'react-icons/io5';
import { LogInfoContext } from '../../../LogInfo';
import './AddUser.css'
import HeaderPaginas from '../../HeaderForm/HeaderPaginas/HeaderPaginas';

export default function AddUser (){
    const [namePersonal, setNamePersonal] = useState([]);
    const [coincidencias, setCoincidencias] = useState([]);
    const { isLoggedIn, setIsLoggedIn } = useContext(LogInfoContext);
    const navigate = useNavigate();

    const optionPersonal = () => {
        const token = localStorage.getItem('token');
        const url = "http://localhost:3000/PagoEmp/buscarPers";

        let dato = {
            nombre_busqueda:"",
            apellido_p_busqueda:"",
            apellido_m_busqueda:""
        }

        let buscarPorNombre = document.getElementById("inputPersonalName").value;
        if(buscarPorNombre)
            dato.nombre_busqueda = buscarPorNombre;
        let buscarPorApellidoP = document.getElementById('inputPersonalApellidop').value;
        if (buscarPorApellidoP) 
            dato.apellido_p_busqueda = buscarPorApellidoP;
        let buscarPorApellidoM = document.getElementById('inputPersonalApellidom').value;
        if (buscarPorApellidoM)
            dato.apellido_m_busqueda = buscarPorApellidoM;

        fetch(url, {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body:JSON.stringify(dato)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('No conecta');
            }
            return response.json();
        })
        .then(data => {
            setNamePersonal(data);
        })
        .catch(error => {
            console.error('Error fetching data: ', error);
        });
    }

    const comprobarSiElUsuarioYaExiste = async (idEmploye, userNameComp) => {
        const url = `http://localhost:3000/usersJWT/compUser`
        const token = localStorage.getItem('token');

        let comprobarUser = {
            idPersonalAOcupar : idEmploye, 
            idNombreAComprobar : userNameComp
        }

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(comprobarUser)
            });
    
            if (!response.ok) {
                throw new Error('Error al buscar coincidencias: ' + response.status);
            }
    
            const data = await response.json();
            setCoincidencias(data);
    
            if (data.length > 0) {
                console.log("Hay coincidencias: " + data);
                return true;
            } else {
                console.log("No hay coincidencias");
                return false;
            }
        } catch (error) {
            console.log("Error: " + error);
            return false;
        }
    }

    const registrarUsuario = async () => {
        const url = `http://localhost:3000/usersJWT/add`;
        const token = localStorage.getItem('token');

        let userNombre = document.getElementById("inputUserName").value;
        let tipoUsuario = document.getElementById("selectTipo").value;
        let personalAsignado = document.getElementById("inputIdPersonal").value;
        let password = document.getElementById("inputPassword").value;
        let confirmPassword = document.getElementById("inputCPassword").value;

        if(!userNombre || tipoUsuario == 0 || personalAsignado == "not valid" || !password || !confirmPassword){
            Swal.fire({
                title: "Error",
                text: "Hay campos sin llenar",
                icon: "error",
                timer: 1000
            });
            return false;
        } else if (await comprobarSiElUsuarioYaExiste(personalAsignado, userNombre)){
            Swal.fire({
                title: "Error",
                text: "Al parecer ya hay un usuario con ese nombre, o el personal ya cuenta con un usuario",
                icon: "error",
                timer: 1000
            });
            return false;
        } else if (password.length < 8){
            Swal.fire({
                title: "Error",
                text: "Contraseña muy corta, ingrese al menos 8 caracteres",
                icon: "error",
                timer: 1000
            });
            return false;
        } else if (password !== confirmPassword){
            Swal.fire({
                title: "Error",
                text: "Asegurese de ingresar la misma contraseña en ambos campos para contraseña",
                icon: "error",
                timer: 1000
            });
            return false;
        } else {

            if(tipoUsuario == "admin"){
                const tipoUsuario = localStorage.getItem('typeUser');
                if(tipoUsuario != "master"){
                    Swal.fire({
                        title: "No autorizado",
                        text: "Usted no tiene permiso para crear otro usuario administrador",
                        icon: "error",
                        timer: 2000                    
                    });
                    return false
                }
            }

            let user = {
                nombre: userNombre, 
                password: password, 
                tipo: tipoUsuario, 
                idpersonal: personalAsignado
            }

            fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(user)
            })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(errorData => {
                        throw new Error(errorData.error);
                    });
                }
                return response.json();
            })
            .then(data => {
                console.log("Usuario registrado: ", data);
                setTimeout(() => {
                    navigate('/usuarios');
                }, 1000);
                Swal.fire({
                    title: "Éxito",
                    text: "Usuario registrado correctamente",
                    icon: "success",
                    timer: 1000
                });
                return true;
            })
            .catch(error => {
                console.error('Error: ', error);
                let errorMessage = "Error desconocido";
                if (error.message.includes("NetworkError")) {
                    errorMessage = "Error de red, por favor revisa tu conexión";
                } else if (error.message.includes("404")) {
                    errorMessage = "Endpoint no encontrado";
                } else if (error.message.includes("500")) {
                    errorMessage = "Error interno del servidor";
                } else if (error.message.includes("datos duplicados")) {
                    errorMessage = "Datos duplicados, por favor revisa la información ingresada";
                }
                Swal.fire({
                    title: "Error",
                    text: errorMessage,
                    icon: "error",
                    timer: 1000
                });
                authentificateUser();
                return false;
            });
        }
    }

    const handleSaveClick = () => {
        Swal.fire({
            title: "¿Desea guardar los cambios?",
            showCancelButton: true,
            confirmButtonText: "Guardar",
        }).then((result) => {
            if (result.isConfirmed) {
                registrarUsuario();
            }
        });
    };

    const handleCancelClick = () => {
        Swal.fire({
            title: "Cancelar Registro ¿?",
            text: "Se borraran los datos ingresados",
            icon: "warning",
            showCancelButton: true,
            cancelButtonColor: "#3085d6",
            confirmButtonColor: "#d33",
            confirmButtonText: "Si, Cancelar Registro",
            cancelButtonText: "Volver al Registro",
          }).then((result) => {
            if (result.isConfirmed) {
              setTimeout(() => {
                  navigate('/usuarios');
              }, 1000);
            }
          })
    };

    const authentificateUser = async () => {
        const token = localStorage.getItem('token');
        if (!token || !isLoggedIn) {          
          Swal.fire({
            title: "Error",
            text: "Usted no ha iniciado sesión",
            icon: "error",
          });
          navigate('/')
          return false;
        } else {
          const idUsuario = localStorage.getItem('idUser');
          const url = `http://localhost:3000/usersJWT/verify/${idUsuario}`;
          
          try{
            const response = await fetch(url, {
              headers: { Authorization: `Bearer ${token}` }
            })
    
            if (!response.ok) {
              const errorMessage = await respuesta.text(); 
              Swal.fire({
                title: 'Error',
                text: 'Error inesperado. Inténtalo de nuevo más tarde.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
              });
              localStorage.removeItem('token');
              localStorage.removeItem('idUser');
              localStorage.removeItem('typeUser')
              navigate('/');
              return;
            }
            else {
              console.log("Token vigente");
            }
          }catch(error){
            Swal.fire({
              title: 'Error',
              text: 'Token expirado, vuelva a iniciar sesion',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
            console.log("Token expirado")
            localStorage.removeItem('token');
            localStorage.removeItem('idUser');
            localStorage.removeItem('typeUser')
            navigate('/')
            return;
          }
        }
        const tipoUsuario = localStorage.getItem('typeUser');
        if(tipoUsuario == "employe"){
            Swal.fire({
                title: 'Error',
                text: 'Ups, usted no tiene permitido estar aquí',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            })
            setTimeout(() => {
                navigate('/inicio');
            }, 1000);
        }
    }
    
      //Al cargar la page, ejecuta la funcion
    useEffect(()=>{
        authentificateUser();
    }, []);


    useEffect(() => {
        optionPersonal();
    }, []);

    return(
        <div >
            <header className='header'>
                Registro de Usuario
            </header>

            <div className='Inputadd'>
    <p>Crear</p>
    <div className='pagoPersonal'>
        <div className='box_personal'>
            <input type="text" placeholder='Nombre del usuario' id='inputUserName' maxLength={35}/>
            <select id="selectTipo">
                <option value={0}>Seleccionar tipo de usuario</option>
                <option value={"employe"}>Personal</option>
                <option value={"admin"}>Administrador</option>
            </select>
        </div>

        <div className='searchPersonal'>
            <input type='text' placeholder='Nombre' id='inputPersonalName' maxLength={45}/>
            <input type="text" placeholder='Apellido Paterno' id='inputPersonalApellidop' maxLength={45}/>
            <input type="text" placeholder='Apellido Materno' id='inputPersonalApellidom' maxLength={45}/>
            <button className='Buscar' onClick={optionPersonal}><IoSearchSharp />Buscar</button>
        </div>

        <div className='searchPersonal'>
            <select name='nombre' id="inputIdPersonal">
                <option value={"not valid"}>Personal</option>
                {namePersonal.map(elemento => (
                    <option key={elemento.id} value={elemento.id}>{elemento.nombre} {elemento.apellido_p} {elemento.apellido_m}</option>
                ))}
            </select>
        </div>

        <div className='Passwordd'>
            <input type='password' placeholder='Contraseña' id='inputPassword' maxLength={20}/>
            <input type='password' placeholder='Confirmar' id="inputCPassword" maxLength={20}/>
        </div>
    </div>
</div>
            <div className='botones'>
                <button onClick={handleCancelClick} className='uno'><MdOutlineCancel className='icon-cancel' /></button>
                <button onClick={handleSaveClick} className='dos'><FiSave className='icon-save' /></button>
            </div>
        </div>
    );
}