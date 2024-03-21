import { ProfessorDocument } from '../models/professor.model';
import { Request, Response } from "express";
import { addProfessor, editProfessor, getProfessor, getProfessors } from 'services/professor.service';

export async function handleAddProfessor(req: Request, res: Response) {
    try {       
        let professor: ProfessorDocument = {
            ...req.body,
        }

        let uni: string = req.params.university;
        let user: string = req.params.user;
        // add error handling here...
        let resp: any = await addProfessor(uni, professor, user);

        return res.status(resp.status).send(resp);
    } catch (e: any) {
        return res.status(e.status).send(e);
    }
}

export async function handleGetProfessor(req: Request, res: Response) {
    try {
        let professor: string = req.params.professor;

        let resp = await getProfessor(professor);

        return res.status(200).send(resp);
    } catch (e: any) {
        return res.status(e.status).send(e);
    }
}

// admin function
export async function handleGetProfessors(req: Request, res: Response) {
    try {
        let university = req.params.university;
        
        let resp = await getProfessors(university);

        return res.status(200).send(resp);
    } catch (e: any) {
        return res.status(e.status).send(e);
    }
}

export async function handleEditProfessor(req: Request, res: Response) {
    try {
        let professor = req.params.professor;
        let data: ProfessorDocument = req.body;

        let resp = await editProfessor(professor, data);

        return res.status(200).send(resp);
    } catch(e: any) {
        return res.status(e.status).send(e);
    }
}

