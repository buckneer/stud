import User, { UserDocument } from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import Session from "../models/session.model";
import { newError, newResponse, sendMessage } from "../utils";
import { randomBytes } from 'crypto';

export const registerUser = async (user: UserDocument) => {
    try {
		let userExists = await User.findOne({email: user.email});

        if(userExists) throw newError(409, 'Korisnik vec postoji');
        
        const newUser = new User({...user, modelNum: randomBytes(4).toString('hex').toUpperCase()});
        const registered = await newUser.save();

        if(!registered) throw newError(500, 'Internal Server Error');


        return {
            id: registered._id
        };
        
	} catch (e: any) {
		throw e;
	}
}

export const sendPasswordMail = async (email: string) => {
    try {
        let user = await User.findOne({email});
		let code = randomBytes(4).toString('hex');
        
        if(!user) throw newError(404, 'Korisnik nije pronadjen!');

        user.code = code;
        await user.save();
        sendMessage({to: email, subject: 'Nova lozinka', text: `Kod za kreiranje nove lozinke je: ${code} `})
        return newResponse('Poruka je poslata');
    } catch(e: any) {
        throw e;
    }
}


export const setPassword = async (userId: string, password: string, code: string) => {
    try {
        let user = await User.findOne({_id: userId, code});
        if(!user) throw newError(404, 'Korisnik ne postoji ili kod neispravan!');
        user.password = await bcrypt.hash(password, 10);
        user.confirmed = true;
        
        await user.save();

        return {
            status: 200,
            message: 'Lozinka je sacuvana'
        }

    } catch(e: any) {
        throw e;
    }
}

export const loginUser = async (email: string, password: string, userAgent: string) => {
    try {
        const user = await User.findOne({email: email});
        const expiresIn = process.env.TOKEN_EXPIRE as string;
        if(!user) throw { status: 400, message: 'Korisnik ne postoji' }

        let matchingPass = await bcrypt.compare(password, user.password!);
        if (!matchingPass) throw {status: 401, message: 'Pogresna email adresa ili lozinka'}
        console.log(user);
        const accessToken = jwt.sign({id: user._id, email: user.email, roles: user.roles}, process.env.JWT_SECRET as string, {expiresIn});
        const refreshToken = jwt.sign({id: user._id, email: user.email, roles: user.roles},
            process.env.REFRESH_SECRET as string);

        let session = {
            userId: user._id,
            refreshToken: refreshToken,
            active: true,
            userAgent: userAgent
        }

        let newSession = new Session(session);
        await newSession.save();

        let loggedInUser = await getProfile(user.email);

        return {
            accessToken,
            refreshToken,
            user: loggedInUser
        }
    
    } catch (e: any) {
        throw e;
    }
}


export const logoutUser = async (refreshToken: string, userAgent: string) => {
    try {
		
        let session = await Session.findOne({refreshToken, "active": true, userAgent});
        if(!session) throw { status: 401, message: 'Korisnik nije ulogovan' }

        
        
        session.active = false;
        await session.save();

        return { 'message': 'Uspešno ste se izlogovali!' };
	} catch (e: any) {
		throw e;
	}
}

export const getProfile = async(email: string) => {
	try {

		let user = await User.findOne({email}, {password: 0, code: 0});
		if(!user) throw { status: 400, message: 'Korisnik ne postoji!' }


		return user;
		
	} catch(e: any) {
		throw e;
	}
}

export const refreshAccessToken = async (refreshToken: string, userAgent: string) => {
    try {
		const expiresIn = process.env.TOKEN_EXPIRE as string;
		let session = await Session.findOne({refreshToken, "active": true, userAgent})
        if(!session) throw { status: 401, message: 'Korisnik nije ulogovan!' }
		let decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET as string);

        if(!decoded) throw { status: 409, message: 'Refresh Token je istekao!' };


        //@ts-ignore
		let user = await User.findOne({email: decoded.email});

        if (!user) throw { status: 404, message: 'Korisnik ne postoji!' };

        const accessToken = jwt.sign({id: user._id, email: user.email, roles: user.roles}, process.env.JWT_SECRET as string, {expiresIn});
        
        return {accessToken};

	} catch (e: any) {
		throw e;
	}
}

