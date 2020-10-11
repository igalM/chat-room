import { Message, Messages, MessageDocument } from '../models/message';
import { Service } from 'typedi';

@Service()
export default class ChatService {
    constructor() {
    }

    public async getRecentMessages(): Promise<MessageDocument[]> {
        return await Messages.find().sort({ _id: -1 }).limit(25).populate('user').exec();
    }

    public async addNewMessage(message: Message): Promise<MessageDocument> {
        const messageRecord = await Messages.create(message);
        if (!messageRecord) throw new Error('Error creating message');
        const messagePopulated = await messageRecord.populate('user').execPopulate();
        return messagePopulated;
    }

}