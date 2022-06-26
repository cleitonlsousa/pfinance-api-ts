import { Response } from 'express';
import TransactionModel from '../models/TransactionModel';
import { RequestIndexed } from '../constants/Constants';

class TransactionController {

    public async create (req: RequestIndexed, res:Response): Promise<Response> {
        try{
            let data = req.body;

            data.user = req.uid
            
            const t = await TransactionModel.create({ ...data });
        
            return res.status(200).json({message: "created", t: t})

        } catch (error) {
            console.log(error);
            return res.status(500).json({error: 'Server error'})
        }
    }

    public async findAll (req: RequestIndexed, res:Response): Promise<Response> {
        try{

            let { dt_initial, dt_final} = req.query;

            const filters = {
                date: { 
                    $gte: new Date(dt_initial), 
                    $lte: new Date(dt_final) 
                },
                user: req.uid
            }          

            let transactions = await TransactionModel.find(filters).sort({ date: 'desc'});       

            return (transactions) ? res.json(transactions) : res.status(404).json({ error: "Transações não encontradas" });      

        } catch (error) {
            console.log(error);
            return res.status(500).json({error: 'Server error'})
        }
    }
}

export default new TransactionController()