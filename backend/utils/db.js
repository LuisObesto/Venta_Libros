const MongoClient = require('mongodb').MongoClient;

async function pool(){

    const url = process.env.URL_DB;
    const dbName = process.env.DB_NAME;
    
    let client;

    try {

        client = await MongoClient.connect(url)
        const db = client.db(dbName);
        return db;
        
    } catch (error) {
        throw error;
    }
}

module.exports = {pool}