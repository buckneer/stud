import { Request, Response } from "express";
import { addProfessorToSubjects, addSubject, getSubject, getSubjects, updateSubject } from "../services/subject.service";
import { addToModelArray, removeFromModelArray } from "../utils/service.utils";
import Subject from "../models/subject.model";

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

// TODO: add a function to add one professor to more subjects...
export async function handleAddProfessorToManySubjects(req: Request, res: Response) {
    try {
        let { id } = req.params; // professor
        let { subjects } = req.body;

        let resp = await addProfessorToSubjects(id, subjects);
        return res.status(200).send(resp);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleAddProfessorsToSubject(req: Request, res: Response) {
    try {
        let { id } = req.params;
        let { professors } = req.body;

        let resp = await addToModelArray(Subject, id, 'professors', professors);
        return res.status(200).send(resp);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleRemoveProfessorFromSubject(req: Request, res: Response) {
    try {
        let { id } = req.params;
        let { professor } = req.body;

        let resp = await removeFromModelArray(Subject, id, 'professors', professor);
        return res.status(200).send(resp);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleAddRequiredsToSubject(req: Request, res: Response) {
    try {
        let { id } = req.params;
        let { requiredSub } = req.body;

        let resp = await addToModelArray(Subject, id, 'requiredSub', requiredSub);
        return res.status(200).send(resp);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleRemoveRequiredFromSubject(req: Request, res: Response) {
    try {
        let { id } = req.params;
        let { requiredSub } = req.body;

        let resp = await removeFromModelArray(Subject, id, 'requiredSub', requiredSub);
        return res.status(200).send(resp);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}