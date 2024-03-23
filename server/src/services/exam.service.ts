import Exam, { ExamDocument } from "../models/exam.model";
import Subject from "../models/subject.model";
import { newError, newResponse } from "../utils"


export const addExam = async (data: ExamDocument) => {
    
    let subject = await Subject.findOne({_id: data.subject});
    if(!subject) return newError(404, 'Predmet nije pronađen');

    let newExam = new Exam(data);

    let saved = await newExam.save();

    if(!saved) return newError(500, 'Internal Server Error');

    return newResponse('Ispitni rok je sačuvan');
}

export const getExam = async (_id: string) => {
    
    let exam = await Exam.findOne({_id});
    if(!exam) return newError(404, 'Ispitni rok nije pronađen');

    return exam;
}

export const getExams = async () => {
    let exams = await Exam.find();

    return exams;
}

export const updateExam = async (_id: string, data: any) => {
    let depObj = await Exam.findOne({ _id });

    if(!depObj) throw newError(404, 'Greška prilikom pristupanja!');

    let updated = await Exam.updateOne({ _id }, {
        $set: {
            ...data
        }
    })

    if(!updated) throw newError(500, 'Internal Server Error');

    return newResponse('Ispitni rok uspešno ažuriran');
}