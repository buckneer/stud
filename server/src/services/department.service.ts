import Department, { DepDocument } from "../models/department.model";
import University from "../models/university.model";
import { newError, newResponse } from "../utils";

export const addDepartment = async (_id:string, data: DepDocument) => {
    try {
        let uniObj = await University.findOne({ _id });

        if(!uniObj) throw newError(404, 'Greška prilikom kreiranja odseka!');

        let newDep = new Department(data);

        let added = await newDep.save();

        if(!added) throw newError(500, 'Internal Server Error');

        return {
            status: 200,
            message: `Odsek '${newDep.name}' je uspešno napravljen!`,
            _id: added._id
        }
        
    } catch (e: any) {
        throw e;
    }
}

export const getDepartment = async (_id: string) => {
    try {
        let depObj = await Department.findOne({ _id });

        if(!depObj) throw newError(404, 'Nije pronadjen odsek...');
        
        return depObj;
    } catch (e: any) {
        throw e;
    }
}

export const getDepartments = async (university: string) => {
    try {
        let depObj = await Department.find({ university });

        return depObj;
        
    } catch (e: any) {
        throw e;
    }
}

export const updateDepartment = async (department: string, data: DepDocument) => {
    try {
        let depObj = await Department.findOne({ _id: department });

        if(!depObj) throw newError(404, 'Greška prilikom pristupanja!');

        let updated = await Department.updateOne({ _id: department }, {
            $set: {
                ...data
            }
        })

        if(!updated) throw newError(500, 'Internal Server Error');

        return newResponse('Uspešno menjanje profesora!')
    } catch (e: any) {
        throw e;
    }
}