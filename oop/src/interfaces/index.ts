import * as mongoDB from "mongodb";
import { ObjectId, Document } from "mongodb";
import { Request, Response } from 'express';

export type Item = {
    _id?: ObjectId,
    name: string,
    email: string
}

export interface ItemInterface {
    collectionName: string;
    databaseName: string;
    connectionString: string;
    getAllItems(req: Request, res: Response): Promise<void>;
    getItem(req: Request, res: Response): Promise<void>;
    insertItem(req: Request, res: Response): Promise<void>;
    deleteItem(req: Request, res: Response): Promise<void>;
}

export interface MongoInterface {
    collection: mongoDB.Collection;
    client: mongoDB.MongoClient;
    db: mongoDB.Db;
    fetchAllDocuments(): Promise<Document[]>;
    fetchDocument(_id: string): Promise<Document>;
    insertDocument(_object: Object): Promise<boolean>;
    deleteDocument(_id: string): Promise<boolean>;
}
