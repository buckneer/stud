import User, { UserDocument } from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import Session from "../models/session.model";
import {hasThirtyMinutesPassed, newError, newResponse, sendMessage} from "../utils";
import { randomBytes } from 'crypto';
import { getServiceByUserId } from "./service.service";
import Student from "../models/student.model";
import Professor from "../models/professor.model";
import Service from "../models/service.model";
import Reset from "../models/reset.model";

export const registerUser = async (serviceId: string, user: UserDocument) => {
	let userExists = await User.findOne({ email: user.email });

	if (userExists) throw newError(409, 'Korisnik vec postoji');

	let serviceForUni = await getServiceByUserId(serviceId);


	if (!serviceForUni) throw newError(401, 'Studentska služba nije pronađena');


	const newUser = new User({ ...user, modelNum: randomBytes(4).toString('hex').toUpperCase() });
	newUser.universities.push(serviceForUni.university);
	const registered = await newUser.save();

	if (!registered) throw newError(500, 'Internal Server Error');

	return registered;

}

export const sendPasswordMail = async (email: string) => {
	try {
		let user = await User.findOne({ email });
		let code = randomBytes(4).toString('hex').toUpperCase();

		if (!user) throw newError(404, 'Korisnik nije pronadjen!');

		let reset = {
			code,
			user: user._id,
			active: true
		}

		let newReset = new Reset({...reset});

		await newReset.save();

		// user.code = code;
		// await user.save();

		// UNCOMMENT THIS AFTER TESTING...
		// sendMessage({ to: email, subject: 'Nova lozinka', text: `Kod za kreiranje nove lozinke je: ${code} ` })

		return newResponse(`Poruka je poslata, kod: ${code}`);
	} catch (e: any) {
		throw e;
	}
}

export const setPassword = async (email: string, password: string, code: string) => {
	// TODO test this tomorrow for time (30m currently)
	let user = await User.findOne({ email });
	if (!user) throw newError(404, 'Korisnik ne postoji');

	let resetObj = await Reset.findOne({user: user._id, code});
	if(!resetObj) throw newError(404, "Korisnik ne postoji");

	if(resetObj.active != true) throw newError(401, "Kod je istekao");

	let expired = hasThirtyMinutesPassed(resetObj.createdAt);
	if(expired) {
		throw newError(401, "Kod je istekao");
	}
	resetObj.active = false;

	user.password = await bcrypt.hash(password, 10);
	user.confirmed = true;

	await user.save();
	await resetObj.save();

	return {
		status: 200,
		message: 'Lozinka je sačuvana!'
	}
}

export const loginUser = async (email: string, password: string, userAgent: string) => {
	try {
		const user = await User.findOne({ email: email });
		const expiresIn = process.env.TOKEN_EXPIRE as string;
		if (!user) throw { status: 400, message: 'Korisnik ne postoji' }

		let matchingPass = await bcrypt.compare(password, user.password!);
		if (!matchingPass) throw { status: 401, message: 'Pogresna email adresa ili lozinka' }
		console.log(user);
		const accessToken = jwt.sign({ id: user._id, email: user.email, roles: user.roles }, process.env.JWT_SECRET as string, { expiresIn });
		const refreshToken = jwt.sign({ id: user._id, email: user.email, roles: user.roles },
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

		let session = await Session.findOne({ refreshToken, "active": true, userAgent });
		if (!session) throw { status: 401, message: 'Korisnik nije ulogovan' }



		session.active = false;
		await session.save();

		return { 'message': 'Uspešno ste se izlogovali!' };
	} catch (e: any) {
		throw e;
	}
}

export const getProfile = async (email: string) => {
	try {

		let user = await User.findOne({ email }, { password: 0, code: 0 });
		if (!user) throw { status: 400, message: 'Korisnik ne postoji!' }


		return user;

	} catch (e: any) {
		throw e;
	}
}

export const refreshAccessToken = async (refreshToken: string, userAgent: string) => {
	try {
		const expiresIn = process.env.TOKEN_EXPIRE as string;
		let session = await Session.findOne({ refreshToken, "active": true, userAgent })
		if (!session) throw { status: 401, message: 'Korisnik nije ulogovan!' }
		let decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET as string);

		if (!decoded) throw { status: 409, message: 'Refresh Token je istekao!' };


		//@ts-ignore
		let user = await User.findOne({ email: decoded.email });

		if (!user) throw { status: 404, message: 'Korisnik ne postoji!' };

		const accessToken = jwt.sign({ id: user._id, email: user.email, roles: user.roles }, process.env.JWT_SECRET as string, { expiresIn });

		return { accessToken };

	} catch (e: any) {
		throw e;
	}
}

export const getUser = async (_id: string) => {
	let userObj = User.findOne({ _id }, {
		password: 0,
	});

	if (!userObj) throw newError(404, 'Korisnik nije pronadjen!');

	return userObj;
}

export const getPendingUsers = async (university: string, role: string) => {

	// TODO test this with new users, but delete all users before that!
	const roleToCollectionMap = {
		'student': 'students',
		'professor': 'professors',
		'service': 'services'
	};

	// Determine the collection name based on the role
	// @ts-ignore
	const collectionName = roleToCollectionMap[role];
	const usersByUni = await User.find({ universities: university, roles: role });

	const userIds = usersByUni.map(user => user._id)


	return User.aggregate([
		{
			$match: {
				_id: { $in: userIds } // Filter users based on the IDs found
			}
		},
		{
			$lookup: {
				from: collectionName,
				localField: '_id',
				foreignField: 'user',
				as: 'studentInfo'
			}
		},
		{
			$match: {
				studentInfo: { $eq: [] } // Filter users not present in 'students'
			}
		},
		{
			$project: {
				studentInfo: 0
			}
		}
	]);

}

export const deleteUserById = async (_id: string) => {
	await User.findOneAndDelete({ _id });
	await Student.deleteMany({ user: _id });
	await Professor.deleteMany({ user: _id });
	await Service.deleteMany({ user: _id });
	await Session.updateMany({ userId: _id }, { active: false });


	return newResponse("Korisnik je uspešno obrisan ");

	// Use this when you need to remove only id from collection
	// await MODEL.updateMany(
	// 	{ user: _id },
	// 	{ $pull: { students: _id } }
	// );
}
