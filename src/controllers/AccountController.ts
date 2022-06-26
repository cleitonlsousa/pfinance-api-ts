import { Response } from 'express';
import AccountModel from '../models/AccountModel'
import { MongoError } from 'mongodb';
import { RequestIndexed } from '../constants/Constants';

class AccountController {

    public async create (req: RequestIndexed, res:Response): Promise<Response> {
        try{
            let data = req.body;
            
            data.user = req.uid
            
            const account = await AccountModel.create({ ...data });
        
            return res.status(200).json({message: "create", account})

        } catch (error) {
            if ((error as MongoError).code === 11000) {
                return res.status(400).json({error: 'Nome de conta já utilizado'})
            }
            console.log(error);
            return res.status(500).json({error: 'Server error'})
        }
    }

    public async update (req: RequestIndexed, res:Response): Promise<Response> {
        try{
            const data = req.body;

            const account = await AccountModel.findById(req.params.id);

            if (!account) return res.status(404).json({ error: "Conta não encontrada" });

            if (!(account.user == req.uid)) return res.status(401).json({ error: "Sem permissão para essa conta" });

            account.name = (data.name) ? data.name : account.name;
            account.type = (data.type) ? data.type : account.type;
            account.amount = (data.amount) ? data.amount : account.amount;
            account.description = (data.description) ? data.description : account.description;
            account.paymantDueDay = (data.paymant_due_day) ? data.paymant_due_day : account.paymantDueDay;
            account.statementDay = (data.statement_day) ? data.statement_day : account.statementDay;
            account.showInResume = (data.show_in_resume) ? data.show_in_resume : account.showInResume;
             
            await account.save();

            return res.json(account);

        } catch (error) {
            if ((error as MongoError).code === 11000) {
                return res.status(400).json({error: 'Nome de conta já utilizado'})
            }
            console.log(error);
            return res.status(500).json({error: 'Server error'})
        }
    }

    public async findAll (req: RequestIndexed, res:Response): Promise<Response> {
        try{
           
            const accounts = await AccountModel.find( {user: req.uid}).sort({name: 'asc'});

            if (!accounts || accounts.length == 0) return res.status(404).json({ error: "Contas não encontradas" });

            return res.json(accounts);

        } catch (error) {
            return res.status(500).json({error: 'Server error'})
        }
    }

    public async find (req: RequestIndexed, res:Response): Promise<Response> {
        try{
           
            const account = await AccountModel.findById(req.params.id);

            if (!account) return res.status(404).json({ error: "Conta não encontrada" });
            
            if (!(account.user == req.uid)) return res.status(401).json({ error: "Sem permissão para essa conta" });

            return res.json({ account });

        } catch (error) {
            return res.status(500).json({error: 'Server error'})
        }
    }

    public async remove (req: RequestIndexed, res:Response): Promise<Response> {
        try{
           
            const account = await AccountModel.findById(req.params.id);

            if (!account) return res.status(404).json({ error: "Conta não encontrada" });
            
            if (!(account.user == req.uid)) return res.status(401).json({ error: "Sem permissão para essa conta" });

            account.active = false;

            await account.save();
        
            return res.json('conta removida')

        } catch (error) {
            return res.status(500).json({error: 'Server error'})
        }
    }
}

export default new AccountController()