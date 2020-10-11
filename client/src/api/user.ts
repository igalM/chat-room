import { Api } from "../shared/axios";
import { User } from "../types";

class UserApi extends Api {

    public async signinNewUser(user: User): Promise<User> {
        const response = await this.post<User, User>('/user', user);
        return response.data;
    }

}

export const userApi = new UserApi();