import { Request, Response } from 'express';
import { PeriodDocument } from '../models/period.model';
import { addPeriod, getPeriod, getPeriods, updatePeriod } from '../services/period.service';

export async function handleAddPeriod(req: Request, res: Response) {
	try {
		let data: PeriodDocument = {
			...req.body
		}

		let resp = await addPeriod(data);

		return res.send(resp);

	} catch (e: any ) {
		return res.status(e.status || 500).send(e || 'Internal Server Error');
	}
}

export async function handleGetPeriods(req: Request, res: Response) {
	try {
		let periods = await getPeriods();
		return res.send(periods);
	} catch (e: any ) {
		return res.status(e.status || 500).send(e || 'Internal Server Error');
	}
}

export async function handleGetPeriod(req: Request, res: Response) {
	try {
		let { id } = req.params;

		let resp = getPeriod(id);

		return res.send(resp);

	} catch (e: any ) {
		return res.status(e.status || 500).send(e || 'Internal Server Error');
	}
}

export async function handleUpdatePeriod(req: Request, res: Response) {
	try {
		let { id } = req.params;

		let data: PeriodDocument = {
			...req.body
		}

		let resp = await updatePeriod(id, data);

		return res.send(resp)
	} catch (e: any ) {
		return res.status(e.status || 500).send(e || 'Internal Server Error');
	}
}