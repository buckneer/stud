import { Request, Response } from "express";
import {
    addExam,
    addStudentToExams, examsCanAdd,
    getExam,
    getExams, getExamSubject,
    getGradesByExam, getPendingExamsProfessor,
    getStudentExams,
    updateExam
} from "../services/exam.service";
import { addToModelArray, removeFromModelArray } from "../utils/service.utils";
import Exam from "../models/exam.model";

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
        let { uni, period } = req.params;
        let exams = await getExams(uni, period);
        return res.send(exams);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleGetExam(req: Request, res: Response) {
    try {
        let { exam } = req.params;

        let resp = await getExam(exam);

        return res.send(resp);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleUpdateExam(req: Request, res: Response) {
    try {
        let { exam } = req.params;

        let data = {
            ...req.body
        }

        let resp = await updateExam(exam, data);

        return res.status(200).send(resp);

    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleAddStudentsToExam(req: Request, res: Response) {
    try {
        let { exam } = req.params;
        let { students } = req.body;

        let resp = await addToModelArray(Exam, exam, 'students', students);
        return res.status(200).send(resp);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleExamsCanAdd(req: Request, res: Response) {
    try {
        let { stud, uni } = req.params; // TODO remove with authguard


        let resp = await examsCanAdd(stud, uni);

        return res.status(200).send(resp);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleAddStudentToExams(req: Request, res: Response) {
    try {
        let { stud } = req.params; // <- This is student id
        let { exams } = req.body;

        let resp = await addStudentToExams(stud, exams);
        return res.status(200).send(resp);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleRemoveStudentFromExam(req: Request, res: Response) {
    try {
        let { exam } = req.params;
        let { student } = req.body;

        let resp = await removeFromModelArray(Exam, exam, 'students', student);
        return res.status(200).send(resp);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleAddGradesToExam(req: Request, res: Response) {
    try {
        let { exam } = req.params;
        let { grades } = req.body;

        let resp = await addToModelArray(Exam, exam, 'grades', grades);
        return res.status(200).send(resp);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleRemoveGradeFromExam(req: Request, res: Response) {
    try {
        let { exam } = req.params;
        let { grade } = req.body;

        let resp = await removeFromModelArray(Exam, exam, 'grades', grade);
        return res.status(200).send(resp);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleGetUniExams(req: Request, res: Response) {
    try {
        let { uni } = req.params;
        let { active }: any = req.query;

        if(!active || active === '0') {
            active = false;
        }


    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleGetGradesByExam(req: Request, res: Response) {
    try {
        let { exam } = req.params;

        let resp = await getGradesByExam(exam);
        return res.status(200).send(resp);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}


export async function handleGetStudentExams(req: Request, res: Response) {
    try {
        let { exam, status } = req.params;

        let statusArray: string[] = [ 'passed', 'failed', 'tbd' ]; // tbd - to be determined

        if(!status || statusArray.indexOf(status) === -1) {
            return res.status(400).send('Nevalidan status!');
        }

        let resp = await getStudentExams(exam, status);
        return res.status(200).send(resp);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleGetPendingProfessorExams(req: Request, res: Response) {
    try {
    //     TODO get userId from the logged in user
    //     This is temporary
        let { period } = req.params;
        if(!req.user) return res.status(401).send('Morate da se ulogujete');
        let resp = await getPendingExamsProfessor(req.user.id, period);
        return res.status(200).send(resp);

    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function  handleGetExamSubject(req: Request, res: Response) {
    try {
        let {period, sub} = req.params;
        let user = req.user!.id;
        let resp = await getExamSubject(user, period, sub);

        return res.status(200).send(resp);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}
