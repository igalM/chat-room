import { Schema, model, Document } from 'mongoose';
import { UserDocument } from './user';

export class Message {
    id?: string;
    user: UserDocument['id'];
    body: string;
    createdAt: number;
}

const schema = new Schema({
    user: { required: true, type: Schema.Types.ObjectId, ref: 'User' },
    body: { required: true, type: String },
    createdAt: { required: true, type: Number }
})

export interface MessageDocument extends Message, Document {
    id: string;
}

export const Messages = model<MessageDocument>('Message', schema)