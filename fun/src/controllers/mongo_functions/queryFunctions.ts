import { Item } from "../../interfaces/data";
import { ObjectId } from "mongodb";
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

/**
 * Higher-order funktio
 * Hyödyntää queryDatabase funktiota
 * Hakee kaikki dokumentit tietokannasta
 */
export async function getAllOperation(connect: (COLLECTION_NAME: string, DB_CONN_STRING: string, DB_NAME: string) => Promise<mongoDB.Collection>): Promise<Item[]> {
    dotenv.config();
    const collection = await connect(
        process.env.COLLECTION_NAME ? process.env.COLLECTION_NAME : '',
        process.env.DB_CONN_STRING ? process.env.DB_CONN_STRING : '',
        process.env.DB_NAME ? process.env.DB_NAME : '',
    );

    return await collection.find({}).toArray() as Item[];
}

/**
 * Higher-order funktio, joka hyödyntää queryDatabase funktiota
 * Hakee yhden dokumentin tietokannasta _id parametrin avulla
 */
export async function getOneOperation(connect: (COLLECTION_NAME: string, DB_CONN_STRING: string, DB_NAME: string) => Promise<mongoDB.Collection>, _id: string): Promise<Item> {
    dotenv.config();
    const collection = await connect(
        process.env.COLLECTION_NAME ? process.env.COLLECTION_NAME : '',
        process.env.DB_CONN_STRING ? process.env.DB_CONN_STRING : '',
        process.env.DB_NAME ? process.env.DB_NAME : '',
    );

    const findQuery = { _id: new ObjectId(_id) };
    const item = await collection.findOne(findQuery) as Item;
    return item;
}

/**
 * Higher-order funktio, joka hyödyntää queryDatabase funktiota
 * Luo yhden dokumentin tietokantaan
 */
export async function createOperation(connect: (COLLECTION_NAME: string, DB_CONN_STRING: string, DB_NAME: string) => Promise<mongoDB.Collection>, _object: Item): Promise<boolean> {
    dotenv.config();
    const collection = await connect(
        process.env.COLLECTION_NAME ? process.env.COLLECTION_NAME : '',
        process.env.DB_CONN_STRING ? process.env.DB_CONN_STRING : '',
        process.env.DB_NAME ? process.env.DB_NAME : '',
    );

    const result = await collection.insertOne(_object);

    if (result.acknowledged) {
        return true;
    }

    return false;
}

/**
 * Higher-order funktio, joka hyödyntää queryDatabase funktiota
 * Poistaa yhden olemassa olevan dokumentin tietokannasta
 */
export async function deleteOperation(connect: (COLLECTION_NAME: string, DB_CONN_STRING: string, DB_NAME: string) => Promise<mongoDB.Collection>, _id: string): Promise<boolean> {
    dotenv.config();
    const collection = await connect(
        process.env.COLLECTION_NAME ? process.env.COLLECTION_NAME : '',
        process.env.DB_CONN_STRING ? process.env.DB_CONN_STRING : '',
        process.env.DB_NAME ? process.env.DB_NAME : '',
    );

    const findQuery = { _id: new ObjectId(_id) };
    const result = await collection.deleteOne(findQuery);

    if (result.acknowledged) {
        return true;
    }

    return false;
}
