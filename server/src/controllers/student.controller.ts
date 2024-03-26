import Student, { StudentDocument } from './../models/student.model';
import { Request, Response } from "express";
import log from "../logger";
import { addStudent, deleteStudent, getStudent, getStudents } from "../services/student.service";
import { newResponse } from "../utils";
import { addToModelArray, removeFromModelArray } from '../utils/service.utils';

export async function handleAddStudent(req: Request, res: Response) {
    try {
        let  student = { ...req.body};
        
        // TODO implement university everywhere where it's needed
        let university: string = req.body.university;

        let resp = await addStudent(student, university);
        console.log(resp);
        return res.status(200).send(resp);
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
        return res.status(200).send(resp);
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
        return res.status(200).send(resp);
    } catch (e: any) {
        log.error(e.message);
		return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleUpdateStudent(req: Request, res: Response) {
    try {
        return res.status(404).send("Implement");
    } catch (e: any) {
        log.error(e.message);
		return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleDeleteStudent(req: Request, res: Response) {
    try {
        let id = req.params.id;

        let resp = await deleteStudent(id);
        return res.status(200).send(newResponse('Korisnik je obrisan'));

    } catch (e: any) {
        log.error(e.message);
		return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleAddStudentToSubjects(req: Request, res: Response) {
    try {
        let { id } = req.params;
        let subjects = req.body.subjects;     
        
        let resp = await addToModelArray(Student, id, 'subjects', subjects);
        return res.status(200).send(resp);

    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleRemoveStudentFromSubject(req: Request, res: Response) {
    try {
        let { id } = req.params;
        let { subject } = req.body;

        let resp = await removeFromModelArray(Student, id, 'subjects', subject);
        return res.status(200).send(resp);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleAddSubjectsToCompleted(req: Request, res: Response) {
    try {
        let { id } = req.params;
        let subjects = req.body.subjects;

        let resp = await addToModelArray(Student, id, 'completedSubjects', subjects);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}