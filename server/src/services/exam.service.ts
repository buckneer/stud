import Exam, { ExamDocument } from "../models/exam.model";
import Period from "../models/period.model";
import Student from "../models/student.model";
import Subject from "../models/subject.model";
import University from "../models/university.model";
import { newError, newResponse } from "../utils"


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

// aggregate needs to be done here...
// status ? passed -> get all grades where student_id = student && grade > 5
// status ? failed -> get all grades where student_id = student && grade ===  5
// status ? tbd -> get all exams where ended = false

export const getStudentExams = async (_id: string, status: string) => {
    let student = await Student.findOne({ _id });

    if(!student) throw newError(404, 'Student ne postoji');

    return 'Implement me!';
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

