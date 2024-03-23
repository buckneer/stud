import { newError, newResponse } from '../utils';
import { UserDocument } from './../models/user.model';
import University, { UniDocument } from "../models/university.model";



export const getAllUniversities = async () => {
    try {
        return await University.find();
    } catch(e: any) {
        throw e;
    }
}

export const getById = async (_id: string) => {
    try {
        return await University.findOne({ _id });
    } catch(e: any) {
        throw e;
    }
}

export const addUniversity = async (university: UniDocument) => {
    try {
        const newUni = new University({...university});
        const saved = await newUni.save();
        return newResponse('Novi fakultet napravljen');
    } catch(e: any) {
        throw e;
    }
}

export const addStudents = async (uniId: string, studentsToAdd: UserDocument[]) => {
    try {
        const uni = await University.findOne({_id: uniId}) as UniDocument;
        if (!uni) throw newError(404, 'Ne postoji fakultet sa tim ID-em');
        let all: UserDocument[] = [];
        all = uni.students ? uni.students.concat(studentsToAdd) : studentsToAdd;

        uni.students = all;
        await uni.save();
        return newResponse('Sacuvani su novi studenti');

    } catch(e: any) {
        throw e;
    }
}

export const addProfessors = async (uniId: string, professorsToAdd: UserDocument[]) => {
    try {
        const uni = await University.findOne({_id: uniId}) as UniDocument;
        if (!uni) throw newError(404, 'Ne postoji fakultet sa tim ID-em');
        let all: UserDocument[] = [];
        all = uni.professors ? uni.professors.concat(professorsToAdd) : professorsToAdd;

        uni.students = all;
        await uni.save();
        return newResponse('Sacuvani su novi profesori');
    } catch(e: any) {
        throw e;
    }
}

export const addServices = async (uniId: string, servicesToAdd: UserDocument[]) => {
    try {
        const uni = await University.findOne({_id: uniId}) as UniDocument;
        if (!uni) throw newError(404, 'Ne postoji fakultet sa tim ID-em');
        let all: UserDocument[] = [];
        all = uni.service ? uni.service.concat(servicesToAdd) : servicesToAdd;

        uni.students = all;
        await uni.save();
    } catch(e: any) {
        throw e;
    }
}



export const deleteUniversity = (uniId: string) => {
    try {
        
    } catch(e: any) {
        throw e;
    }
}

export const editUniversity = (uniId: string, university: UniDocument) => {
    try {
        
    } catch(e: any) {
        throw e;
    }
}

