import { useState } from "react";
import { Link } from 'react-router-dom';
// import axios from "axios"
import clienteAxios from "../config/axios";
import Alerta from "../components/Alerta";

function Registrar() {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repetirPassword, setRepetirPassword] = useState('');

    const [alerta, setAlerta] = useState({})

    const handleSubmit = async (e) => {
      e.preventDefault()
      
      if ([nombre, email, password, repetirPassword].includes('')) {
        setAlerta({ msg: 'Hay campos vacíos', error: true});
        return;
      }
      
      if (password !== repetirPassword) {
        setAlerta({ msg: 'Los passwords no son iguales', error: true});
        return;
      }

      if (password.length < 6) {
        setAlerta({msg: 'El password es muy corto, agrega mínimo 6 caracteres', error: true});
        return;
      }

      //Limpiar alerta
      setAlerta({})

      //Crear el usuario en la API
      try {
        //axios Por defecto es get
        await clienteAxios.post('/veterinarios', {nombre, email, password})
        setAlerta({
          msg: 'Creado correctamente, revisa tu correo', 
          error: false
        });
      } catch (error) {
        setAlerta({ 
          msg: error.response.data.msg, 
          error: true
        });
      }

    }

    const { msg } = alerta

    return (
      <>
        <div>
            <h1 className="text-indigo-600 font-black text-6xl">Crea tu Cuenta y Administra {""}<span className="text-black">Tus Pacientes</span></h1>
        </div>
        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
          {msg && <Alerta alerta={alerta}/>}
          <form onSubmit={handleSubmit}>
            <div className="my-5">
                <label className="uppercase text-gray-600 block text-xl font-bold">
                    Nombre
                </label>
                <input type="text" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl " placeholder="Tu Nombre" value={nombre} 
                onChange={e => setNombre(e.target.value)}
                />
            </div>
            <div className="my-5">
                <label className="uppercase text-gray-600 block text-xl font-bold">
                    Email
                </label>
                <input type="email" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl " placeholder="ejemplo@ejemplo.com" value={email} 
                onChange={e => setEmail(e.target.value)}/>
            </div>
            <div className="my-5">
                <label className="uppercase text-gray-600 block text-xl font-bold">
                    Contraseña
                </label>
                <input type="password" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl " placeholder="Tu Contraseña" value={password} 
                onChange={e => setPassword(e.target.value)}/>
            </div>
            <div className="my-5">
                <label className="uppercase text-gray-600 block text-xl font-bold">
                    Repetir Contraseña
                </label>
                <input type="password" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl " placeholder="Repite tu contraseña" value={repetirPassword} 
                onChange={e => setRepetirPassword(e.target.value)}/>
            </div>

            <input type="submit" value="Crear Cuenta" className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto "/>
          </form>

          <nav className="mt-10 lg:flex lg:justify-between">
                <Link to="/" className="block text-center my-5 text-gray-500">¿Ya tienes una cuenta? Inicia sesión</Link>
                <Link to="/olvide-password" className="block text-center my-5 text-gray-500">¿Olvidaste la contraseña?</Link>
            </nav>
        </div>
      </>
    )
  }
  
  export default Registrar