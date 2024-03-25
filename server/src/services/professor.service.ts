// TODO: Proveri da li postoji profesor na univerzitetu, ako ne postoji dodaj ga...

import Professor, { ProfessorDocument } from "../models/professor.model";
import University from "../models/university.model";
import { newError, newResponse } from "../utils";

export const addProfessor = async (university: string, professor: ProfessorDocument) => {
    try {
        let universityObj = await University.findOne({ _id: university });
       
        if(!universityObj) throw newError(404, 'Greška prilikom pristupanja!');

        let newProfessor = new Professor (professor);

        let added = await newProfessor.save();

        if(!added) throw newError(500, 'Internal Server Error');
        
        return {id: added._id};
    } catch (e: any) {
        throw e;
    }
}

export const getProfessor = async (professor: string) => {
    try {
        // admin and in uni check here

        let professorObj = await Professor.findOne({ _id: professor });

        if(!professor) throw newError(404, 'Greška prilikom pristupanja!');

        return professorObj;
    } catch (e: any) {
        throw e;
    }
}

export const getProfessors = async (university: string = '') => {
    try {
        let query = university ? { universities: university } : {};
        let professorsObj = await Professor.find(query);

        return professorsObj || {};

    } catch (e: any) {
        throw e;
    }
}

export const updateProfessor = async (professor: string, data: ProfessorDocument) => {
    try {
        let professorObj = await Professor.findOne({ _id: professor });

        if(!professorObj) throw newError(404, 'Greška prilikom pristupanja!');

        let updated = await Professor.updateOne({ _id: professorObj._id }, { 
            $set: {
                ...data
            }
        });

        if(!updated) throw newError(500, 'Internal Server Error');

        return newResponse('Uspešno menjanje profesora!');

    } catch (e: any) {
        throw e;
    }
}

export const addSubjectsToProfessor = async (_id: string, subjects: string[]) => {
    let professorObj = await Professor.findOne({ _id });

    if(!professorObj) throw newError(404, 'Ne postoji profesor sa tim id-em');

    // @ts-ignore
    professorObj.subjects = [ ...professorObj.subjects, ...subjects ];
    
    let updated = await professorObj.save();
    if(!updated) throw newError();

    return newResponse('Uspešno ste dodali predemete profesoru!');
}

export const removeSubjectsFromProfessor = async (_id: string, subjects: string[]) => {
    let professorObj = await Professor.findOne({ _id });

    if(!professorObj) throw newError(404, 'Ne postoji profesor sa tim id-em');

    // @ts-ignore 
    professorObj.subjects = professorObj.subjects?.filter(subject => subjects.indexOf(subject) === -1);

    let updated = await professorObj.save();
    if(!updated) throw newError();

    return newResponse('Uspešno ste uklonili predmete iz profesora');
}

export const addGradesToProfessor = async (_id: string, grades: string[]) => {
    let professorObj = await Professor.findOne({ _id });

    if(!professorObj) throw newError(404, 'Ne postoji profesor sa tim id-em');

    // @ts-ignore
    professorObj.grades = [ ...professorObj.grades, ...grades ];

    let updated = await professorObj.save();
    if(!updated) throw newError();

    return newResponse('Uspešno ste dodali ocene profesoru!');
}

export const removeGradesFromProfessor = async (_id: string, grades: string[]) => {
    let professorObj = await Professor.findOne({ _id });

    if(!professorObj) throw newError(404, 'Ne postoji profesor sa tim id-em');

    // @ts-ignore 
    professorObj.subjects = professorObj.subjects?.filter(subject => subjects.indexOf(subject) === -1);

    let updated = await professorObj.save();
    if(!updated) throw newError();

    return newResponse('Uspešno ste uklonili predmete iz profesora');
}