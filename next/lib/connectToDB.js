import { MongoClient } from 'mongodb';

const MONGODB_URI = "mongodb://mongo:27017/";
const MONGODB_DB = "DBnext";

let cachedClient = null
let cachedDb = null

if (!MONGODB_URI) {
    throw new Error(
      'Please define the MONGODB_URI variable'
    )
  }
  
  if (!MONGODB_DB) {
    throw new Error(
      'Please define the MONGODB_DB variable'
    )
  }

export default async function connectToDB() {
    if (cachedClient && cachedDb) {
      return { client: cachedClient, db: cachedDb }
    }
  
    const client = await MongoClient.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  
    const db = await client.db(MONGODB_DB)
  
    cachedClient = client
    cachedDb = db
  
    return { client, db }
}