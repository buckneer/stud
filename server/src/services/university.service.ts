import { newError, newResponse } from '../utils';
import { UserDocument } from './../models/user.model';
import University, { UniDocument } from "../models/university.model";
import {Types} from "mongoose";



export const getAllUniversities = async () => {
    try {
        return await University.find();
    } catch(e: any) {
        throw e;
    }
}

export const getUni = async (_id: string) => {
    let uniObj = await University.findOne({ _id });

    if(!uniObj) throw newError(404, 'Ne postoji univerzitet!');

    return uniObj;

}

export const addUniversity = async (university: UniDocument) => {
    try {
        const newUni = new University({...university});
        const saved = await newUni.save();
        return saved;
    } catch(e: any) {
        throw e;
    }
}

export const addStudents = async (uniId: string, studentsToAdd: any) => {
    try {
        const uni = await University.findOne({_id: uniId}) as UniDocument;
        if (!uni) throw newError(404, 'Ne postoji fakultet sa tim ID-em');
        let all = [];
        all = uni.students ? uni.students.concat(studentsToAdd) : studentsToAdd;

        // @ts-ignore
        uni.students = all;
        await uni.save();
        return newResponse('Sacuvani su novi studenti');

    } catch(e: any) {
        throw e;
    }
}

export const addProfessors = async (uniId: string, professorsToAdd: any[]) => {
    try {
        const uni = await University.findOne({_id: uniId});
        if (!uni) throw newError(404, 'Ne postoji fakultet sa tim ID-em');

        let all= [];
        all = uni.professors ? uni.professors.concat(professorsToAdd) : professorsToAdd;

        uni.students = all;
        await uni.save();
        return newResponse('Sacuvani su novi profesori');
    } catch(e: any) {
        throw e;
    }
}

export const addServices = async (uniId: string, servicesToAdd: any[]) => {
    try {
        const uni = await University.findOne({_id: uniId});
        if (!uni) throw newError(404, 'Ne postoji fakultet sa tim ID-em');
        let all = [];
        all = uni.services ? uni.services.concat(servicesToAdd) : servicesToAdd;

        uni.students = all;
        await uni.save();
    } catch(e: any) {
        throw e;
    }
}



export const deleteUniversity = (uniId: string) => {
    try {
    //     TODO Should add to bulk remove every student/service/professor on university
    } catch(e: any) {
        throw e;
    }
}

export const editUniversity = (uniId: string, university: UniDocument) => {
    try {
    //     TODO finish edit university
    } catch(e: any) {
        throw e;
    }
}

