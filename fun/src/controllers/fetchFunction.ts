import { Request, Response } from 'express';
import { queryDatabase } from "./mongo_functions/connectFunctions";
import { getAllOperation, getOneOperation } from './mongo_functions/queryFunctions';

/**
 * Get päätepiste
 * Hyödyntää higher-order ja callback funktioita
 * Hakee kaikki tai yhden dokumentin tietokannasta
 */
export async function fetchData(req: Request, res: Response) {
    try {
        if (req.query._id) {
            const result = await getOneOperation(queryDatabase, req.query._id as string);
            result ? res.status(200).send(result) : res.status(404).send('Not found');
        }

        const result = await getAllOperation(queryDatabase);
        result ? res.status(200).send(result) : res.status(404).send('Not found');
    } catch (err) {
        res.status(404).send('Not found');
    }
}
