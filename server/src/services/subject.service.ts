import University from "../models/university.model";
import Subject, { SubjectDocument } from "../models/subject.model"
import { newError, newResponse } from "../utils";
import Department from "../models/department.model";
import Professor from "../models/professor.model";


export const addSubject = async (depId: string, data: SubjectDocument) => {
    
    const department = await Department.findOne({_id: depId});

    if(!department) throw newError(404, 'Izabrani smer ne postoji');
    
    // const professors = await Professor.find({'_id': {$in: data.professors}});

    const newSubject = new Subject(data);
    await newSubject.save();

    return newResponse('Novi predmet kreiran');
}

export const getSubject = async (_id: string) => {
    let subject = await Subject.findById(_id);

    return subject;
}

export const getSubjects = async (department?: string) => {
    
    let subjects: any;
    if(department) {
        subjects = await Subject.find({ department })
    } else {
        subjects = await Subject.find();
    }

    if(!subjects) throw newError(404, 'Ni jedan predmet nije pronadjen');

    return subjects;
}

export const updateSubject = async (_id: string, data: SubjectDocument) => {
   let subject = Subject.findOne({_id});

    if(!subject) throw newError(404, 'Predmet nije pronadjen');

    let update = await Subject.updateOne({_id}, {
        $set: {
            ...data
        }
    })

    if(!update) throw newError(500, 'Internal Server Error');

    return newResponse('Uspešno menjanje predmeta!');
}