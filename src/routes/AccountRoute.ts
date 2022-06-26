import { Router } from 'express';
import AccountController from '../controllers/AccountController';
import { requireToken } from '../middlewares/RequireToken';

const AccountRouter = Router();

AccountRouter.post('/v1/accounts', requireToken, async(req, res) => {
    await AccountController.create(req, res);
});

AccountRouter.put('/v1/accounts/:id', requireToken,  async(req, res) => {
    await AccountController.update(req, res);
});

AccountRouter.get('/v1/accounts', requireToken,  async(req, res) => {
    await AccountController.findAll(req,res);
});

AccountRouter.get('/v1/accounts/:id', requireToken,  async(req, res) => {
    await AccountController.find(req,res);
});

AccountRouter.delete('/v1/accounts/:id', requireToken,  async(req, res) => {
    await AccountController.remove(req,res);
});


export default AccountRouter;