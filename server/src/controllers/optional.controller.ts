import { Request, Response } from 'express';
import { addOptional, getOptional } from '../services/optional.service';

export async function handleAddOptional(req: Request, res: Response) {
	try {
		let data = req.body;

		let resp = await addOptional(data);
		return res.status(200).send(resp);
	} catch (e: any) {
		return res.status(e.status || 500).send(e || 'Internal Server Error');
	}
}

export async function handleGetOptional(req: Request, res: Response) {
	try {
		let { uni } = req.params;
		let { department, semester } = req.query;

		// @ts-ignore
		let resp = await getOptional(uni, department, semester);
		return res.status(200).send(resp);
	} catch (e: any) {
		return res.status(e.status || 500).send(e || 'Internal Server Error');
	}
}