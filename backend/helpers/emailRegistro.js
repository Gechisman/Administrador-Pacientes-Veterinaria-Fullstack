import nodemailer from 'nodemailer'

const emailRegistro = async (datos) => {
    // Looking to send emails in production? Check out our Email API/SMTP product!
    var transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    //Enviar el email
    const { email, nombre, token} = datos
    const info = await transport.sendMail({
        from: "APV - Administrador de Pacientes de Veterinaria",
        to: email,
        subject: 'Verifica tu cuenta en APV',
        text: 'Verifica tu cuenta en APV',
        html: `<p>Hola ${nombre}, verifica tu cuenta en APV.</p>
                <p>Un último paso para acceder a APV, verifica tu cuenta en el siguiente enlace:
                <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar cuenta</a></p>
                <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
        `
    });

    console.log("Mensaje enviado: %s", info.messageId);
}

export default emailRegistro;