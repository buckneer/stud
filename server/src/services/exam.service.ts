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

    let exam = await Exam.findOne({_id});
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
        const withGrades = allExams.filter(exam => exam.grades!.length > 0);
        if (status === 'passed') {
            exams = withGrades.filter(exam => {
                // TODO maybe remove professorGrade later on
                //@ts-ignore
                exam.grades = exam.grades!.filter(grade => grade.professorGrade !== 5 && grade.serviceGrade !== 5);
                return exam.grades!.length > 0;
            });
        } else {
            exams = withGrades.filter(exam => {
                // @ts-ignore
                exam.grades = exam.grades!.filter(grade => grade.professorGrade === 5); // Using as any for quick fix
                return exam.grades!.length > 0;
            });
        }
    }

    return exams;
}

export const getPendingExamsProfessor = async (_id: string, period: string) => {
    let professor = await Professor.findOne({user: _id});

    if (!professor) throw newError(404, "Profesor ne postoji");

    // return Exam.find({professor: professor._id, grades: [], period});
    return Exam.find({professor: professor._id, grades: []});
}


export const addStudentToExams = async (_id: string, exams: String[]) => {

    await Exam.updateMany({_id: {"$in": exams}}, {$push: {students: _id}});

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

