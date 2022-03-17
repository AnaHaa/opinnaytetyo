import { Request, Response } from 'express';
import { Item } from "../interfaces/data";
import { queryDatabase } from "./mongo_functions/connectFunctions";
import { createOperation } from "./mongo_functions/queryFunctions";

/**
 * Post päätepiste
 * Hyödyntää higher-order ja callback funktioita
 * Luo yhden dokumentin tietokantaan
 */
export async function insertItem(req: Request, res: Response) {
    try {
        const body = req.body as Item;
        const result = await createOperation(queryDatabase, body);
        result ? res.status(201).send('Item inserted') : res.status(500).send('Internal server error');
    } catch (err) {
        res.status(500).send('Internal server error');
    }
}
