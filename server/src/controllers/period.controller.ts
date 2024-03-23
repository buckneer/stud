import { Request, Response } from 'express';
import { PeriodDocument } from '../models/period.model';

export async function handleAddPeriod(req: Request, res: Response) {
	try {
		let data: PeriodDocument = {
			...req.body
		}

		let resp;

		return res.send(resp);

	} catch (e: any ) {
		return res.status(e.status).send(e); 
	}
}

export async function handleGetPeriods(req: Request, res: Response) {
	try {
		let periods;
		return res.send(periods);
	} catch (e: any ) {
		return res.status(e.status).send(e); 
	}
}

export async function handleGetPeriod(req: Request, res: Response) {
	try {
		let { id } = req.params;

		let resp;

		return res.send(resp);

	} catch (e: any ) {
		return res.status(e.status).send(e); 
	}
}

export async function handleUpdatePeriod(req: Request, res: Response) {
	try {
		let { id } = req.params;

		let data: PeriodDocument = {
			...req.body
		}
	} catch (e: any ) {
		return res.status(e.status).send(e); 
	}
}