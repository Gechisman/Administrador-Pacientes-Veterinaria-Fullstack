import mongoose from "mongoose";
import veterinario from "./Veterinario.js";

const pacienteSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    propietario: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    fecha: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    sintomas: {
        type: String,
        required: true
    },
    veterinario:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Veterinario'
    },
}, {
    timestamps: true
});

const pacientes = mongoose.model('Paciente', pacienteSchema);
export default pacientes;