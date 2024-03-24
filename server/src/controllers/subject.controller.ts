import { Request, Response } from "express";
import { addSubject, getSubject, getSubjects, updateSubject } from "../services/subject.service";

export async function handleAddSubject(req: Request, res: Response) {
    try {

        // let { department } = req.params;

        let data = {
            ...req.body
        }
        
        let resp = await addSubject(data.department, data);

        return res.status(200).send(resp);
    } catch (e: any) {
		return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleGetSubjects(req: Request, res: Response) {
    try {
        let { uni, dep } = req.params;
        let key, value;

        // shitty workaround, can be changed later or not idk...
        if(uni) {
            key = 'university';
            value = uni;
        } else if (dep) {
            key = 'department';
            value = dep;
        }


        let resp = await getSubjects(key, value);
        
        return res.status(200).send(resp);
    } catch (e: any) {
		return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleGetSubject(req: Request, res: Response) {
    try {
        let { id } = req.params;

        let resp = await getSubject(id);

        return res.status(200).send(resp);
    } catch (e: any) {
		return res.status(e.status || 500).send(e || 'Internal Server Error');
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
		return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}