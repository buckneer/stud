import { ProfessorDocument } from '../models/professor.model';
import { loginUser, logoutUser, refreshAccessToken, registerUser, sendPasswordMail, setPassword } from "../services/user.service";
import { Request, Response } from "express";
import log from "../logger";
import { addProfessor } from 'services/professor.service';

export async function handleAddProfessor(req: Request, res: Response) {
    try {
        let professor: ProfessorDocument = {
            ...req.body
        }
        let uni = req.params.university;

        // add error handling here...
        let resp = await addProfessor(req.params.university, professor)
    } catch (e: any) {
        return res.status(e.status).send(e);
    }
}

export async function handleGetProfessor(req: Request, res: Response) {
    try {

    } catch (e: any) {
        return res.status(e.status).send(e);
    }
}

export async function handleGetProfessors(req: Request, res: Response) {
    try {

    } catch (e: any) {
        return res.status(e.status).send(e);
    }
}

