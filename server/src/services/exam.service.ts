import Exam, {ExamDocument} from "../models/exam.model";
import Period from "../models/period.model";
import Student from "../models/student.model";
import Subject from "../models/subject.model";
import University from "../models/university.model";
import {newError, newResponse} from "../utils"
import Professor from "../models/professor.model";


export const addExam = async (data: ExamDocument) => {
    // let date = new Date();
    // TODO: check if period is in future
    let period = await Period.findOne({ _id: data.period });

    let subject = await Subject.findOne({_id: data.subject});
    if(!subject) return newError(404, 'Predmet nije pronađen');

    let newExam = new Exam(data);


    let saved = await newExam.save();

    if(!saved) return newError(500, 'Internal Server Error');

    return newResponse('Ispit je sačuvan');
}

export const getExam = async (_id: string) => {
    let exam = await Exam.findOne({_id}).populate('period');
    if(!exam) return newError(404, 'Ispit nije pronađen');

    return exam;
}

export const getExams = async () => {
    let exams = await Exam.find();

    return exams;
}

export const updateExam = async (_id: string, data: any) => {
    let examObj = await Exam.findOne({ _id });

    if(!examObj) throw newError(404, 'Greška prilikom pristupanja!');

    let updated = await Exam.updateOne({ _id }, {
        $set: {
            ...data
        }
    })

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


export const examsCanAdd = async (_id: string) => {
    // TODO filter by period!
    // TODO test!
    const exams = await Exam.find({}).populate('professor subject');


    const filteredExams = await Promise.all(exams.map(async (exam) => {
        return await canAddExam(_id, exam.subject!.toString());
    }));

    const filteredResults = exams.filter((exam, index) => filteredExams[index]);

    return filteredResults;
}


export const addStudentToExams = async (_id: string, exams: String[]) => {
    // TODO test this!!
    const student = await Student.findOne({user: _id});
    if(!student) throw newError(404, 'Student nije pronađen');

    let notAdded = [];

    const canAdd = await examsCanAdd(_id);
    const canAddIds = canAdd.map(subj => subj._id.toString());

    const filterAdd = exams.filter(exam => canAddIds.includes(exam));

    return filterAdd;
    // TODO update with exams that can actually add, this now accepts all that is offered (kinda greedy tbh)
    // await Exam.updateMany({_id: {"$in": filterAdd}}, {$push: {students: _id}});

}

export const canAddExam = async (userId: string, subjectId: string, semester?: number) => {
    const student = await Student.findOne({user: userId});
    if(!student) throw newError(404, 'Student nije pronađen');

    const subject = await Subject.findOne({_id: subjectId});
    if(!subject) throw newError(404, 'Predmet nije pronađen');

    // TODO implement semester later!

    if(!student.subjects) return false;
    const studentSubjects = student.subjects.map(subj => subj.toString());

    if(!studentSubjects.includes(subjectId)) return false;

    const required = subject.requiredSub!.map(subj => subj.toString());

    if(required.length === 0) return true;

    const completed = student.completedSubjects!.map(subj => subj.toString());

    return required.every(requiredSub => completed.includes(requiredSub));
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

