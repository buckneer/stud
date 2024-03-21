import { Request, Response } from "express";
import log from "../logger";
import { addStudent, deleteStudent, getStudent, getStudents } from "../services/student.service";
import { newResponse } from "../utils";

export async function handleAddStudent(req: Request, res: Response) {
    try {
        let { student } = req.body;
        
        // TODO implement university everywhere where it's needed
        let userId: string = req.params.user;
        let university: string = req.params.university;

        let resp = await addStudent(userId, student, university);
        console.log(resp);
        res.send(resp);
    } catch (e: any) {
        log.error(e.message);
        return res.status(e.status).send(e);
    }
} 

export async function handleGetStudents(req: Request, res: Response) {
    try {
        let { university } = req.params;

        let resp = await getStudents(university);
        console.log(resp);
        res.send(resp);
    } catch (e: any) {
        log.error(e.message);
        return res.status(e.status).send(e);
    }
}

export async function handleGetStudent(req: Request, res: Response) {
    try {
        
        let { id } = req.params;

        if(!id) return res.status(400).send({ message: 'Id studenta je obavezan' });

        let resp = await getStudent(id);
        return res.send(resp);
    } catch (e: any) {
        log.error(e.message);
        return res.status(e.status).send(e);
    }
}

export async function handleUpdateStudent(req: Request, res: Response) {
    try {
        return res.send("Implement");
    } catch (e: any) {
        log.error(e.message);
        return res.status(e.status).send(e);
    }
}

export async function handleDeleteStudent(req: Request, res: Response) {
    try {
        let id = req.params.id;

        let resp = await deleteStudent(id);
        return res.send(newResponse('Korisnik je obrisan'));

    } catch (e: any) {
        log.error(e.message);
        return res.status(e.status).send(e);
    }
}