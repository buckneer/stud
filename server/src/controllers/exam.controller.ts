import { Request, Response } from "express";
import { addExam, getExam, getExams, updateExam } from "../services/exam.service";

export async function handleAddExam(req: Request, res: Response) {
    try {
        let data = {
            ...req.body
        }

        let resp = await addExam(data);

        return res.status(resp);
    } catch (e: any) {
        return res.status(e.status).send(e); 
    }
}

export async function handleGetExams(req: Request, res: Response) {
    try {
        let exams = await getExams();
        return res.send(exams);
    } catch (e: any) {
        return res.status(e.status).send(e); 
    }
}

export async function handleGetExam(req: Request, res: Response) {
    try {
        let { id } = req.params;

        let resp = await getExam(id);

        return res.send(resp);
    } catch (e: any) {
        return res.status(e.status).send(e); 
    }
}

export async function handleUpdateExam(req: Request, res: Response) {
    try {
        let { id } = req.params;

        let data = {
            ...req.body
        }

        let resp = updateExam(id, data);

        return res.status(200).send(resp);

    } catch (e: any) {
        return res.status(e.status).send(e); 
    }
}