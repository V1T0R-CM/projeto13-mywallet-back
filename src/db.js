import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const mongoClient = new MongoClient(process.env.URL_CONNECT_MONGO);

await mongoClient.connect();

const db = mongoClient.db("Mywallwet_data");
export default db;