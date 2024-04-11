import { Request, Response } from "express";
import {
    addProfessorToSubjects,
    addSubject,
    getProfessorSubjects,
    addSubjectsToOptional, getAvailableReqSubjects, getSubject,
    getSubjectRole,
    getSubjects,
    updateSubject,
    getEnrollableSubjects, getOptionalSubjects,
    getAvailableOptionalSubjects, getSubjectsForExam,
    getProfessorsOnSubject
} from "../services/subject.service";
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
        } 
        if (dep) {
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
        let { sub } = req.params;

        let resp = await getSubject(sub);

        return res.status(200).send(resp);
    } catch (e: any) {
		return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleUpdateSubject(req: Request, res: Response) {
    try {
        let { sub } = req.params;

        let data = {
            ...req.body
        }

        let resp = await updateSubject(sub, data);

        return res.status(200).send(resp);

    } catch (e: any) {
		return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

// TODO: add a function to add one professor to more subjects...
export async function handleAddProfessorToManySubjects(req: Request, res: Response) {
    try {
        let { professor } = req.params; // professor
        let { subjects } = req.body;

        let resp = await addProfessorToSubjects(professor, subjects);
        return res.status(200).send(resp);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleRemoveProfessorFromSubject(req: Request, res: Response) {
    try {
        let { sub } = req.params;
        let { professor } = req.body;

        let resp = await removeFromModelArray(Subject, sub, 'professors', professor);
        return res.status(200).send(resp);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleAddRequiredsToSubject(req: Request, res: Response) {
    try {
        let { sub } = req.params;
        let { requiredSub } = req.body;

        let resp = await addToModelArray(Subject, sub, 'requiredSub', requiredSub);
        return res.status(200).send(resp);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleRemoveRequiredFromSubject(req: Request, res: Response) {
    try {
        let { sub } = req.params;
        let { requiredSub } = req.body;

        let resp = await removeFromModelArray(Subject, sub, 'requiredSub', requiredSub);
        return res.status(200).send(resp);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleGetSubjectRole(req: Request, res: Response) {
    try {
        let { sub, role } = req.params;

        if(!role || (role !== 'student' && role !== 'professor')) {
            return res.status(400).send({ message: 'Rola je neophodna!' });
        }

        let resp = await getSubjectRole(sub, role);

        return res.status(200).send(resp);

    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleGetProfessorSubjects(req: Request, res: Response) {
    try {
    //     660d4b4f2fc0467794196e9f
        let {uni} = req.params;
        let resp = await getProfessorSubjects(req.user!.id, uni);
        return res.status(200).send(resp);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleAddSubjectsToOptional(req: Request, res: Response) {
	try {
        let { opt, uni } = req.params;
        let { subjects } = req.body;

        let resp = await addSubjectsToOptional(opt, subjects, uni);
        return res.status(200).send(resp);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleGetAvailableReqSubjects(req: Request, res: Response) {
    try {
        let { uni, dep } = req.params;
        let { semester } = req.query;

        // @ts-ignore
        let resp = await getAvailableReqSubjects(uni, dep, semester);
        return res.status(200).send(resp);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleGetEnrollableSubjects(req: Request, res: Response) {
    try {
        let { uni, dep, sem } = req.params;
        // WHILE TESTING:
        let user = req?.user?.id;
        let resp = await getEnrollableSubjects(user, uni, dep);
        return res.status(200).send(resp);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleGetOptionalSubjects(req: Request, res: Response) {
    try {
        let { uni, dep, sem } = req.params;
        let user = req?.user?.id;

        let resp = await getOptionalSubjects(user, uni, dep);
        return res.status(200).send(resp);
    } catch(e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleGetAvailableOptionalSubjects(req: Request, res: Response) {
    try {
        let { uni, dep } = req.params;
        let { sem, degree } = req.query;

        // @ts-ignore
        let resp = await getAvailableOptionalSubjects(uni, dep, sem, degree);
        return res.status(200).send(resp);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleGetSubjectsForExam(req: Request, res: Response) {
    try {
        let {uni, period} = req.params;
        let resp = await getSubjectsForExam(period, uni);
        return res.status(200).send(resp);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleGetProfessorsOnSubject(req: Request, res: Response) {
    try {
        let { uni, sub } = req.params;
        let resp = await getProfessorsOnSubject(uni, sub);

        return res.status(200).send(resp);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}