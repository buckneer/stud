import { Request, Response } from 'express';
import Period, { PeriodDocument } from '../models/period.model';
import {
	addPeriod,
	getActivePeriod,
	getPeriod,
	getPeriods,
	getUniPeriods,
	setPeriodActive,
	setPeriodFinished,
	updatePeriod
} from '../services/period.service';
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
		let { period } = req.params;

		let resp = await getPeriod(period);

		return res.status(200).send(resp);

	} catch (e: any ) {
		return res.status(e.status || 500).send(e || 'Internal Server Error');
	}
}

export async function handleUpdatePeriod(req: Request, res: Response) {
	try {
		let { period } = req.params;

		let data: PeriodDocument = {
			...req.body
		}

		let resp = await updatePeriod(period, data);

		return res.send(resp)
	} catch (e: any ) {
		return res.status(e.status || 500).send(e || 'Internal Server Error');
	}
}

export async function handleAddExamToPeriod(req: Request, res: Response) {
	try {
		let { period } = req.params;
		let { exams } = req.body;

		let resp = await addToModelArray(Period, period, 'exams', exams);
		return res.status(200).send(resp);
	} catch (e: any) {
		return res.status(e.status || 500).send(e || 'Internal Server Error');
	}
}

export async function handleRemoveExamFromPeriod(req: Request, res: Response) {
	try {
		let { period } = req.params;
		let { exam } = req.body;

		let resp = await removeFromModelArray(Period, period, 'exams', exam);
		return res.status(200).send(resp);
	} catch (e: any) {
		return res.status(e.status || 500).send(e || 'Internal Server Error');
	}
}

export async function handleGetUniPeriods(req: Request, res: Response) {
	try {
		let { uni } = req.params;
		let { filter }: any = req.query;

		if(!filter) {
			filter = 'all';
		}

		let resp = await getUniPeriods(uni, filter);
		return res.status(200).send(resp);

	} catch (e: any) {
		return res.status(e.status || 500).send(e || 'Internal Server Error');
	}
}

// student/:id/period/exam/
export async function handleGetAvailableExamsInPeriod(req: Request, res: Response)  {
	try {
		let { stud } = req.params;

		// let resp = await getAvailableExamsInPeriod(id);
		return res.status(200).send("Implement");
	} catch (e: any) {
		return res.status(e.status || 500).send(e || 'Internal Server Error');
	}
}

export async function handleSetPeriodActive(req: Request, res: Response) {
	try {
		let { uni, period } = req.params;

		let resp = await setPeriodActive(period, uni);
		return res.status(200).send(resp);
	} catch (e: any) {
		return res.status(e.status || 500).send(e || 'Internal Server Error');
	}
}

export async function handleSetPeriodFinished(req: Request, res: Response) {
	try {
		let { uni, period } = req.params;

		let resp = await setPeriodFinished(period, uni);
		return res.status(200).send(resp);
	} catch (e: any) {
		return res.status(e.status || 500).send(e || 'Internal Server Error');
	}
}


export async function handleGetActivePeriod(req: Request, res: Response) {
	try {
		let { uni } = req.params;

		let resp = await getActivePeriod(uni);
		return res.status(200).send(resp);
	} catch (e: any) {
		return res.status(e.status || 500).send(e || 'Internal Server Error');
	}
}
