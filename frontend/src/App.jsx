import {BrowserRouter, Route, Routes} from 'react-router-dom'
// browser router es el componente que nos permite tener rutas en nuestra aplicación
// route es el componente que nos permite definir una ruta
// routes es el componente que nos permite definir varias rutas
import AuthLayout from './layout/AuthLayout'
import Login from './paginas/Login'
import Registrar from './paginas/Registrar'
import ConfirmarCuenta from './paginas/ConfirmarCuenta'
import OlvidePassword from './paginas/OlvidePassword'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout/>} >
          <Route index element={<Login/>} />
          <Route path="registrar" element={<Registrar/>} />
          <Route path="confirmar/:id" element={<ConfirmarCuenta/>} />
          <Route path="olvide-password" element={<OlvidePassword/>} />
        </Route>        

        {/* <Route path="/admin" element={<AdminLayout/>} >
          
        </Route>         */}
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
