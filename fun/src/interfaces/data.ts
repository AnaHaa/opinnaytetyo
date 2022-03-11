import { ObjectId } from "mongodb";

export interface Data {
    _id?: ObjectId,
    name: string,
    email: string
}