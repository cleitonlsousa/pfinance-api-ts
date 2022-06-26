import { Router } from 'express';
import AuthController from '../controllers/AuthController';

const AuthRouter = Router();

AuthRouter.post('/v1/login', async(req, res) => {
    await AuthController.login(req, res);
});

export default AuthRouter;