import { ServiceDocument } from "../models/service.model";
import { addService, getServices, updateService } from "../services/service.service";
import { Request, Response } from "express";

export async function handleAddService(req: Request, res: Response) {
    try {
        let service: ServiceDocument = {
            ...req.body
        }

        let uni: string = req.params.university;

        let resp: any = await addService(uni, service);

        return res.send(resp);
    } catch (e: any) {
		return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleUpdateService(req: Request, res: Response) {
    try {
        let { service } = req.params;
        let data: ServiceDocument = req.body;

        let resp: any = await updateService(service, data);
    } catch (e: any) {
		return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

export async function handleGetServices(req: Request, res: Response) {
    try {
        let { university } = req.params;

        let resp: any = await getServices(university);
        
        return res.send(resp);
    } catch (e: any) {
		return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}