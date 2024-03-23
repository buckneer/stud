import { ProfessorDocument } from '../models/professor.model';
import { Request, Response } from "express";
import { addProfessor, updateProfessor, getProfessor, getProfessors } from '../services/professor.service';

export async function handleAddProfessor(req: Request, res: Response) {
    try {       
        let professor: ProfessorDocument = {
            ...req.body,
        }

        let uni: string = req.params.university;
        // add error handling here...
        let resp: any = await addProfessor(uni, professor);

        return res.status(resp.status).send(resp);
    } catch (e: any) {
		return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleGetProfessor(req: Request, res: Response) {
    try {
        let professor: string = req.params.professor;

        let resp = await getProfessor(professor);

        return res.status(200).send(resp);
    } catch (e: any) {
		return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

// admin function
export async function handleGetProfessors(req: Request, res: Response) {
    try {
        let university = req.params.university;
        
        let resp = await getProfessors(university);

        return res.status(200).send(resp);
    } catch (e: any) {
		return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleUpdateProfessor(req: Request, res: Response) {
    try {
        let professor = req.params.professor;
        let data: ProfessorDocument = req.body;

        let resp = await updateProfessor(professor, data);

        return res.status(200).send(resp);
    } catch(e: any) {
		return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

