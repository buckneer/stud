// TODO: Proveri da li postoji profesor na univerzitetu, ako ne postoji dodaj ga...

import Professor, { ProfessorDocument } from "../models/professor.model";
import Student from "../models/student.model";
import Subject from "../models/subject.model";
import University from "../models/university.model";
import { newError, newResponse } from "../utils";

export const addProfessor = async (_id: string, professor: ProfessorDocument) => {
    try {
        let universityObj = await University.findOne({ _id });

        if(!universityObj) throw newError(404, 'Greška prilikom pristupanja!');

        let newProfessor = new Professor (professor);

        let added = await newProfessor.save();

        if(!added) throw newError(500, 'Internal Server Error');

        return {id: added._id};
    } catch (e: any) {
        throw e;
    }
}

export const getProfessor = async (_id: string, university: string) => {
    try {
        // admin and in uni check here

        let professorObj = await Professor.findOne({ _id, university });

        if(!professorObj) throw newError(404, 'Greška prilikom pristupanja!');

        return professorObj;
    } catch (e: any) {
        throw e;
    }
}

export const getProfessors = async (university: string = '') => {
    try {
        let query = university ? { university } : {};
        let professorsObj = await Professor.find(query).populate('user');

        return professorsObj;

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

export const addSubjectToProfessors = async (_id: string, professors: string[]) => {
    let subject = await Subject.findOne({ _id });

    if (!subject) throw newError(404, 'Ne postoji predmet!');

    await Professor.updateMany({ _id: professors }, {
        $addToSet: { subjects: _id }
    });

    return newResponse('Uspešno dodavanje predmeta profesorima!', 200);
}

export const giveSign = async (_id: string, professor: string, students: string[]) => {
    let professorObj = await Professor.findOne({ user: professor });


    if(!professorObj) throw newError(404, 'Ne postoji profesor!');
    console.log(professorObj._id);
    let studentsObj = await Student.find({ _id:  students, subjects: _id });

    if(!studentsObj.length) throw newError(400, 'Niste dodali studente!');

    let subject = await Subject.findOne({ _id });

    if(!subject) throw newError(404, 'Ne postoji predmet!');

    await Student.updateMany({ _id: students }, {
        $addToSet: { signs: _id }
    });

    return newResponse('Uspešno ste dali potpis!');
}

export const addUniToProfessor = async (_id: string, uni: string) => {
    let uniObj = await University.findOne({ _id: uni });

    if(!uniObj) throw newError(404, 'Univerzitet ne postoji!');

    let professor = await Professor.findOneAndUpdate({ _id }, { $set: {
        university: uni
    }});

    if(!professor) throw newError(404, 'Profesor ne postoji!');

    return newResponse('Uspešno ste dodali univerzitet profesoru!', 200, { id: professor._id });
}
