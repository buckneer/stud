import Exam, {ExamDocument} from "../models/exam.model";
import Period from "../models/period.model";
import Student from "../models/student.model";
import Subject from "../models/subject.model";
import University from "../models/university.model";
import {newError, newResponse} from "../utils"
import Professor from "../models/professor.model";
import Department from "../models/department.model";


export const addExam = async (data: ExamDocument) => {
    let period = await Period.findOne({ _id: data.period });
    if(!period) throw newError(404, 'Ne postoji ispitni rok');

    const currentDate = new Date();
	const utcDate = new Date(currentDate.toISOString());
    
    const examDate = new Date(new Date(data.date!).toISOString());
    const startDate = new Date(new Date(period.start!).toISOString());
    const endDate = new Date(new Date(period.end!).toISOString());
    const acceptDate = new Date(new Date(period.acceptDate!).toISOString());
    
    if(utcDate > acceptDate) throw newError(400, 'Ne možete dodati ispit nakon isteka roka za prijavu!');
    if(examDate < startDate || endDate < examDate) throw newError(400, 'Datum ispita mora biti u roku!'); 
    if(examDate < utcDate) throw newError(400, 'Datum ne sme biti u prošlosti!');

    let subject = await Subject.findOne({_id: data.subject});
    if(!subject) return newError(404, 'Predmet nije pronađen');

    let alreadyExists = await Exam.findOne({ period: data.period, subject: subject._id, professor: data.professor });

    if(alreadyExists) throw newError(409, 'Već postoji ispit!');

    let newExam = new Exam(data);
    let saved = await newExam.save();

    if(!saved) return newError(500, 'Internal Server Error');

    await Period.updateOne({ _id: data.period }, {
        $addToSet: { exams: saved._id }
    });
    return newResponse('Ispit je sačuvan');
}

export const getExam = async (_id: string) => {
    let exam = await Exam.findOne({ _id }).populate({
        path: 'period'
    }).populate({
        path: 'department'
    });
    if(!exam) return newError(404, 'Ispit nije pronađen');

    return exam;
}

export const getExams = async (university: string, period: string) => {
    let exams = await Exam.find({ university, period }).populate({
        path: 'professor',
        select: 'user',
        populate: {
            path: 'user',
            select: 'name'
        }
    }).populate({
        path: 'subject',
        select: 'name code'
    }).sort({ code: 1 });

    return exams;
}

export const updateExam = async (_id: string, data: any) => {
    let examObj = await Exam.findOne({ _id });

    if(!examObj) throw newError(404, 'Greška prilikom pristupanja!');

    let period = await Period.findOne({ exams: _id });

    if(!period) throw newError(404, 'Ispitni rok ne postoji!');

    const currentDate = new Date();
	const utcDate = new Date(currentDate.toISOString());

    const examDate = new Date(new Date(data.date!).toISOString());
    const startDate = new Date(new Date(period.start!).toISOString());
    const endDate = new Date(new Date(period.end!).toISOString());
    const acceptDate = new Date(new Date(period.acceptDate!).toISOString());
    
    if(currentDate > acceptDate) throw newError(400, 'Ne možete dodati ispit nakon isteka roka za prijavu!');
    if(examDate < startDate || endDate < examDate) throw newError(400, 'Datum ispita mora biti u roku!'); 
    if(examDate < currentDate) throw newError(400, 'Datum ne sme biti u prošlosti!');


    let updated = await Exam.updateOne({ _id }, {
        $set: {
            professor: data.professor,
            date: data.date
        }
    });

    if(!updated) throw newError(500, 'Internal Server Error');

    return newResponse('Ispit uspešno ažuriran');
}

export const getUniExams = async (_id: string) => {
    let university = await University.findOne({ _id });

    if(!university) throw newError(404, 'Ne postoji univerzitet!');

    let exams = await Exam.find({ university: _id });

    return exams;
}

export const getGradesByExam = async (_id: string) => {
    let exam = await Exam.findOne({ _id }).populate({
        path: 'grades',
        populate: {
            path: 'subject professor service' //, may not work...
        }
    });

    if(!exam) throw newError(404, 'Ne postoji ispit!');

    return exam;
}

