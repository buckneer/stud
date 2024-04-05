import Student from './../models/student.model';
import { Request, Response } from "express";
import log from "../logger";
import {
    addStudent,
    addSubjectsToStudent,
    deleteStudent,
    getStudent,
    getStudents,
    getStudentsByDepartment,
    getStudentsBySemester
} from "../services/student.service";
import { newResponse } from "../utils";
import { addToModelArray, removeFromModelArray } from '../utils/service.utils';
import { getGradesByRole } from '../services/grade.service';

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
        let { uni } = req.params;

        let resp = await getStudents(uni);
        console.log(resp);
        return res.status(200).send(resp);
    } catch (e: any) {
        log.error(e.message);
		return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleGetStudent(req: Request, res: Response) {
    try {

        let { stud } = req.params;

        if(!stud) return res.status(400).send({ message: 'Id studenta je obavezan' });

        let resp = await getStudent(stud);
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
        let stud = req.params.id;

        let resp = await deleteStudent(stud);
        return res.status(200).send(newResponse('Korisnik je obrisan'));

    } catch (e: any) {
        log.error(e.message);
		return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleAddStudentToSubjects(req: Request, res: Response) {
    try {
        let { stud } = req.params;
        let subjects = req.body.subjects;

        let resp = await addToModelArray(Student, stud, 'subjects', subjects);
        return res.status(200).send(resp);

    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleRemoveStudentFromSubject(req: Request, res: Response) {
    try {
        let { stud } = req.params;
        let { subject } = req.body;

        let resp = await removeFromModelArray(Student, stud, 'subjects', subject);
        return res.status(200).send(resp);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleAddSubjectsToCompleted(req: Request, res: Response) {
    try {
        let { stud } = req.params;
        let subjects = req.body.subjects;

        let resp = await addToModelArray(Student, stud, 'completedSubjects', subjects);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleAddExamsToStudent(req: Request, res: Response) {
    try {
        let { stud } = req.params;
        let { exams } = req.body;

        let resp = await addToModelArray(Student, stud, 'exams', exams);
        return res.status(200).send(resp);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function removeExamFromStudent(req: Request, res: Response) {
    try {
        let { stud } = req.params;
        let { exam } = req.body;

        let resp = removeFromModelArray(Student, stud, 'exams', exam);
        return res.status(200).send(resp);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleGetStudentGrades(req: Request, res: Response) {
    try {
        let { stud } = req.params;

        let resp = await getGradesByRole(stud, Student);
        return res.status(200).send(resp);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleGetStudentsBySemester(req: Request, res: Response) {
    try {
        let { uni } = req.params;
        let { sem } = req.query;

        if(!sem) {
            return res.status(400).send({ message: 'Morate naznačiti semestar!' });
        }

        let resp = await getStudentsBySemester(uni, sem);
        return res.status(200).send(resp);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleGetStudentsByDepartment(req: Request, res: Response) {
    try {
        let { id } = req.params;

        let resp = await getStudentsByDepartment(id);
        return res.status(200).send(resp);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleAddSubjectsToStudent(req: Request, res: Response) {
    try {
        let { uni } = req.params;
        let {subjects} = req.body;
        let {id} = req.user!;

        let resp = await addSubjectsToStudent(id, subjects, uni);
        return res.status(200).send(resp);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}
