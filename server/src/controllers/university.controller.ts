import { Response, Request } from 'express';
import log from "../logger";
import { addStudents, addUniversity, getAllUniversities, getUni } from '../services/university.service';
import { addToModelArray, removeFromModelArray } from '../utils/service.utils';
import University from '../models/university.model';

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
export async function handleAddServicesToUni(req: Request, res: Response) {
	try {
		let { id } = req.params;
		let { services } = req.body;

		let resp = await addToModelArray(University, id, 'services', services);
		return res.status(200).send(resp);
	} catch (e: any) {
		return res.status(e.status || 500).send(e || 'Internal Server Error');
	}
}

export async function handleRemoveServiceFromUni(req: Request, res: Response) {
	try {
		let { id } = req.params;
		let { service } = req.body;

		let resp = await removeFromModelArray(University, id, 'services', service);
		return res.status(200).send(resp);
	} catch (e: any) {
		return res.status(e.status || 500).send(e || 'Internal Server Error');
	}
}

export async function handleAddProfessorsToUni(req: Request, res: Response) {
	try {
		let { id } = req.params;
		let { professors } = req.body;

		let resp = await addToModelArray(University, id, 'professors', professors);
		return res.status(200).send(resp);
	} catch (e: any) {
		return res.status(e.status || 500).send(e || 'Internal Server Error');
	}
}

export async function handleRemoveProfessorFromUni(req: Request, res: Response) {
	try {
		let { id } = req.params;
		let { professor } = req.body;

		let resp = await removeFromModelArray(University, id, 'professors', professor);
		return res.status(200).send(resp);
	} catch (e: any) {
		return res.status(e.status || 500).send(e || 'Internal Server Error');
	}
}

export async function handleAddDepartmentsToUni(req: Request, res: Response) {
	try {
		let { id } = req.params;
		let { departments } = req.body;

		let resp = await addToModelArray(University, id, 'departments', departments);
		return res.status(200).send(resp);
	} catch (e: any) {
		return res.status(e.status || 500).send(e || 'Internal Server Error');
	}
}

export async function handleRemoveDepartmentFromUni(req: Request, res: Response) {
	try {
		let { id } = req.params;
		let { department } = req.body;

		let resp = await removeFromModelArray(University, id, 'departments', department);
		return res.status(200).send(resp);
	} catch (e: any) {
		return res.status(e.status || 500).send(e || 'Internal Server Error');
	}
}