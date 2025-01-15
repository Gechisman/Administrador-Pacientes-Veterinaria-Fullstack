import e from 'express';
import Veterinario from '../models/Veterinario.js';
import generarJWT from '../helpers/generarJWT.js';
import generarId from '../helpers/generarId.js';

//POST
const registrar = async (req, res) => {
    const {email, password, nombre} = req.body;

    //Validar que no exista un usuario con el mismo email
    //findOne busca un usuario con el email que se le pasa
    const existeVeterinario = await Veterinario.findOne({
        email
    });

    if(existeVeterinario){
        const error = new Error('El email ya está registrado');
        return res.status(400).json({msg: error.message});
    }

    try {
        //Guardar usuario
        const veterinario = new Veterinario(req.body);
        const veterinarioGuardado = await veterinario.save();
        res.json(veterinarioGuardado);
    } catch (error) {
        console.log(error);
    }
}

//GET
const perfil =  (req, res) => {
    const {veterinario} = req;
    res.json({veterinario});
}

//GET
const confirmar = async (req, res) => {
    //Extraer token de la url (routing dinamico)
    //Tienes que llamarlo igual que en la ruta (en este caso token)
    const {token} = req.params;
    console.log(token);

    const usuarioConfirmar = await Veterinario.findOne
    ({
        token
    });

    if(!usuarioConfirmar){
        const error = new Error('El usuario no existe');
        return res.status(400).json({msg: error.message});
    }

    try {
        usuarioConfirmar.confirmado = true;
        usuarioConfirmar.token = null;
        await usuarioConfirmar.save();

        res.json({msg: "Usuario confirmado correctamente"});        
    } catch (error) {
        console.log(error);        
    }
}

//POST
const autenticar = async (req, res) => {
    const {email, password} = req.body;

    //Comprobar si el usuario existe
    const usuario = await Veterinario.findOne({
        email
    });

    if (!usuario) {
        const error = new Error('El usuario no existe');
        return res.status(403).json({msg: error.message});
    }

    //Comprobar si el usuario está confirmado
    if (!usuario.confirmado) {
        const error = new Error('Tu cuenta no ha sido confirmada');
        return res.status(403).json({msg: error.message});
    }

    //Comprobar la contraseña
    const passwordValido = await usuario.comprobarPassword(password);
    if (!passwordValido) {
        const error = new Error('Contraseña incorrecta');
        return res.status(403).json({msg: error.message});
    } else {
        res.json({token: generarJWT(usuario.id)});
    }
}

//POST
const olvidePassword = async (req, res) => {
    const {email} = req.body;

    //Comprobar si el usuario existe
    const existeVeterinario = await Veterinario.findOne({
        email
    });

    //Si el usuario no existe
    if (!existeVeterinario) {
        const error = new Error('El usuario no existe');
        return res.status(403).json({msg: error.message});
    }

    try {
        //Generar token
        existeVeterinario.token = generarId();
        await existeVeterinario.save();
        //Enviar email con el token
        res.json({msg: "Se ha enviado un email con las instrucciones para cambiar la contraseña"});
    } catch (error) {
        console.log(error);        
    }
}

//GET
const comprobarToken = async (req, res) => {
    const {token} = req.params;

    const tokenValido = await Veterinario.findOne({
        token
    });

    if (!tokenValido) {
        const error = new Error('Token inválido');
        return res.status(403).json({msg: error.message});
    }

    res.json({msg: "Token válido"});
}

//POST
const nuevoPassword = async (req, res) => {
    const {token} = req.params;
    const {password} = req.body;

    const veterinario = await Veterinario.findOne({
        token
    });

    if (!veterinario) {
        const error = new Error('Token inválido');
        return res.status(403).json({msg: error.message});        
    }

    try {
        console.log(veterinario);
        veterinario.password = password;
        veterinario.token = null;
        await veterinario.save();
        res.json({msg: "Contraseña cambiada correctamente"});
    } catch (error) {
        console.log(error);                
    }
}

export {
    registrar,
    perfil,
    confirmar,
    autenticar,
    olvidePassword,
    comprobarToken,
    nuevoPassword,

}