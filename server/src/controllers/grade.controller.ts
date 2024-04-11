import { Request, Response } from "express";
import {addGrade, getGrade, getGrades, getGradesBySubject, getStats, updateGrade} from "../services/grade.service";

export async function handleAddGrade(req: Request, res: Response) {
    try {
        let data = {
            ...req.body
        }

        let user = req.user?.id!

        let resp = await addGrade(user, data);

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
        let { grade } = req.params;

        let savedGrade = await getGrade(grade);

        return res.status(200).send(savedGrade);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleUpdateGrade(req: Request, res: Response) {
    try {
        let { grade } = req.params;

        let data = {
            ...req.body
        }


        let resp = await updateGrade(grade, data);

        return res.status(200).send(resp);

    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleGetStats(req: Request, res: Response) {
    try {
        let { uni } = req.params;
        let { id } = req!.user!;

        let resp = await getStats(id, uni);
        return res.status(200).send(resp);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleGetGradesBySubject(req: Request, res: Response) {
    try {
        let { uni, sub } = req.params;
        let resp = await getGradesBySubject(sub);
        return res.status(200).send(resp);
    } catch (e: any) {
        return res.status(500).send(e || 'Internal Server Error');
    }
}
