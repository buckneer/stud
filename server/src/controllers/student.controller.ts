import { Request, Response } from "express";
import log from "../logger";
import { addStudent, addStudentToSubjects, deleteStudent, getStudent, getStudents, removeStudentFromSubjects } from "../services/student.service";
import { newResponse } from "../utils";

export async function handleAddStudent(req: Request, res: Response) {
    try {
        let { student } = req.body;
        
        // TODO implement university everywhere where it's needed
        let university: string = req.params.university;

        let resp = await addStudent(student, university);
        console.log(resp);
        res.send(resp);
    } catch (e: any) {
        log.error(e.message);
		return res.status(e.status || 500).send(e || 'Internal Server Error');
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
		return res.status(e.status || 500).send(e || 'Internal Server Error');
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
		return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleUpdateStudent(req: Request, res: Response) {
    try {
        return res.send("Implement");
    } catch (e: any) {
        log.error(e.message);
		return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleDeleteStudent(req: Request, res: Response) {
    try {
        let id = req.params.id;

        let resp = await deleteStudent(id);
        return res.send(newResponse('Korisnik je obrisan'));

    } catch (e: any) {
        log.error(e.message);
		return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleAddStudentToSubjects(req: Request, res: Response) {
    try {
        let { id } = req.params;
        let subjects: string[] = req.body.subjects;     
        
        let resp = await addStudentToSubjects(id, subjects);
        return res.status(200).send(resp);

    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleRemoveStudentFromSubjects(req: Request, res: Response) {
    try {
        let { id } = req.params;
        let subjects: string[] = req.body.subjects;

        let resp = await removeStudentFromSubjects(id, subjects);
        return res.status(200).send(resp);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleAddSubjectsToCompleted(req: Request, res: Response) {
    try {

    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}