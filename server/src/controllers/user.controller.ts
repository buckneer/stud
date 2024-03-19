import { UserDocument } from "../models/user.model";
import { loginUser, logoutUser, refreshAccessToken, registerUser } from "../services/user.service";
import {Request, Response} from "express";
import log from "../logger";



export async function handleRegister(req: Request, res: Response) {
	try {
        
        //@ts-ignore
		let user : UserDocument = {
			...req.body
		}

		let resp = await registerUser(user);

		
	
		return res.send(resp);
	} catch (e: any) {
		return res.status(e.status).send(e);
	}
}


export async function handleLogin(req: Request, res: Response) {
	try {
		let email = req.body.email
		let password = req.body.password;
		let userAgent = req.headers['user-agent'];
		
        if(!userAgent || !email || !password ) { return res.status(400).send({message: 'Bad Request'}) };

        let session = await loginUser(email, password, userAgent)
        return res.send(session);
	} catch (e: any) {
		log.error(e.message);
		return res.status(e.status).send(e);
	}
}

export async function handleRefresh(req: Request, res: Response) {
	try {
		let refreshToken = req.body.refreshToken;
		let userAgent = req.headers['user-agent'];

        if(!userAgent) return res.status(400).send({message: 'User-agent je obavezan!'});

		let resp = await refreshAccessToken(refreshToken, userAgent);
        return res.send(resp);
	} catch (e: any) {
		log.error(e.message);
		return res.status(e.status).send(e);
	}
}

export async function handleLogout(req: Request, res: Response) {
	try {
		//@ts-ignore
		let refreshToken = req.body.refreshToken;
		let userAgent = req.headers['user-agent'];

        if(!userAgent) return res.status(400).send({message: 'User-agent je obavezan!'});
        if(!refreshToken) return res.status(400).send({message: 'Refresh Token je obavezan!'});

        let logoutResp = await logoutUser(refreshToken, userAgent);
			
        if (logoutResp) {
            return res.status(200).send(logoutResp);
        } else {
            return res.status(500).send({message: "Internal Server error"});
        }
			

	} catch (e: any) {
		log.error(e.message);
		return res.status(e.status).send(e);
	}
}
