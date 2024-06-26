import Department, { DepDocument } from "../models/department.model";
import { Request, Response } from "express";
import { addDepartment, getDepartment, getDepartments, updateDepartment } from "../services/department.service";
import { addToModelArray, removeFromModelArray } from "../utils/service.utils";

export async function handleAddDepartment(req: Request, res: Response) {
    try {
        let data: DepDocument = {
            ...req.body
        }
        // data.university;

        let { uni } = req.params;

        let resp = await addDepartment(uni, data);

        return res.send(resp);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleGetDepartments(req: Request, res: Response) {
    try {
        let { uni } = req.params;

        let resp = await getDepartments(uni);

        return res.send(resp);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleGetDepartment(req: Request, res: Response) {
    try {
        let { department } = req.params;

        let resp = await getDepartment(department);

        return res.send(resp);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleUpdateDepartment(req: Request, res: Response) {
    try {
        let { department } = req.params;

        let data: DepDocument = {
            ...req.body
        }

        let resp = await updateDepartment(department, data);

        return res.send(resp);

    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleAddStudentsToDepartment(req: Request, res: Response) {
    try {
        let { department } = req.params;
        let { students } = req.body;

        let resp = await addToModelArray(Department, department, 'students', students);
        return res.status(200).send(resp);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleRemoveStudentFromDepartment(req: Request, res: Response) {
    try {
        let { id } = req.params;
        let { student } = req.body;

        let resp = await removeFromModelArray(Department, id, 'students', student);
        return res.status(200).send(resp);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleAddProfessorToDepartment(req: Request, res: Response) {
    try {
        let { id } = req.params;
        let { professors } = req.body;

        let resp = await addToModelArray(Department, id, 'professors', professors);
        return res.status(200).send(resp);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleRemoveProfessorFromDepartment(req: Request, res: Response) {
    try {
        let { id } = req.params;
        let { professor } = req.body;

        let resp = await removeFromModelArray(Department, id, 'professors', professor);
        return res.status(200).send(resp);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleAddSubjectsToDepartment(req: Request, res: Response) {
    try {
        let { id } = req.params;
        let { subjects } = req.body;

        let resp = await addToModelArray(Department, id, 'subjects', subjects);
        return res.status(200).send(resp);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleRemoveSubjectFromDepartment(req: Request, res: Response) {
    try {
        let { id } = req.params;
        let { subject } = req.body;

        let resp = await removeFromModelArray(Department, id, 'subjects', subject);
        return res.status(200).send(resp);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}
