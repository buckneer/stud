import { Response, Request } from 'express';
import log from "../logger";
import { addStudents, addUniversity, getAllUniversities } from '../services/university.service';

export async function handleGetAllUnis(req: Request, res: Response) {
    try {
        let resp = await getAllUniversities();
        return res.send(resp);
    } catch (e: any) {
        log.error(e.message);
        return res.status(e.status).send(e);
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
		return res.status(e.status).send(e);
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
		return res.status(e.status).send(e);
	}
}

// TODO: add getUniversity()...