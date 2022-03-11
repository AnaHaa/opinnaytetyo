import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

/**
 * Callback funktio, joka annetaan Higher-order funktiolle parametrina
 * Luo yhteyden tietokantaan ja palauttaa callback funktion tuloksen
 */
export async function queryDatabase(): Promise<mongoDB.Collection> {
    dotenv.config();

    const collectionName = process.env.COLLECTION_NAME ? process.env.COLLECTION_NAME : '';
    const connectionString = process.env.DB_CONN_STRING ? process.env.DB_CONN_STRING : '';
    const databaseName = process.env.DB_NAME ? process.env.DB_NAME : '';

    const client: mongoDB.MongoClient = new mongoDB.MongoClient(connectionString);

    await client.connect();
    const db: mongoDB.Db = client.db(databaseName);

    return db.collection(collectionName);
}
