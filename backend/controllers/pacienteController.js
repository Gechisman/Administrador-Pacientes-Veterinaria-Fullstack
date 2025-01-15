import Paciente from '../models/paciente.js';

const agregarPaciente = async (req, res) => {
    //req.veterinario existe porque en el middleware checkAuth se agrega el veterinario a la request
    const paciente = new Paciente(req.body);
    //Asignar el veterinario que registra el paciente por el id
    paciente.veterinario = req.veterinario._id;
    try {
        //Identificar que veterinario que registra a un paciente
        const pacienteAlmacenado = await paciente.save();
        res.status(201).json(pacienteAlmacenado);
    } catch (error) {
        console.log(error);
    }
}

const obtenerPacientes = async (req, res) => {
    //Busca los pacientes que tiene ese veterinario
    const pacientes = await Paciente.find().where('veterinario').equals(req.veterinario._id);
    res.json(pacientes);
}

const obtenerPaciente = async (req, res) => {
    //Buscar un paciente por su id (esto después de haber obtenido los pacientes del veternario)
    const id = req.params.id;
    const paciente = await Paciente.findById(id);

    //Si el veterinario que está logueado, no es el que registro al paciente, no se muestra
    if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
        return res.status(401).json({ mensaje: 'No autorizado' });        
    }

    res.json(paciente);
}

const actualizarPaciente = async (req, res) => {
    const id = req.params.id;
    const paciente = await Paciente.findById(id);

    if(!paciente){
        return res.status(404).json({mensaje: 'Paciente no encontrado'});
    }

    if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
        return res.status(401).json({ mensaje: 'No autorizado' });
    }

    //Actualizar paciente
    paciente.nombre = req.body.nombre || paciente.nombre;
    paciente.propietario = req.body.propietario || paciente.propietario;
    paciente.email = req.body.email || paciente.email;
    paciente.fecha = req.body.fecha || paciente.fecha;
    paciente.sintomas = req.body.sintomas || paciente.sintomas

    try {
        const pacienteActualizado = await paciente.save();
        res.json(pacienteActualizado);
    } catch (error) {
        console.log(error);
    }
}

const eliminarPaciente = async (req, res) => {
    const id = req.params.id;
    const paciente = await Paciente.findById(id);

    if(!paciente){
        return res.status(404).json({mensaje: 'Paciente no encontrado'});
    }

    if (paciente.veterinario._id !== req.veterinario._id) {
        return res.status(401).json({ mensaje: 'No autorizado' });
    }

    try {
        await paciente.deleteOne();
        res.json({ mensaje: 'Paciente eliminado' });
    } catch (error) {
        console.log(error);        
    }
}

export {
    agregarPaciente,
    obtenerPacientes,
    obtenerPaciente,
    actualizarPaciente,
    eliminarPaciente
}