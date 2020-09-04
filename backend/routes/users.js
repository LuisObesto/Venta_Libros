var express = require('express');
var router = express.Router();
const uuid = require('node-uuid');
const mailer = require('./../utils/mailer')
const userModel = require('./../models/userModel')
const sha1 = require('sha1')

router.post('/new', async(req,res)=>{
  try {
      
      let uuid_route = uuid();
      const user = {
          id : uuid(),
          nombre : req.body.nombre,
          apellido : req.body.apellido,
          usuario : req.body.usuario,
          contraseña : sha1(req.body.contraseña),
          mail : req.body.mail,
          permisos : 5
          
      }
      //si esta registrado 1, si es nuevo 0
      if(await userModel.CheckUser(user)){
        res.json({message:'Usuario o mail ya registrados', nuevo : 1})
        
      }else{

        let result = await userModel.Adduser(user)
      let html = `
          <html>
              <body>
                  <h4>Bienvenido  ${user.usuario}</h4>
                  <h4>Gracias por registrate</h4>
                
              </body>
          </html>
      `
      // <a href="${process.env.URL_SERVER}/verify/${uuid_route}">Link de activación</a>

      let mail = await mailer.sendRegisterInfo(user.mail,html);
      res.json({message : 'Usuario creado exitosamente', nuevo : 0})

      }

      
  } catch (error) {
      console.log(error);
      res.sendStatus(500);
  }
})

module.exports = router;
