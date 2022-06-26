import { Router } from 'express';
import TransactionController from '../controllers/TransactionController';
import { requireToken } from '../middlewares/RequireToken';

const TransactionRouter = Router();

TransactionRouter.post('/v1/transactions', requireToken, async(req, res) => {
    await TransactionController.create(req, res);
});

TransactionRouter.put('/v1/transactions/:id', requireToken, async(req, res) => {
   // await TransactionController.update(req, res);
});

TransactionRouter.get('/v1/transactions', requireToken, async(req, res) => {
    await TransactionController.findAll(req,res);
});

TransactionRouter.get('/v1/transactions/:id', requireToken, async(req, res) => {
   // await TransactionController.find(req,res);
});

TransactionRouter.delete('/v1/transactions/:id', requireToken, async(req, res) => {
   // await TransactionController.remove(req,res);
});

export default TransactionRouter;