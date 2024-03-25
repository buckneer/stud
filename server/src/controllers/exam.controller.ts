import { Request, Response } from "express";
import { addExam, getExam, getExams, updateExam, updateGrades, updateStudents } from "../services/exam.service";

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

export async function handleUpdateStudents(req: Request, res: Response) {
    try {
        let { id } = req.params;
        let data = {
            ...req.body
        }
        let resp = await updateStudents(id, data);
        return resp;
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleUpdateGrades(req: Request, res: Response) {
    try {
        let { id } = req.params;
        let data = {
            ...req.body
        }
        let resp = await updateGrades(id, data);

        return resp;
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}