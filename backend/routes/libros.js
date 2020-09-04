var express = require('express');
var router = express.Router();
const librosModel = require('./../models/librosModel')

router.get('/all', async(req,res)=>{

    try {

        let result = await librosModel.LibrosAll();
        res.json({libros : result})
        
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
})

router.get('/single/:id',async(req,res)=>{

    try {

        let result = await librosModel.LibroSingle(req.params.id)
        res.json({libro : result})
        
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
})

module.exports = router;