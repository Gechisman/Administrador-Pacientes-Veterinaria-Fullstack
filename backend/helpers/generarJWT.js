import jwt from 'jsonwebtoken';

const generarJWT = (uid) => {
    //Generar un nuevo token con el id del usuario
    return jwt.sign({uid}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
}

export default generarJWT;