import { Data } from "../../interfaces/data";
import { ObjectId } from "mongodb";
import * as mongoDB from "mongodb";

/**
 * Higher-order funktio
 * Hyödyntää queryDatabase funktiota
 * Hakee kaikki dokumentit tietokannasta
 */
export async function getAllOperation(connect: () => Promise<mongoDB.Collection>): Promise<Data[]> {
    const collection = await connect();
    return (await collection.find({}).toArray()) as Data[];
}

/**
 * Higher-order funktio, joka hyödyntää queryDatabase funktiota
 * Hakee yhden dokumentin tietokannasta
 */
export async function getOneOperation(connect: () => Promise<mongoDB.Collection>, _id: string): Promise<Data[]> {
    const collection = await connect();
    const findQuery = { _id: new ObjectId(_id) };

    const result = (await collection.findOne(findQuery)) as Data;

    if (result) {
        return [result];
    }

    throw mongoDB.MongoError;
}

/**
 * Higher-order funktio, joka hyödyntää queryDatabase funktiota
 * Luo yhden dokumentin tietokantaan
 */
export async function createOperation(connect: () => Promise<mongoDB.Collection>, _object: Data): Promise<Data[]> {
    const collection = await connect();
    const result = await collection.insertOne(_object);

    if (result) {
        return [_object];
    }

    throw mongoDB.MongoError;
}

/**
 * Higher-order funktio, joka hyödyntää queryDatabase funktiota
 * Päivittää yhden olemassa olevan dokumentin tietokannasta
 */
export async function updateOperation(connect: () => Promise<mongoDB.Collection>, _object: Data): Promise<Data[]> {
    const collection = await connect();
    const findQuery = { _id: new ObjectId(_object._id) };

    const result = await collection.updateOne(findQuery, { $set: {
        name: _object.name,
        email: _object.email
    } });

    if (result.modifiedCount) {
        return [_object];
    }

    throw mongoDB.MongoError;
}

/**
 * Higher-order funktio, joka hyödyntää queryDatabase funktiota
 * Poistaa yhden olemassa olevan dokumentin tietokannasta
 */
export async function deleteOperation(connect: () => Promise<mongoDB.Collection>, _id: string): Promise<Data[]> {
    const collection = await connect();
    const findQuery = { _id: new ObjectId(_id) };

    const result = (await collection.findOne(findQuery)) as Data;

    if (result) {
        collection.deleteOne(findQuery);
        return [result];
    }

    throw mongoDB.MongoError;
}
