
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";
import { newError } from "../utils";
import 'dotenv/config';
import { UserRequest, UserToken } from './UserRequest';
import { getService } from '../services/service.service';



export const userGuard = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    if(!authHeader) return res.status(403).send(newError(403, 'Authorization heder je obavezan'));

    const token = authHeader.split(' ')[1];
    if(!token) return res.status(403).send(newError(403, 'Token je obavezan'));

    jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
        if(err) return res.status(401).send(newError(401, 'Token je istekao'));
        req.user = user as UserToken;
        next();
    })
}


export const roleGuard = (role: string) => {
    return async (req: UserRequest, res: Response, next: NextFunction) => {
        if(!req.user) return res.status(401).send(newError(401, 'Niste ulogovani'));
        if(req.user.role != role) return res.status(401).send(newError(401, 'STOJ!'));
        
        if(req.user.role == 'service') {
            // checks only university
            // Every service can access every department if on same uni.
            if(!req.params.university) return res.status(401).send(newError(401, 'Id univerziteta je obavezan'));
            
            let service = await getService(req.user.id);
            let uni = service.university as unknown as string;
            if(uni !== req.params.university) { return res.status(401).send(newError(401, 'Ne možetet da pristupite ovom univerzitetu')) }
            next();
            
        } 
        if (req.user.role == 'professor') {
            // TODO check what professor has access to
        }
         
        if (req.user.role = 'student') {
            // TODO same for the student
        }
        
        // next();

    }
}