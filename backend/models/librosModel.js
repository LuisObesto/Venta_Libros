const dbModel = require('../utils/db');
const db = require('../utils/db');

LibrosAll = async()=>{

    try {
        const dbo = await dbModel.pool();

        const collection = await dbo.collection(process.env.C_LIBROS)
                                    .find()
                                    .toArray()

        return collection;

    } catch (error) {
        throw error;
    }
}

LibroSingle = async(id)=>{

    try {
        const dbo = await dbModel.pool()
        const collection = await dbo.collection(process.env.C_LIBROS)
                                    .findOne(
                                         {id : id}
                                             )
        return collection

    } catch (error) {
        throw error
    }
}

InsertLibro = async(obj) =>{

    try {

        const dbo = await dbModel.pool()

        const collection = await dbo.collection(process.env.C_LIBROS)
                                    .insertOne(obj)
                                    
        return collection

    } catch (error) {
        throw error;
    }
}

module.exports = {LibrosAll, LibroSingle, InsertLibro}