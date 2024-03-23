import Department, { DepDocument } from "../models/department.model";
import { Request, Response } from "express";
import { addDepartment, getDepartment, getDepartments, updateDepartment } from "../services/department.service";

export async function handleAddDepartment(req: Request, res: Response) {
    try {
        let data: DepDocument = {
            ...req.body
        }
        // data.university;

        // let { university } = req.params;

        let resp = await addDepartment(data);

        return res.send(resp);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error'); 
    }
}

export async function handleGetDepartments(req: Request, res: Response) {
    try {
        let { university } = req.params;

        let resp = await getDepartments(university);

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