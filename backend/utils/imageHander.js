const fs = require('fs');
const uuid = require('node-uuid');
// {
// fieldname: 'foto',
// originalname: 'knex.png',
// encoding: '7bit',
// mimetype: 'image/png',
// destination: './public/tmp',
// filename: '3c88b4d0fc2fbb3c0e39fbc8c6a7a384',
// path: 'public\\tmp\\3c88b4d0fc2fbb3c0e39fbc8c6a7a384',
// size: 19479
// }

const saveImage = (file)=>{

    const extensionAllow = ['jpeg','png','jpg'] //extensiones permitidas
    let fileNameResult =""; //uuid + extension del mime ej :as123213.jpg
    const {mimetype,filename} = file //destructuro del file que viene
    const extension = mimetype.split("/")[1];
    if(extensionAllow.includes(extension)){
        const uid = uuid();
        fileNameResult = `${uid}.${extension}`;//asdasdasd-312312-3434.jpg
        const fileNameTmp = `./public/tmp/${filename}`;
        const fileNameOut = `./public/images/${fileNameResult}`
        fs.createReadStream(fileNameTmp).pipe(fs.createWriteStream(fileNameOut)) //copia y pega el archivo 
        //el pipe almacena el resultado del 1ro y lo pasa al 2do
        fs.unlink(fileNameTmp,(error)=>console.error(error)) //borrar el archivo temporal 1er parametro, 2do parametro si hay un error
        // cuando no se incorporan las llaves dentro de un arrow function el return es implicto
    }
    return fileNameResult; //asdasdasd-312312-3434.jpg

}
// ./../../../frontend/src/assets/img
module.exports = {saveImage}