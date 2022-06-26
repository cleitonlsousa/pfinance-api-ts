import {Request, Response } from 'express';
import UserModel  from '../models/UserModel'
import { generateToken } from '../utils/TokenManager'


class AuthController {
    public async login (req: Request, res:Response): Promise<Response> {
        try{
            const {email, password} = req.body;
            
            let user = await UserModel.findOne({email});
        
            if(!user) return res.status(403).json({error: "Usuário/Senha inválidos"})
    
            if(!(await user.comparePassword(password)))
                return res.status(403).json({error: "Usuário/Senha inválidos"})
    
            const generated = generateToken(user.id);
            
            //const [token, expiresIn] = generateToken(user.id);
    
            res.cookie('token', generated?.token, {
                httpOnly: true,
                secure: !(process.env.MODO === 'developer')
            })
    
            return res.json({ token: generated?.token, expiresIn: generated?.expiresIn });

        } catch (error) {
            console.log(error);
            return res.status(500).json({error: 'Server error'})
        }
    }
}

export default new AuthController()