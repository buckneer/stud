import { Request, Response } from "express";
import log from "../logger";
import { addStudent, deleteStudent, getStudent, getStudents } from "../services/student.service";
import { newResponse } from "../utils";

export async function handleAddStudent(req: Request, res: Response) {
    try {
        let {student, userId} = req.body;

        let resp = await addStudent(userId, student);
        console.log(resp);
        res.send(resp);
    } catch (e: any) {
        log.error(e.message);
        return res.status(e.status).send(e);
    }
} 

export async function handleGetStudents(req: Request, res: Response) {
    try {
        let resp = await getStudents();
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
        let { id } = req.body;

        let resp = await deleteStudent(id);
        return res.send(newResponse('Korisnik je obrisan'));

    } catch (e: any) {
        log.error(e.message);
        return res.status(e.status).send(e);
    }
}