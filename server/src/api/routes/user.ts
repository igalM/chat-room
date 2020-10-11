import { NextFunction, Request, Response, Router } from "express";
import UserService from '../../services/user';
import Container from "typedi";
import { User } from "../../models/user";
import upload from "../../util/file-upload";


const route = Router();

export default (app: Router) => {
    app.use('/user', route);
    const userServiceInstance = Container.get(UserService);


    route.post('', upload.single('file'), async (req: Request, res: Response, next: NextFunction) => {
        try {
            const file = req.file as any;
            const body: User = {
                username: req.body.username,
            };
            if (file) {
                body.avatar = file.location;
            }
            const userExists = await userServiceInstance.getUserByName(body.username);
            if (userExists) {
                return res.status(500).json({ message: 'Sorry, this user already exists.' });
            } else {
                const user = await userServiceInstance.addNewUser(body);
                return res.status(200).json(user);
            }
        } catch (e) {
            return next(e);
        }
    });
}