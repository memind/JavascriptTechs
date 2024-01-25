const mongodb = require('mongodb');
import module from 'node:module'

const mongoClient = mongodb.MongoClient; 

let db;

async function connect() {
    const client = await mongoClient.connect("")///////////////////////////////
    db = client.db('blog');
}

function getDb() {
    if (!db)
        throw { message: "No database connection!"};

    return db;
}

module.exports = {
    connectToDatabase: connect,
    db: getDb
};