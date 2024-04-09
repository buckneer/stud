import Subject, {SubjectDocument} from "../models/subject.model"
import {newError, newResponse} from "../utils";
import Department from "../models/department.model";
import Professor from "../models/professor.model";
import Optional from "../models/optional.model";
import User from "../models/user.model";
import Student from "../models/student.model";
import Period from "../models/period.model";


export const addSubject = async (depId: string, data: SubjectDocument) => {

    const department = await Department.findOne({_id: depId});

    if(!department) throw newError(404, 'Izabrani smer ne postoji');

    // const professors = await Professor.find({'_id': {$in: data.professors}});

    const newSubject = new Subject(data);
    await newSubject.save();

    return newResponse('Novi predmet kreiran', 200, { id: newSubject._id });
}

export const getSubject = async (_id: string) => {
    let subject = await Subject.findById(_id);

    return subject;
}

export const getSubjects = async (key?: string, value?: string) => {

    let subjects: any[];
    console.log(key, value);
    let popQuery = {
        path: 'professors',
        populate: {
            path: 'user',
            select: 'name'
        }
    }
    if(key) {
        let field = key === 'university' ? { university: value } : { department: value }
        subjects = await Subject.find(field).populate(popQuery);
    } else {
        subjects = await Subject.find().populate(popQuery);
    }

    return subjects;
}

export const getAvailableReqSubjects = async (university: string, department: string, semester: string) => {
    // remove R here if it is not needed... same goes for parseInt shit...
    // it is there because required subject by default is two semesters (1 year) behind
    return Subject.find({
        university, department, type: 'R',
        semester: {$lt: semester}
    });
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

export const addProfessorToSubjects = async (_id: string, subjects: string[]) => {
    let professor = await Professor.findOne({ _id });

    if(!professor) throw newError(404, 'Profesor ne postoji!');

    let updated = await Subject.updateMany({ _id: subjects }, {
        $addToSet: {
            professors: _id
        }
    });

    if(!updated) throw newError();

    return newResponse('Uspešno ste dodali profesora na predmete');
}

export const getSubjectRole = async (_id: string, role: string) => {
    let include = (role === 'student') ? 'students' : 'professors';

    let subject: any = await Subject.findOne({ _id }, { [include]: 1 }).populate(include);

    if(!subject) throw newError(404, 'Ne postoji predmet!');

    return subject[include];
}

export const getProfessorSubjects = async (_id: string, uni: string) => {

    let professor = await Professor.findOne({user: _id});
    if(!professor) throw newError(404, 'Profesor nije pronađen');

    return Subject.find({professors: professor._id, university: uni});
}


export const addSubjectsToOptional = async (_id: string, subjects: string[], uni: string) => {
    let optional = await Optional.findOne({ _id, university: uni });

    if(!optional) throw newError(404, 'Ne postoji izborni blok!');

    let subjectsObj = await Subject.find({ _id: subjects, type: 'O' });

    if(subjectsObj.length !== subjects.length) throw newError(400, 'Ne postoje predmeti!');

    let isEveryValid = subjectsObj.every((e: any) => {
        return (
            e.semester === subjectsObj[0].semester
            && e.department === subjectsObj[0].department
        )
    });

    if(!isEveryValid) throw newError(400, 'Izborni predmeti se moraju slušati u istom semestru!')

    await optional.updateOne({
        $addToSet: { subjects }
    });

    return newResponse('Uspešno ste dodali predmet na blok!', 200);
}

export const getEnrollableSubjects = async (user: string | undefined, university: string, department: string) => {
    let student = await Student.findOne({ user, university, department });

    if(!student) throw newError(404, 'Ne postoji student!');


    let { completedSubjects, subjects, currentSemester, degree } = student;
    console.log(completedSubjects);
    console.log(subjects);
    let subjectObj = await Subject.find({
        department, university,
        degree,
        // @ts-ignore
        _id: { $nin: [ ...completedSubjects, ...subjects ]},
        semester: {$lte: currentSemester! + 1} // TODO +1 Quick fix!
    }).populate({
        path: 'professors',
        select: 'user',
        populate: {
            path: 'user',
            select: 'name'
        }
    });

    return subjectObj;
}

export const getOptionalSubjects = async (user: string | undefined, university: string, department: string) => {
    let student = await Student.findOne({ user, university, department });

    if(!student) throw newError(404, 'Ne postoji student!');

    let { completedSubjects, subjects, currentSemester, degree } = student;

    let subjectObj = await Optional.find({
        department, university,
        degree,
        // @ts-ignore
        _id: { $nin: [ ...completedSubjects, ...subjects ]},
        semester: {$lte: currentSemester}
    }).populate({
        path: 'subjects',
        populate: {
            path: 'professors',
            select: 'user',
            populate: {
                path: 'user',
                select: 'name'
            }
        }
    });

    return subjectObj;
}

export const getAvailableOptionalSubjects = async (university: string, department: string, semester: string | number, degree: string) => {
    let depObj = await Department.findOne({ _id: department, university });

    if(!depObj) throw newError(404, 'Ne postoji odsek!');

    return Subject.find({ university, department, semester, degree, type: 'O' });
}

export const getSubjectsForExam = async (_id: string, uni: string) => {
    let period = await Period.findOne({_id, university: uni});
    if(!period) throw newError(404, 'Ne postoji ispitni rok');

    let query : any;
    // @ts-ignore
    switch (parseInt(period!.semester)) {
    	case 0:
    		query = {university: uni};
    		break;
    	case 1:
    		query = {university: uni, semester: {$mod: [2, 0]}};

    		break;
    	case 2:
    		query = {university: uni, semester: {$mod: [2, 1]}};
    		break;
    }


    // Exclude already added?
    // let excludedSubjectIds = await Exam.find({university: uni}).distinct('subject');
    // query.subject = {$nin: excludedSubjectIds};

    let subjects = await Subject.find(query).populate({
        path: 'professors',
        select: 'user',
        populate: {
            path: 'user',
            select: 'name'
        }
    });

    if(subjects.length === 0) throw newError(404, 'Predmeti ne postoje');

    return subjects;
}
