import Professor, { ProfessorDocument } from '../models/professor.model';
import { Request, Response } from "express";
import { addProfessor, updateProfessor, getProfessor, getProfessors } from '../services/professor.service';
import { addToModelArray, removeFromModelArray } from '../utils/service.utils';
import { getGradesByRole } from '../services/grade.service';

export async function handleAddProfessor(req: Request, res: Response) {
    try {       
        let professor: ProfessorDocument = {
            ...req.body,
        }
        let uni = req.body.university;

        // add error handling here...
        let resp: any = await addProfessor(uni, professor);

        return res.status(200).send(resp);
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

export async function handleAddSubjectsToProfessor(req: Request, res: Response) {
    try {
        let { id } = req.params;
        let { subjects } = req.body;

        let resp = await addToModelArray(Professor, id, 'subjects', subjects);
        return res.status(200).send(resp);
    } catch(e: any) {
		return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleDeleteSubjectFromProfessor(req: Request, res: Response) {
    try {
        let { id } = req.params;
        let { subject } = req.body;

        let resp = await removeFromModelArray(Professor, id, 'subjects', subject);
        return res.status(200).send(resp);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleAddGradesToProfessor(req: Request, res: Response) {
    try {
        let { id } = req.params;
        let { grades } = req.body;

        let resp = await addToModelArray(Professor, id, 'grades', grades);
        return res.status(200).send(resp);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleRemoveGradeFromProfessor(req: Request, res: Response) {
    try {
        let { id } = req.params;
        let { grade } = req.body;

        let resp = await removeFromModelArray(Professor, id, 'grades', grade);
        return res.status(200).send(resp);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleAddUniToProfessor(req: Request, res: Response) {
    try {
        let { id } = req.params;
        let { universities } = req.body;

        let resp = await addToModelArray(Professor, id, 'universities', universities);
        return res.status(200).send(resp);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleRemoveUniFromProfessor(req: Request, res: Response) {
    try {
        let { id } = req.params;
        let { university } = req.body;

        let resp = await removeFromModelArray(Professor, id, 'universities', university);
        return res.status(200).send(resp);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleGetProfessorGrades(req: Request, res: Response) {
    try {
        let { id } = req.params;

        let resp = await getGradesByRole(id, Professor);
        return res.status(200).send(resp);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}