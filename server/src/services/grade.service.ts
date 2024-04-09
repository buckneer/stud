import Subject from "../models/subject.model";
import Grade, { GradeDocument } from "../models/grade.model";
import { newError, newResponse } from "../utils";
import Professor from "../models/professor.model";
import Service from "../models/service.model";
import Student from "../models/student.model";
import { Model } from 'mongoose';
import Exam from "../models/exam.model";
import Period from "../models/period.model";
import {updateExam} from "./exam.service";

export const addGrade = async (user: string, data: GradeDocument) => {
    // let subject = await Subject.findOne({_id: data.subject});
    // if (!subject) return newError(404, 'Predmet ne postoji');

    let professor = await Professor.findOne({user});
    if(!professor) return newError(404, 'Profesor ne postoji');

    data.professor = professor._id.toString();

    let exam = await Exam.findOne({_id: data.exam});
    if(!exam) throw newError(404, 'Ispit ne postoji');

    let newGrade = new Grade(data);
    let resp = await newGrade.save();

    let saved = [...exam.grades!, resp._id];

    await updateExam(exam._id, {grades: saved});

    // let service = await Service.findOne({_id: data.service});
    // if(!service) return newError(404, 'Studentska služba ne postoji');

    // let student = await Student.findOne({_id: data.student});
    // if(!student) return newError(404, 'Student ne postoji');

    if(!resp) return newError(500, 'Internal Server Error');

    return newResponse('Nova ocena je kreirana');
}

export const getGrade = async (_id: string) => {
    let grade = await Grade.findOne({_id});
    if(!grade) return newError(404, 'Ocena nije pronadjena');

    return grade;
}

export const getGrades = async () => {
    let grades = await Grade.find();
    if(!grades) return newError(404, 'Ocena nije pronadjena');

    return grades;
}

export const updateGrade = async (_id: string, data: any) => {
    let grade = Grade.findOne({_id});
    if(!grade) return newError(404, 'Ocena nije pronadjena');

    let updated = await Grade.updateOne({_id}, {
        $set: {
            ...data
        }
    });

    if(!updated) throw newError(500, 'Internal Server Error');

    return newResponse('Uspešno ažuriranje ocene');
}

export const getGradesByRole = async (_id: string, ModelParam: Model<any>, confirmed: boolean = true) => {
    const collectionObj = {
        students: 'student',
        professors: 'professor',
        services: 'service'
    };

    let userRole = await ModelParam.find({ _id });

    if(!userRole) throw newError(404, 'Greška prilikom pristupanja ocenama!');

    // @ts-ignore
    const role = collectionObj[ModelParam.collection.name];

    if(!role) throw newError(404, 'Greška prilikom pristupanja ocenama!');

    return Grade.find({
        [role]: _id,
        confirmed
    }).populate({
        path: 'professor subject service student',
        select: '_id name'
    });
}

// TODO: maybe add subject progress...
export const getStats = async (user: string, university: string) => {
    let student = await Student.findOne({ user, university });

    if(!student) throw newError(400, 'Ne postoji student!');

    let grades = await Grade.find({ student }, { serviceGrade: 1, _id: 0 });
    let examCount = await Exam.count({ students: student._id, ended: true });
    let subjects = await Subject.find({ _id: student.completedSubjects }, { espb: 1 });

    let espb = 0;
    let passed = subjects.length;
    let failed = grades.length - passed;
    let average = 0;

    let gradesNum = [
        { grade: 6, count: 0 },
        { grade: 7, count: 0 },
        { grade: 8, count: 0 },
        { grade: 9, count: 0 },
        { grade: 10, count: 0 },
    ];

    subjects.forEach((sub) => espb += sub.espb);

    grades.forEach((grade: any) => {
        if(grade.serviceGrade > 5) {
            gradesNum[grade.serviceGrade - 6].count++;
        }
    });


    average = parseFloat((average / grades.length).toFixed(2)) || 0;

    return { average, passed, failed, examCount, gradesNum, espb }
}

