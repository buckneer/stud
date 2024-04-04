
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";
import { newError } from "../utils";
import 'dotenv/config';
import { UserRequest, UserToken } from './UserRequest';
import { getService, getServiceByUserId } from '../services/service.service';
import log from "../logger";
import Professor from "../models/professor.model";



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


type TRoleWithCondition = {
    role: string;
    when: (req: Request, ...args: any[]) => boolean;
};

export const AuthGuard = (rolesWithCondition: TRoleWithCondition[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {

            if (!req.user) return res.status(401).send(newError(401, 'Unauthorized'));

            const hasPermission = rolesWithCondition.some(({ role, when }) => {

                if (!when) {
                    return req.user!.roles.includes(role);
                }

                return req.user!.roles.includes(role) && when(req);
            });
            if (!hasPermission) {
                return res.status(403).send(newError(403, 'Forbidden'));
            }
            next();
        } catch (error) {
            console.error(error);
            return res.status(500).send(newError(500, 'Internal Server Error'));
        }
    };
}

export const roleGuard = (roles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        // Test url: http://localhost:3000/uni/65fafc2da919db458f7ed90d/student/add
        try {

            if(!req.user) return res.status(401).send(newError(401, 'Niste ulogovani'));
            if(!req.user.roles.some(item => roles.includes(item))) res.status(403).send(newError(403, 'STOJ!'));

            if(req.user.roles.includes('professor')) {
                console.log("You are professor");

                let professor = await Professor.findOne({user: req.user.id});
                if(!professor) return res.status(404).send(newError(404, 'Profesor nije pronađen'))
                if(!req.params.subj) return res.status(404).send(newError(401, 'Predmet nije pronađen'));

                let professorSubj = professor.subjects.map(subj => subj.toString());
                if(!professorSubj.includes(req.params.subj)) return res.status(401).send(newError(401, 'Nemate pristup ovom predmetu'));


                return next();

            }


            if(req.user.roles.includes('student')) {
                console.log("You are student");
                return next();

            }

            if(req.user.roles.includes('service')) {
                console.log("You are a service");
                // checks only university
                // Every service can access every department if on same uni.
                if(!req.params.university) return  res.status(401).send(newError(401, 'Id univerziteta je obavezan'));

                let service = await getServiceByUserId(req.user.id);

                let uni = service.university?.toString();


                if(uni !== req.params.university) { return res.status(403).send(newError(403, 'Ne možete da pristupite ovom univerzitetu')) }
                console.log("YOU PASSED ROUTE GUARD");
                return next();
            }
        } catch (e: any) {
            console.error(e);
            return res.status(e.status || 500).send(e || 'Internal Server Error');
        }

    }
}
