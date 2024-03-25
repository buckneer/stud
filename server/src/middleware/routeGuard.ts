
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";
import { newError } from "../utils";
import 'dotenv/config';
import { UserRequest, UserToken } from './UserRequest';
import { getService, getServiceByUserId } from '../services/service.service';



export const userGuard = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers['authorization'];
        if(!authHeader) throw newError(403, 'Authorization heder je obavezan');

        const token = authHeader.split(' ')[1];
        if(!token) throw newError(403, 'Token je obavezan');

        jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
            if(err) return res.status(401).send(newError(401, 'Token je istekao'));
            // console.log(user as UsetToken);
            req.user = user as UserToken;
            
            next();
        })
    } catch (e: any) {
        console.error(e);
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}


export const roleGuard = (role: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        // Test url: http://localhost:3000/uni/65fafc2da919db458f7ed90d/student/add
        try {
            console.log(req.user);
            if(!req.user) throw newError(401, 'Niste ulogovani');
            if(!req.user.roles.includes(role)) throw newError(403, 'STOJ!');

            if(req.user.roles.includes('service')) {
                // checks only university
                // Every service can access every department if on same uni.
                if(!req.params.university) throw newError(401, 'Id univerziteta je obavezan');
                
                let service = await getServiceByUserId(req.user.id);
                
                let uni = service.university?.toString();
                
                
                if(uni !== req.params.university) { throw newError(403, 'Ne možete da pristupite ovom univerzitetu') }
                console.log("YOU PASSED ROUTE GUARD");
                next();
            } 
            // if (req.user.role == 'professor') {
            //     // TODO check what professor has access to
            // }
            
            // if (req.user.role = 'student') {
            //     // TODO same for the student
            // }
            
            // next();
        } catch (e: any) {
            console.error(e);
            return res.status(e.status || 500).send(e || 'Internal Server Error');
        }

    }
}