import { Service } from 'typedi';
import { User, UserDocument, Users } from '../models/user';

@Service()
export default class UserService {
    constructor() {
    }

    public async addNewUser(user: User): Promise<UserDocument> {
        const userRecord = await Users.create(user);
        if (!userRecord) throw new Error('Error creating user');
        return userRecord;
    }

    public async getUserByName(name: string): Promise<UserDocument> {
        return await Users.findOne({ username: name });
    }

}