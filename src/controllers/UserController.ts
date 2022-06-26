import {Request, Response } from 'express';
import UserModel, { User} from '../models/UserModel'
import { MongoError } from 'mongodb';

class UserController {
    public async create (req: Request, res:Response): Promise<Response> {
        try{
                        
            const user = await UserModel.create({ ...req.body });
        
            return res.status(201).json({ id: user.id, name: user.name, email: user.email});

        } catch (error) {
            if ((error as MongoError).code === 11000) {
                return res.status(400).json({error: 'E-mail já utilizado'})
            }
            console.log(error);
            return res.status(500).json({error: 'Server error'})
        }
    }

    public async update (req: Request, res:Response): Promise<Response> {
        try{
            
            const data: User = req.body

            const user = await UserModel.findById(req.params.id);

            if (!user) return res.status(404).json({ error: "Usuário não encontrado" });
            
            user.name = (data.name) ? data.name : user.name;
            user.email = (data.email) ? data.email : user.email;

            await user.save();
            
            return res.json({ id: user.id, name: user.name, email: user.email});

        } catch (error) {
            if ((error as MongoError).code === 11000) {
                return res.status(400).json({error: 'E-mail já utilizado'})
            }
            console.log(error);
            return res.status(500).json({error: 'Server error'})
        }
    }

    public async find (req: Request, res:Response): Promise<Response> {
        try{
           
            const user = await UserModel.findById(req.params.id, {password: 0});

            if (!user) return res.status(404).json({ error: "Usuário não encontrado" });
            
            return res.json({ id: user.id, name: user.name, email: user.email});

        } catch (error) {
            return res.status(500).json({error: 'Server error'})
        }
    }
}

export default new UserController()