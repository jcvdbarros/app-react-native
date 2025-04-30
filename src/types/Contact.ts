import { ObjectId } from "mongoose";

export interface Contact {
  _id?: ObjectId;
  name: string;
  email: string;
  phone: string;
}
