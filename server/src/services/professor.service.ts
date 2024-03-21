import Professor, { ProfessorDocument } from "models/professor.model";
import University from "models/university.model";
import { newError, newResponse } from "utils";

export const addProfessor = async (university: string, professor: ProfessorDocument, user: string) => {
    try {
        let universityObj = await University.findOne({ _id: university });
       
        if(!universityObj) throw newError(404, 'Greška prilikom pristupanja!');

        let newProfessor = new Professor ({
            ...professor,
            user
        });

        let added = await newProfessor.save();

        if(!added) throw newError(500, 'Internal Server Error');

        return {
            status: 200,
            message: `Korisnik sa ID-em '${user}' je dodat kao profesor`,
            _id: added._id
        }
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

export const getProfessors = async (university: string) => {
    try {
        let professorsObj = await Professor.find({ universities: { $has: university }});

        return professorsObj || {};

    } catch (e: any) {
        throw e;
    }
}

export const editProfessor = async (professor: string, data: ProfessorDocument) => {
    try {
        let professorObj = await Professor.findOne({ _id: professor });

        if(!professorObj) throw newError(404, 'Greška prilikom pristupanja!');

        let edited = await Professor.updateOne({ _id: professorObj._id }, { 
            $set: {
                ...data
            }
        });

        if(!edited) throw newError(500, 'Internal Server Error');

        return newResponse('Uspešno menjanje profesora!');

    } catch (e: any) {
        throw e;
    }
}