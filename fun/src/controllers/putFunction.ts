import { Request, Response } from 'express';
import { Data } from "../interfaces/data";
import { queryDatabase } from "./mongo_functions/connectFunctions";
import { createOperation, updateOperation } from "./mongo_functions/queryFunctions";

/**
 * Delete päätepiste
 * Hyödyntää higher-order ja callback funktioita
 * Luo tai päivittää yhden dokumentin tietokannasta
 */
export async function putData(req: Request, res: Response) {
    try {
        let result: Data[];
        const body = req.body as Data;

        if (!body._id) {
            result = await createOperation(queryDatabase, body);
        } else {
            result = await updateOperation(queryDatabase, body);
        }

        result ? res.status(201).send(result) : res.status(404).send('Not found');
    } catch (err) {
        console.log(err);
        res.status(404).send('Not found');
    }
}
