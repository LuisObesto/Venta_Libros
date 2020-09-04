var express = require('express');
var router = express.Router();
const userModels = require('./../models/userModel')
const jwt = require('jsonwebtoken');
const fs = require('fs')//propia del core de node 
const sha1 = require('sha1')
router.post('/',async (req,res)=>{


    try {

        const obj = {
            usuario : req.body.usuario,
            contraseña : sha1(req.body.contraseña)
        }
         

        let result = await userModels.InfoUser(obj)
        if(result){
            let payload = {}; //defino el objecto payload encargado de transportar los datos
            //no va a continuar hasta que se lea el archivo correctamente
            //devuelve un string con la informacion del file
            const privateKey = fs.readFileSync('./claves/privada.pem','utf-8')
            let signOptions = {

                expiresIn : '2h',
                algorithm : "RS256", //Aritmetica modular
                
            }

            switch(result.permisos){
                case 10 : payload = {id : result.id,id_permiso : 10, role : 'admin'}
                break;
                case 5 : payload = {id : result.id,id_permiso : 5, role : 'user'}
                break;
            }
            //JWT -> Payload, Firma, Signoptions
            const token = jwt.sign(payload,privateKey,signOptions);
            res.json({status : true, JWT: token, User : result.usuario, mail : result.mail})

        }else{
            res.status(401).json({status : true, message : 'unauthorized', JWT : null})
        }
       
    } catch (error) {
        console.log(error)
        res.sendStatus(500).json({status : false})
    }

})

module.exports = router;