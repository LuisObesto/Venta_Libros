const nodemailer = require('nodemailer');


const transport = { //Objeto te permite elegir el servicio de mail, mail y contraseña para enviar el mail
    service : 'gmail',
    auth : {
        user : process.env.USER_CORREO,
        pass : process.env.PASSWORD_CORREO
    },
    tls : {
        rejectUnauthorized : false //Esto es para que google no te rompa las bolas
    }
}

const transporter = nodemailer.createTransport(transport); //Referencia a la conexion

mailGeneric = async (mail,msg,subject)=>{ //Funcion para crear el email que vas a mandar, con usuario al que le vas a mandar, asunto y cuerpo html
    try {
        const body = {to : mail, subject : subject, html : msg}
        const info = await transporter.sendMail(body);
        return info;
    } catch (error) {
        throw error;
    }
}

sendRegisterInfo = async (mail,html) =>{ //Funcion para mandar mail
    try {
        const subject = "Gracias por registrarte";
        let msgId = await mailGeneric(mail,html,subject);
    } catch (error) {
        throw error;
    }
}


module.exports = {
    sendRegisterInfo
}