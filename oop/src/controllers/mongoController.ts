import * as mongoDB from "mongodb";
import { ObjectId, Document } from "mongodb";
import { MongoInterface } from "../interfaces";

/**
 * MongoController luokka joka implementoi MongoInterface
 * Hyväksyy rakennuksessa yhteysparametrit mihin tahansa tietokantaan
 * Voi hakea, syöttää ja poistaa dokumentteja tietokannasta
 */
export default class MongoController implements MongoInterface {
    collection: mongoDB.Collection
    client: mongoDB.MongoClient;
    db: mongoDB.Db

    constructor(connectionString: string, databaseName: string, collectionName: string) {
        this.client = new mongoDB.MongoClient(connectionString);
        this.db = this.client.db(databaseName);
        this.collection = this.db.collection(collectionName);
    }

    async fetchAllDocuments(): Promise<Document[]> {
        await this.client.connect();
        const documents: Document[] = await this.collection.find({}).toArray() as Document[];
        return documents;
    }

    async fetchDocument(_id: string): Promise<Document> {
        await this.client.connect();
        const findQuery: Object = { _id: new ObjectId(_id) };
        const document: Document = await this.collection.findOne(findQuery) as Document;
        return document;
    }

    async insertDocument(_object: Object): Promise<boolean> {
        await this.client.connect();
        const result = await this.collection.insertOne(_object);

        if (result.acknowledged) {
            return true;
        }

        return false;
    }

    async deleteDocument(_id: string): Promise<boolean> {
        await this.client.connect();
        const findQuery: Object = { _id: new ObjectId(_id) };
        const result = await this.collection.deleteOne(findQuery);

        if (result.acknowledged) {
            return true;
        }

        return false;
    }
}
