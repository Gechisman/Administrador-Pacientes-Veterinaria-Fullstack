import mongoose from "mongoose";
import dotenv from "dotenv";

const conectarDB = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URI, {
            
        });
        const url = `${db.connection.host}:${db.connection.port}`; // Obtener la URL de la DB y el puerto
        console.log(`MongoDB Conectado a: ${url}`);
    } catch (error) {
        console.log(`Error: error.message);`);
        process.exit(1); // Detener la app        
    }
};

export default conectarDB;