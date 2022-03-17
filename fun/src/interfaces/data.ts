import { ObjectId } from "mongodb";

export type Item = {
    _id?: ObjectId,
    name: string,
    email: string
}
