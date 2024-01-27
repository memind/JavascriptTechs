const mongodb = require('mongodb');  
const mongoClient = mongodb.MongoClient; 

let db;

async function connectToDatabase() {
    const client = await mongoClient.connect("");  //////////////////////
    db = client.db('online-shop-db');
}

function getDb() {
    if (!db)
        throw { message: "No database connection!"};

    return db;
}

module.exports = {
    connectToDatabase: connectToDatabase,
    getDb: getDb
};