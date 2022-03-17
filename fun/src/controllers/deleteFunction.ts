import { Request, Response } from 'express';
import { queryDatabase } from "./mongo_functions/connectFunctions";
import { deleteOperation } from './mongo_functions/queryFunctions';

/**
 * Delete päätepiste
 * Hyödyntää higher-order ja callback funktioita
 * Poistaa yhden dokumentin tietokannasta _id parametrin avulla
 */
export async function deleteItem(req: Request, res: Response) {
    try {
        const result = await deleteOperation(queryDatabase, req.query._id as string);
        result ? res.status(202).send('Item deleted') : res.status(500).send('Internal server error');
    } catch (err) {
        res.status(404).send('Not found');
    }
}
