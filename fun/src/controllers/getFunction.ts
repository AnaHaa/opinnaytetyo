import { Request, Response } from 'express';
import { queryDatabase } from "./mongo_functions/connectFunctions";
import { getAllOperation, getOneOperation } from './mongo_functions/queryFunctions';

/**
 * Get päätepiste
 * Hyödyntää higher-order ja callback funktioita
 * Hakee kaikki dokumentit tietokannasta
 */
export async function getAllItems(req: Request, res: Response) {
    try {
        const result = await getAllOperation(queryDatabase);
        result ? res.status(200).send(result) : res.status(404).send('Not found');
    } catch (err) {
        res.status(404).send('Not found');
    }
}

/**
 * Get päätepiste
 * Hyödyntää higher-order ja callback funktioita
 * Hakee yhden dokumentin tietokannasta
 */
export async function getItem(req: Request, res: Response) {
    try {
        const _id: string = req.query._id ? req.query._id as string : '';
        const result = await getOneOperation(queryDatabase, _id);
        result ? res.status(200).send(result) : res.status(404).send('Not found');
    } catch (err) {
        res.status(404).send('Not found');
    }
}
