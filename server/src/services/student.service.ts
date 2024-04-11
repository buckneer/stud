import {Types} from "mongoose";
import Student, {StudentDocument} from "../models/student.model";
import User from "../models/user.model";
import {randomBytes} from 'crypto';
import {newError, newResponse} from "../utils";
import University from "../models/university.model";
import Department from '../models/department.model';
import Subject from "../models/subject.model";
import Grade from "../models/grade.model";

export const addStudent = async (student: StudentDocument, university: string) => {

    console.log(student);

    // TODO check if the user with same Id is already registered as student

    let newStudent = new Student(student);
    let user = await User.findOne({ _id: student.user });


    if(!user) throw newError(404, 'Korisnik nije pronađen!');

    newStudent.user = user._id;
    newStudent.modelNum = randomBytes(4).toString('hex');
    let saved = await newStudent.save();

    if(!saved) throw newError(500, 'Internal Server Error');

    return newResponse('Novi Student je kreiran', 200, { id: saved._id });

}

export const getStudents = async (university: string = '') => {
    let query = university ?  { universities: university } : {};
    // TODO: we dont have university in students
    // TODO omit password and code from the results
    let department = await Department.find({ university });

    let students = await Student.find({ department }).populate('user');

    return students;
}

export const getStudent = async (_id: string) => {

    if(!Types.ObjectId.isValid(_id)) throw newError(400, 'Id nije validan');

    let student = await  Student.findOne({ _id }).populate('user');
    if(!student) throw newError(404, 'Ne postoji student sa tim id-em');

    return student;
}

export const getStudentByUser = async (user: string, university: string) => {
    let student = await Student.findOne({ user, university }).populate('user');

    if(!student) throw newError(404, 'Ne postoji student!');

    return student;
}

export const updateStudent = async (studentId: string, student: StudentDocument) => {
    // TODO implmenet update student;
}

export const deleteStudent = async (_id: string) => {
    let deleted = await Student.findByIdAndDelete(_id);
    console.log(deleted);
    return deleted;
}

export const getStudentsBySemester = async (_id: string, sem: any) => {
    let university = await University.findOne({ _id });

    if(!university) throw newError(404, 'Ne postoji univerzitet!');

    let students = await Student.find({ university: _id, currentSemester: sem });

    return students;
}

export const getStudentsByDepartment = async (_id: string) => {
    let department = Department.findOne({ _id });

    if(!department) throw newError(404, 'Ne postoji odsek!');

    return Student.find({ department: _id });
}

export const getStudentsBySubject = async (_id: string) => {
    const subject = await Subject.find({_id});
    if(!subject) throw newError(404, 'Predmet ne postoji');

    return Student.find({subjects: _id, signs: { $nin: [_id] } }).populate({
        path: 'user',
        select: 'name email'
    });
}


export const addSubjectsToStudent = async (_id: string, subjects: string[], uni: string) => {
    let student = await Student.findOne({user: _id, university: uni});
    if(!student) throw newError(404, 'Student ne postoji!');
    let enrolledSemester = student.currentSemester!;

    // TODO handle differently
    let availableSubj = await Subject.find({_id: subjects});
    if(availableSubj.length !== subjects.length) throw newError(404, 'Predmeti ne postoje');

    // let enrollable = availableSubj.filter(subj => subj.semester == enrolledSemester)
    // console.log(availableSubj);
    let update = await Student.updateOne({user:_id}, {
        $addToSet: {subjects: availableSubj}
    });
    return newResponse('Predmeti su sačuvani');
}
// 22.04. 12h
export const getStudentSubjects = async (user: string, university: string) => {
    let student = await Student.findOne({ user, university }, { _id: 1 }).populate({
        path: 'subjects completedSubjects',
    });

    if(!student) throw newError(404, 'Ne postoji student');

    let { subjects, completedSubjects } = student;

    let grades = await Grade.find({ subject: completedSubjects, student: student._id }, { serviceGrade: 1});

    // @ts-ignore
    completedSubjects = completedSubjects.map((sub, index) => sub.grade = grades[index]);

    return {
        student: student._id,
        subjects,
        completedSubjects
    }
}   
// export const addStudentToSubjects = async (_id: string, subjects: string[]) => {
//     let studentObj = await Student.findOne({ _id });

//     if(!studentObj) throw newError(404, 'Ne postoji student sa tim id-em');

//     // TODO:
//     // - add check if student already has such subjects in his array
//     // - add check if every subjects exist on the department that student is rolled in

//     // @ts-ignore
//     studentObj.subjects = [ ...studentObj.subjects, ...subjects ];

//     let updated = await studentObj.save();
//     if(!updated) throw newError();

//     return newResponse('Uspešno dodavanje predmeta studentu!');
// }

// export const removeStudentFromSubjects = async (_id: string, subjects: string[]) => {
//     let studentObj = await Student.findOne({ _id });

//     if(!studentObj) throw newError(404, 'Ne postoji student sa tim id-em');

//     // @ts-ignore
//     studentObj.subjects = studentObj.subjects?.filter(subject => subjects.indexOf(subject) === -1);
//     let updated = await studentObj.save();
//     if(!updated) throw newError();

//     return newResponse('Uspešno ste uklonili predmete iz studenta');
// }

// export const addSubjectsToCompleted = async (_id: string, subjects: string[]) => {
//     let studentObj = await Student.findOne({ _id });

//     if(!studentObj) throw newError(404, 'Ne postoji student sa tim id-em');

//     // @ts-ignore
//     studentObj.completedSubjects = [ ...studentObj.completedSubjects, ...subjects ];

//     let updated = await studentObj.save();
//     if(!updated) throw newError();

//     return newResponse('Uspešno ste označili predmete kao položene!');
// }
