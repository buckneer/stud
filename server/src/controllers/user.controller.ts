import User, { UserDocument } from "../models/user.model";
import { getUser, loginUser, logoutUser, refreshAccessToken, registerUser, sendPasswordMail, setPassword } from "../services/user.service";
import {Request, Response} from "express";
import log from "../logger";
import { addToModelArray, removeFromModelArray } from "../utils/service.utils";



export async function handleRegister(req: Request, res: Response) {
	try {
        
        //@ts-ignore
		let user : UserDocument = {
			...req.body
		}

		let resp = await registerUser(user);



		return res.send(resp);
	} catch (e: any) {
		return res.status(e.status || 500).send(e || 'Internal Server Error');
	}
}


export async function handleSetPassword(req: Request, res: Response) {
	try {
		let userId = req.body.userId;
		let code = req.body.code;
		let password = req.body.password;

		if(!userId) return res.status(400).send({message: 'UserId je obavezan'});
		if(!code) return res.status(400).send({message: 'Kod je obavezan'});
		if(!password) return res.status(400).send({message: 'Lozinka je obavezna'});

		let resp = await setPassword(userId, password, code);

		return res.status(200).send(resp);
	} catch(e: any) {
		log.error(e.message);
		return res.status(e.status || 500).send(e || 'Internal Server Error');
	}
}

export async function handleSendPasswordMail(req: Request, res: Response) {
	try {
		let email = req.body.email;
		if(!email) return res.status(400).send({message: 'Email adresa je obavezna'});

		let resp = await sendPasswordMail(email);

		return res.status(200).send(resp);
	} catch (e: any) {
		log.error(e.message);
		return res.status(e.status || 500).send(e || 'Internal Server Error');
	}
}

export async function handleLogin(req: Request, res: Response) {
	try {
		let email = req.body.email
		let password = req.body.password;
		let userAgent = req.headers['user-agent'];
		
        if(!userAgent || !email || !password ) { return res.status(400).send({message: 'Bad Request'}) };

        let session = await loginUser(email, password, userAgent);
        return res.send(session);
	} catch (e: any) {
		log.error(e.message);
		return res.status(e.status || 500).send(e || 'Internal Server Error');
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
		return res.status(e.status || 500).send(e || 'Internal Server Error');
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
		return res.status(e.status || 500).send(e || 'Internal Server Error');
	}
}

export async function handleGetUser(req: Request, res: Response) {
	try {
		let { id } = req.params;

		let resp = await getUser(id);

		return res.status(200).send(resp);
	} catch (e: any) {
		return res.status(e.status || 500).send(e || 'Internal Server Error');
	}
}

export async function handleAddUnisToUser(req: Request, res: Response) {
	try {
		let { id } = req.params; // user ID
		let { universities } = req.body;

		let resp = await addToModelArray(User, id, 'universities', universities);

		return res.status(200).send(resp);
	} catch (e: any) {
		return res.status(e.status || 500).send(e || 'Internal Server Error');
	}
}

export async function handleRemoveUniFromUser(req: Request, res: Response) {
	try {
		let { id } = req.params;
		let { university } = req.body;

		let resp = await removeFromModelArray(User, id, 'universities', university);
		return res.status(200).send(resp);
	} catch (e: any) {
		return res.status(e.status || 500).send(e || 'Internal Server Error');
	}
}