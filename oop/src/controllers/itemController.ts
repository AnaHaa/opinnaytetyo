import { Item, ItemInterface, MongoInterface } from '../interfaces';
import MongoController from './mongoController';
import * as dotenv from "dotenv";
import { Request, Response } from 'express';

/**
 * ItemController luokka joka implementoi ItemInterface
 * Hyödyntää MongoController oliota tiedon hakemisessa
 * Käsittelee ja vastaa Express kutsuihin
 */
export default class ItemController implements ItemInterface {
    collectionName: string;
    databaseName: string;
    connectionString: string;

    constructor() {
        dotenv.config();
        this.collectionName = process.env.COLLECTION_NAME ? process.env.COLLECTION_NAME : '';
        this.databaseName = process.env.DB_NAME ? process.env.DB_NAME : '';
        this.connectionString = process.env.DB_CONN_STRING ? process.env.DB_CONN_STRING : '';
    }

    getAllItems = async (req: Request, res: Response): Promise<void> => {
        try {
            const mongoController = new MongoController(this.connectionString, this.databaseName, this.collectionName);

            const documents: Item[] = await mongoController.fetchAllDocuments() as Item[];
            documents ? res.status(200).send(documents) : res.status(404).send('Not found');
        } catch (error) {
            res.status(500).send('Internal server error');
        }
    }

    getItem = async (req: Request, res: Response): Promise<void> => {
        try {
            const mongoController = new MongoController(this.connectionString, this.databaseName, this.collectionName);
            const _id: string = req.query._id ? req.query._id as string : '';

            const document: Item = await mongoController.fetchDocument(_id) as Item;
            document ? res.status(200).send(document) : res.status(404).send('Not found');
        } catch (error) {
            res.status(500).send('Internal server error');
        }
    }

    insertItem = async (req: Request, res: Response): Promise<void> => {
        try {
            const mongoController = new MongoController(this.connectionString, this.databaseName, this.collectionName);
            const _object: Object = req.body;

            const isInserted: Boolean = await mongoController.insertDocument(_object);
            isInserted ? res.status(201).send('Item inserted') : res.status(500).send('Internal server error');
        } catch (error) {
            res.status(500).send('Internal server error');
        }
    }

    deleteItem = async (req: Request, res: Response): Promise<void> => {
        try {
            const mongoController = new MongoController(this.connectionString, this.databaseName, this.collectionName);
            const _id: string = req.query._id ? req.query._id as string : '';

            const isDeleted: Boolean = await mongoController.deleteDocument(_id);
            isDeleted ? res.status(202).send('Item deleted') : res.status(500).send('Internal server error');
        } catch (error) {
            res.status(500).send('Internal server error');
        }
    }
}
