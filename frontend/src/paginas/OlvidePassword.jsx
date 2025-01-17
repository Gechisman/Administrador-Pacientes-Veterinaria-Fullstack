import { Link } from 'react-router-dom';

function OlvidePassword() {
  return (
    <>
      <div>
            <h1 className="text-indigo-600 font-black text-6xl">Recupera tu Acceso y no pierdas {""}<span className="text-black">Tus Pacientes</span></h1>
        </div>
        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
          <form action="">              
              <div className="my-5">
                  <label className="uppercase text-gray-600 block text-xl font-bold">
                      Email
                  </label>
                  <input type="email" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl " placeholder="ejemplo@ejemplo.com"/>
              </div>

              <input type="submit" value="Enviar código" className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto "/>
          </form>

          <nav className="mt-10 lg:flex lg:justify-between">
            <Link to="/" className="block text-center my-5 text-gray-500">¿Ya tienes una cuenta? Inicia sesión</Link>
            <Link to="/registrar" className="block text-center my-5 text-gray-500">¿No tienes una cuenta? Regístrate</Link>
          </nav>
        </div>
    </>
  )
}

export default OlvidePassword