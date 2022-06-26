import { Router } from 'express';
import UserController from '../controllers/UserController';
import { requireToken } from '../middlewares/RequireToken';

const UserRouter = Router();

UserRouter.post('/v1/users', async(req, res) => {
    await UserController.create(req, res);
});

UserRouter.put('/v1/users/:id', requireToken, async(req, res) => {
    await UserController.update(req, res);
});

export default UserRouter;