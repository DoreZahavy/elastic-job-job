import mongoDB from 'mongodb'
const { MongoClient } = mongoDB



import { config } from '../config/index.js'
import { logger } from './logger.service.js'
import { log } from 'console'

export const dbService = {
    getCollection
}

var dbConn: mongoDB.Db | null = null

async function getCollection(collectionName: string) {
    try {
        const db = await _connect()
        const collection = db.collection(collectionName) // await
        const changeStream = collection.watch();
        changeStream.on('change', next => {
            // process next document
            console.log('inside changeStream watch')
            console.log("🚀 ~ getCollection ~ next:", next)
          });
        return collection
    } catch (err) {
        logger.error('Failed to get Mongo collection', err)
        throw err
    }
}

async function _connect() {
    if (dbConn) return dbConn
    try {
        const client = await MongoClient.connect(config.dbURL || '',) // { useNewUrlParser: true, useUnifiedTopology: true }
        const db = client.db(config.dbName)
        dbConn = db
        return db
    } catch (err) {
        logger.error('Cannot Connect to DB', err)
        throw err
    }
}






