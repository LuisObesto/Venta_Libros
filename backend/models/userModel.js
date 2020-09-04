const dbModel = require('../utils/db')

InfoUser = async(obj)=>{

    try {
        
        let filter = {id : 1,nombre : 0,apellido : 0, usuario : 1, mail : 1,permisos :1,_id : 0}
        const dbo = await dbModel.pool();
        const collection = await dbo.collection(process.env.C_USUARIOS)
                                    .findOne(
                                        {usuario : obj.usuario, contraseña : obj.contraseña}
                                        
                                    )
        return collection;

    } catch (error) {
        throw error;
    }
    
}

Adduser = async(obj)=>{

    try {

        const dbo = await dbModel.pool()

        const collection = await dbo.collection(process.env.C_USUARIOS)
                                    .insertOne(
                                        obj
                                    )
        return collection;
        
    } catch (error) {
        throw error
    }
}

CheckUser = async(obj) =>{

    try {
        const dbo = await dbModel.pool()
        const collection = await dbo.collection(process.env.C_USUARIOS)
                                    .findOne(
                                       {
                                           $or : [{ usuario : obj.usuario},{mail : obj.mail}]
                                       }

                                    )
        return collection
        
    } catch (error) {
        throw error
    }
}


module.exports = {InfoUser,Adduser,CheckUser}