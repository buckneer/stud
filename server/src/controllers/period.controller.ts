import { Request, Response } from 'express';
import Period, { PeriodDocument } from '../models/period.model';
import { addPeriod, getAvailableExamsInPeriod, getPeriod, getPeriods, getUniPeriods, updatePeriod } from '../services/period.service';
import { addToModelArray, removeFromModelArray } from '../utils/service.utils';

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

		let resp = await getPeriod(id);

		return res.status(200).send(resp);

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

export async function handleAddExamToPeriod(req: Request, res: Response) {
	try {
		let { id } = req.params;
		let { exams } = req.body;

		let resp = await addToModelArray(Period, id, 'exams', exams);
		return res.status(200).send(resp);
	} catch (e: any) {
		return res.status(e.status || 500).send(e || 'Internal Server Error');
	}
}

export async function handleRemoveExamFromPeriod(req: Request, res: Response) {
	try {
		let { id } = req.params;
		let { exam } = req.body;

		let resp = await removeFromModelArray(Period, id, 'exams', exam);
		return res.status(200).send(resp);
	} catch (e: any) {
		return res.status(e.status || 500).send(e || 'Internal Server Error');
	}
}

export async function handleGetUniPeriods(req: Request, res: Response) {
	try {
		let { id } = req.params;
		// let { active }: any = req.query;

		// if(!active) {
		// 	active = 'all';
		// }

		let resp = await getUniPeriods(id /*, active*/);
		return res.status(200).send(resp);

	} catch (e: any) {
		return res.status(e.status || 500).send(e || 'Internal Server Error');
	}
}

// student/:id/period/exam/
export async function handleGetAvailableExamsInPeriod(req: Request, res: Response)  {
	try {
		let { id } = req.params;

		let resp = await getAvailableExamsInPeriod(id);
		return res.status(200).send(resp);
	} catch (e: any) {
		return res.status(e.status || 500).send(e || 'Internal Server Error');
	}
}