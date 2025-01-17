import express from 'express';
import conectarDB from './config/db.js';
import dotenv from "dotenv";
import cors from 'cors' //Protege una API (solo permite peticiones de la url que yo permita)
import veterinarioRoutes from './routes/veterinarioRoutes.js';
import pacienteRoutes from './routes/pacienteRoutes.js';

const app = express();
app.use(express.json());

dotenv.config();

conectarDB();

const dominiosPermitidos = [process.env.FRONTEND_URL]

const corsOptions = {
    origin: function(origin, callback){
        if (dominiosPermitidos.indexOf(origin) !== -1) {
            //El origen del request está permitido
            callback(null, true) //No hay mensaje de error y permite el acceso
        } else {
            callback( new Error('No permitido por CORS'))
        }
    }
}

app.use(cors(corsOptions))
app.use('/api/veterinarios', veterinarioRoutes);
app.use('/api/pacientes', pacienteRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log('Servidor funcionando en el puerto');
});