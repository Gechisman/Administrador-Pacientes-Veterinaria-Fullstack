import express from "express";
import { registrar, 
    perfil, 
    confirmar, 
    autenticar, 
    olvidePassword, 
    comprobarToken,
    nuevoPassword } from "../controllers/veterinarioController.js";
import checkAuth from "../middleware/authMiddleware.js";
const router = express.Router();

//área pública
router.post("/", registrar);
router.get("/confirmar/:token", confirmar);
router.post("/login", autenticar);

router.post("/olvide-password", olvidePassword);
//GET: Enviar al usuario un token para que pueda cambiar la contraseña
//GET: token se envía por email para validarlo
//POST: Agregar el nuevo password. Ahi mismo se valida el token con un formulario
//Es lo mismo que tener una url con dos rutas (get y post), pero se hace en una sola
router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword);

//área privada
router.get("/perfil", checkAuth, perfil);

export default router;