import Professor, { ProfessorDocument } from '../models/professor.model';
import { Request, Response } from "express";
import { addProfessor, updateProfessor, getProfessor, getProfessors, addSubjectToProfessors, giveSign, addUniToProfessor } from '../services/professor.service';
import { addToModelArray, removeFromModelArray } from '../utils/service.utils';
import { getGradesByRole } from '../services/grade.service';

export async function handleAddProfessor(req: Request, res: Response) {
    try {
        let professor: ProfessorDocument = {
            ...req.body,
        }
        let { uni } = req.params;

        // add error handling here...
        let resp: any = await addProfessor(uni, professor);

        return res.status(200).send(resp);
    } catch (e: any) {
		return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleGetProfessor(req: Request, res: Response) {
    try {
        let { professor, uni } = req.params;

        let resp = await getProfessor(professor, uni);

        return res.status(200).send(resp);
    } catch (e: any) {
		return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

// admin function
export async function handleGetProfessors(req: Request, res: Response) {
    try {
        let { uni } = req.params;

        let resp = await getProfessors(uni);

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
        let { professor } = req.params;
        let { subjects } = req.body;

        let resp = await addToModelArray(Professor, professor, 'subjects', subjects);
        return res.status(200).send(resp);
    } catch(e: any) {
		return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleAddProfessorsToSubject(req: Request, res: Response) {
    try {
        let { sub } = req.params;
        let { professors } = req.body;

        let resp = await addSubjectToProfessors(sub, professors);

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
        let { professor } = req.params;
        let { grades } = req.body;

        let resp = await addToModelArray(Professor, professor, 'grades', grades);
        return res.status(200).send(resp);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleRemoveGradeFromProfessor(req: Request, res: Response) {
    try {
        let { professor } = req.params;
        let { grade } = req.body;

        let resp = await removeFromModelArray(Professor, professor, 'grades', grade);
        return res.status(200).send(resp);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleAddUniToProfessor(req: Request, res: Response) {
    try {
        let { professor, uni } = req.params;

        let resp = await addUniToProfessor(professor, uni);
        return res.status(200).send(resp);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleRemoveUniFromProfessor(req: Request, res: Response) {
    try {
        let { professor } = req.params;
        let { university } = req.body;

        let resp = await removeFromModelArray(Professor, professor, 'university', university);
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

export async function handleGiveSign(req: Request, res: Response) {
    try {
        let { sub } = req.params; // subject
        let { students } = req.body;
        let professor = req.user?.id

        let resp = await giveSign(sub, professor!, students);
        return res.status(200).send(resp);
    } catch(e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}
