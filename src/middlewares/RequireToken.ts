import jwt, {JsonWebTokenError} from 'jsonwebtoken';
import express from "express";
import { VerificationErrorMessage } from '../constants/Constants'
import { RequestIndexed } from '../constants/Constants';

export const requireToken = (req: RequestIndexed, res: express.Response, next:express.NextFunction) => {
    try {
        
        let token = req.headers.authorization
                     
        if(!token) throw new Error('No Bearer')

        if (token.toLowerCase().startsWith('bearer')) {
            token = token.slice('bearer'.length).trim();
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET ?? '')
        
        req.uid = (verified as any).uid;
        
        next();                
    
    } catch (error) {
        return res.status(401).send({error: VerificationErrorMessage[(error as JsonWebTokenError).message]})
    }
}