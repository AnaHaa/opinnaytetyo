import * as mongoDB from "mongodb";

/**
 * Callback funktio, joka annetaan Higher-order funktiolle parametrina
 * Luo yhteyden tietokantaan parametrien avulla ja palauttaa yhteyden
 */
export async function queryDatabase(COLLECTION_NAME: string, DB_CONN_STRING: string, DB_NAME: string): Promise<mongoDB.Collection> {
    const collectionName = COLLECTION_NAME;
    const connectionString = DB_CONN_STRING;
    const databaseName = DB_NAME;

    const client: mongoDB.MongoClient = new mongoDB.MongoClient(connectionString);
    await client.connect();
    const db: mongoDB.Db = client.db(databaseName);

    return db.collection(collectionName);
}
