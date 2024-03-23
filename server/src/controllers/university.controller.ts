import { Response, Request } from 'express';
import log from "../logger";
import { addStudents, addUniversity, getAllUniversities, getUni } from '../services/university.service';

export async function handleGetAllUnis(req: Request, res: Response) {
	try {
		let resp = await getAllUniversities();
		return res.send(resp);
	} catch (e: any) {
		log.error(e.message);
		return res.status(e.status || 500).send(e || 'Internal Server Error');
	}
}

export async function handleNewUni(req: Request, res: Response) {
	try {
		let uni = {
			...req.body
		}

		let resp = await addUniversity(uni);
		return res.send(resp);

	} catch (e: any) {
		log.error(e.message);
		return res.status(e.status || 500).send(e || 'Internal Server Error');
	}
}

export async function handleAddStudentsUni(req: Request, res: Response) {
	try {
		let students = req.body.students;
		let uniId = req.body.uniId;

		let resp = await addStudents(uniId, students);
		return res.send(resp);
	} catch (e: any) {
		log.error(e.message);
		return res.status(e.status || 500).send(e || 'Internal Server Error');
	}
}

export async function handleGetUni(req: Request, res: Response) {
	try {
		let { id } = req.params;

		let resp = await getUni(id);

		return res.status(200).send(resp);
	} catch (e: any) {
		return res.status(e.status || 500).send(e || 'Internal Server Error');
	}
}

// TODO: add getUniversity()...