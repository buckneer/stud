import { Request, Response } from "express";
import { addExam, getExam, getExams, getGradesByExam, updateExam } from "../services/exam.service";
import { addToModelArray, removeFromModelArray } from "../utils/service.utils";
import Exam from "../models/exam.model";

export async function handleAddExam(req: Request, res: Response) {
    try {
        let data = {
            ...req.body
        }

        let resp = await addExam(data);

        return res.send(resp);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error'); 
    }
}

export async function handleGetExams(req: Request, res: Response) {
    try {
        let exams = await getExams();
        return res.send(exams);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error'); 
    }
}

export async function handleGetExam(req: Request, res: Response) {
    try {
        let { id } = req.params;

        let resp = await getExam(id);

        return res.send(resp);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error'); 
    }
}

export async function handleUpdateExam(req: Request, res: Response) {
    try {
        let { id } = req.params;

        let data = {
            ...req.body
        }

        let resp = await updateExam(id, data);

        return res.status(200).send(resp);

    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error'); 
    }
}

export async function handleAddStudentsToExam(req: Request, res: Response) {
    try {
        let { id } = req.params;
        let { students } = req.body;

        let resp = await addToModelArray(Exam, id, 'students', students);
        return res.status(200).send(resp);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error'); 
    }
}

export async function handleRemoveStudentFromExam(req: Request, res: Response) {
    try {
        let { id } = req.params;
        let { student } = req.body;

        let resp = await removeFromModelArray(Exam, id, 'students', student);
        return res.status(200).send(resp);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error'); 
    }
}

export async function handleAddGradesToExam(req: Request, res: Response) {
    try {
        let { id } = req.params;
        let { grades } = req.body;

        let resp = await addToModelArray(Exam, id, 'grades', grades);
        return res.status(200).send(resp);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error'); 
    }
}

export async function handleRemoveGradeFromExam(req: Request, res: Response) {
    try {
        let { id } = req.params;
        let { grade } = req.body;

        let resp = await removeFromModelArray(Exam, id, 'grades', grade);
        return res.status(200).send(resp);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error'); 
    }
}

export async function handleGetUniExams(req: Request, res: Response) {
    try {
        let { id } = req.params;
        let { active }: any = req.query;

        if(!active || active === '0') {
            active = false;
        }

        
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error'); 
    }
}

export async function handleGetGradesByExam(req: Request, res: Response) {
    try {
        let { id } = req.params;

        let resp = await getGradesByExam(id);
        return res.status(200).send(resp);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}