export const getStudentExams = async (_id: string, status: string) => {
    let student = await Student.findOne({ _id });

    if(!student) throw newError(404, 'Student ne postoji');
    // Students 0 - because student can't know who else is on the exam
    let allExams = await Exam.find({students: {$in: _id}}, {students: 0})
        .populate({
            path: "grades",
            match: {student: _id}
        });

    let exams: ExamDocument[] = [];
    if(status == 'tbd') {
        exams = allExams.filter(exam => exam.grades!.length == 0);
    } else {
        const filteredExams = allExams.filter(exam => exam.grades!.length > 0);
        exams = filteredExams.filter(exam => {
            if (status === 'passed') {
                //@ts-ignore
                exam.grades = exam.grades!.filter(grade => grade.professorGrade !== 5 && grade.serviceGrade !== 5);
            } else {
                //@ts-ignore
                exam.grades = exam.grades!.filter(grade => grade.professorGrade === 5);
            }
            return exam.grades!.length > 0;
        });
    }

    return exams;
}

export const getPendingExamsProfessor = async (_id: string, period: string) => {
    let professor = await Professor.findOne({user: _id});

    if (!professor) throw newError(404, "Profesor ne postoji");

    // return Exam.find({professor: professor._id, grades: [], period});
    return Exam.find({professor: professor._id, grades: []});
}


export const examsCanAdd = async (_id: string, uni: string) => {
    // TODO filter by period!
    const exams = await Exam.find({ university: uni }).populate({
        path: 'professor',
        select: 'user',
        populate: {
            path: 'user',
            select: 'name'
        }
    }).populate('subject');
    console.log(exams);

    const filteredExams = await Promise.all(exams.map(async (exam) => {
        return await canAddExam(_id, exam.subject!._id.toString(), exam._id.toString());
    }));

    const filteredResults = exams.filter((exam, index) => filteredExams[index]);



    return filteredResults;
}


export const addStudentToExams = async (_id: string, exams: String[]) => {
    // TODO test this!!
    const student = await Student.findOne({user: _id});
    if(!student) throw newError(404, 'Student nije pronađen');

    let dep = await Department.findOne({_id: student.department});
    if(!dep) throw newError(404, 'Odsek nije pronađen')

    const canAdd = await examsCanAdd(_id, dep.university!.toString());
    const canAddIds = canAdd.map(subj => subj._id.toString());

    const filterAdd = exams.filter(exam => canAddIds.includes(exam));


    await Exam.updateMany({_id: {"$in": filterAdd}}, {$addToSet: {students: student._id}});

    return filterAdd;
}


export const canAddExam = async (userId: string, subjectId: string, exam?: string) => {
    const student = await Student.findOne({user: userId});
    if(!student) throw newError(404, 'Student nije pronađen');

    const subject = await Subject.findOne({_id: subjectId});
    if(!subject) throw newError(404, 'Predmet nije pronađen');

    let signed = student.signs!.map(sign => sign.toString());
    if(!signed.includes(subjectId)) return false;

    if(exam) {
        let targetExam = await Exam.findOne({_id: exam});
        console.log(targetExam);
        if(!targetExam) return false;
        let students = targetExam.students!.map(item => item.toString());
        if(students.includes(student._id.toString())) return false;
    }

    // TODO implement semester later!

    if(!student.subjects) return false;
    const studentSubjects = student.subjects.map(subj => subj.toString());

    if(!studentSubjects.includes(subjectId)) return false;

    const required = subject.requiredSub!.map(subj => subj.toString());

    if(required.length === 0) return true;

    const completed = student.completedSubjects!.map(subj => subj.toString());

    return required.every(requiredSub => completed.includes(requiredSub));
}

export const getExamSubject = async (user: string, period: string, sub: string)=> {
    let professor = await Professor.findOne({user});
    if(!professor) throw newError(404, 'Profesor ne postoji');
    let exam = await Exam.findOne({
        professor: professor._id,
        period: period, subject: sub })
        .populate({
            path: 'students',
            populate: {
                path: 'user',
                select: 'name'
            }
        }).populate('grades');

    // grades.student!

    // let exist = exam.grades.

    if(!exam) throw newError(404, 'Ispit ne postoji');

    return exam;
}

// export const updateStudents = async (_id: string, data: any) => {
//     let examObject = await Exam.findOne({ _id });

//     if(!examObject) throw newError(404, 'Ispit nije pronadjen');

//     let newStudents = [...examObject.students!, ...data];

//     examObject['students'] = newStudents;

//     let result = await examObject.save();

//     if(!result) throw newError(500, 'Internal Server Error');

//     return newResponse('Ispit je ažuriran');
// }


// export const updateGrades = async (_id: string, data: any) => {
//     let examObject = await Exam.findOne({ _id });

//     if(!examObject) throw newError(404, 'Ispit nije pronadjen');

//     let newGrades = [...examObject.grades!, ...data];

//     examObject.grades = newGrades;

//     let result = await examObject.save();

//     if(!result) throw newError(500, 'Internal Server Error');

//     return newResponse('Ispit je ažuriran');
// }

