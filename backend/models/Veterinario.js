import mongoose from "mongoose";
import bcrypt from "bcrypt";
import generarId from "../helpers/generarId.js";

const veterinarioSchema = new mongoose.Schema({
    nombre: { 
        type: String, 
        required: true,
        trim: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true,
        trim: true ,
        unique: true 
    },
    telefono: { 
        type: String, 
        default: null,
        trim: true
    },
    web: { 
        type: String, 
        default: null
    },
    token: {
        type: String,
        default: generarId()
    },
    confirmado:{
        type: Boolean,
        default: false
    }
});

//Método para hashear la contraseña
//pre es un método de mongoose que se ejecuta antes de guardar el documento
veterinarioSchema.pre('save', async function(next){
    //this hace referencia al objeto que se está guardando
    const veterinario = this;

    //No hashear la contraseña si no se ha modificado
    if(!veterinario.isModified('password')){
        return next();
    }

    //salt es un valor aleatorio que se añade a la contraseña para hacerla más segura
    //hash es la contraseña hasheada
    //next es para indicar que ya se ha terminado de ejecutar el middleware
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(veterinario.password, salt);
    veterinario.password = hash;
    next();
});

//Método para comparar la contraseña
//this hace referencia al objeto que se está guardando
//compare compara la contraseña que se le pasa con la contraseña hasheada
veterinarioSchema.methods.comprobarPassword = async function(passwordFormulario){
    return await bcrypt.compare(passwordFormulario, this.password);
}

//Lo registra como modelo y lo exporta con la forma que van a tener los datos (veterinarioSchema)
const veterinario = mongoose.model('Veterinario', veterinarioSchema);
export default veterinario;