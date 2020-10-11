import { Schema, model, Document } from 'mongoose';

export class User {
    id?: string;
    username: string;
    avatar?: string;
}

const schema = new Schema({
    username: { required: true, type: String },
    avatar: { required: false, type: String }
})

export interface UserDocument extends User, Document {
    id: string;
}

export const Users = model<UserDocument>('User', schema)