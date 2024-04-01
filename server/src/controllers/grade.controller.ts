import { Request, Response } from "express";
import { addGrade, getGrade, getGrades, updateGrade } from "../services/grade.service";

export async function handleAddGrade(req: Request, res: Response) {
    try {
        let data = {
            ...req.body
        }

        let resp = await addGrade(data);

        return res.send(resp);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleGetGrades(req: Request, res: Response) {
    try {
        
        let grades = await getGrades();

        return res.status(200).send(grades);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleGetGrade(req: Request, res: Response) {
    try {
        let { id } = req.params;

        let grade = await getGrade(id);

        return res.status(200).send(grade);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleUpdateGrade(req: Request, res: Response) {
    try {
        let { id } = req.params;

        let data = {
            ...req.body
        }


        let resp = await updateGrade(id, data);

        return res.status(200).send(resp);

    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

