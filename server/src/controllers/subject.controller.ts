import { Request, Response } from "express";
import { addSubject, getSubject, getSubjects, updateSubject } from "../services/subject.service";

export async function handleAddSubject(req: Request, res: Response) {
    try {

        let {department} = req.params;

        let data = {
            ...req.body
        }

        let resp = await addSubject(department, data);

        return res.status(200).send(resp);
    } catch (e: any) {
        return res.status(e.status).send(e); 
    }
}

export async function handleGetSubjects(req: Request, res: Response) {
    try {
        let {id} = req.params;

        let resp = await getSubjects(id);
        
        return res.status(200).send(resp);
    } catch (e: any) {
        return res.status(e.status).send(e); 
    }
}

export async function handleGetSubject(req: Request, res: Response) {
    try {
        let { id } = req.params;

        let resp = await getSubject(id);

        return res.status(200).send(resp);
    } catch (e: any) {
        return res.status(e.status).send(e); 
    }
}

export async function handleUpdateSubject(req: Request, res: Response) {
    try {
        let { id } = req.params;

        let data = {
            ...req.body
        }

        let resp = await updateSubject(id, data);

        return res.status(200).send(resp);

    } catch (e: any) {
        return res.status(e.status).send(e); 
    }
}