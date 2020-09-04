const express = require('express');
const router = express.Router();

const multer = require('multer') //manejo de archivos multimedia
const config = {dest : "./public/tmp"}
const upload = multer(config)

const imageHander = require('./../../utils/imageHander');
const uuid = require('node-uuid');
const librosModel = require('./../../models/librosModel');


router.post('/libro/new',upload.single('foto'), async (req,res)=>{

    try {
        //desctructuracion
    const {nombre,Autor,Paginas,Prologo,Editorial,Idioma,Fecha_Publicacion,Precio} =req.body
        const name = imageHander.saveImage(req.file); //retorna el uuid + extension
    let data = {
        id : uuid(),
        nombre, //hacen referencia a propiedad y valor (nombre : nombre)
        Autor,
        Paginas,
        Prologo,
        Editorial,
        Idioma,
        Fecha_Publicacion,
        Precio
    }
    
    if(req.file){

        data["img"]=name; //le agrego una propiedad al obj
        
        const result = await librosModel.InsertLibro(data)
        res.json({new : result})
    }else{
        console.log(error)
        res.status(500).json({status : false, message : "Faltan campos"})
    }



    } catch (error) {
        
        res.status(500).json({status : false})
    }
    
})

module.exports = router;