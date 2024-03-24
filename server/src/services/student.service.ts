import { ObjectId, Types } from "mongoose";
import Student, { StudentDocument } from "../models/student.model";
import User from "../models/user.model";
import { randomBytes } from 'crypto';
import { newError, newResponse } from "../utils";
import University from "../models/university.model";


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

    return newResponse('Novi Student je kreiran');

}


export const getStudents = async (university: string = '') => {
    let query = university ?  { universities: university } : {};

    // TODO omit password and code from the results
    let students = Student.find(query).populate('user');

    return students;
}

export const getStudent = async (studentId: string) => {

    if(!Types.ObjectId.isValid(studentId)) throw newError(400, 'Id nije validan');

    let student = await  Student.findOne({_id: studentId}).populate('user');
    if(!student) throw newError(404, 'Ne postoji student sa tim id-em');

    return student;
}

export const updateStudent = async (studentId: string, student: StudentDocument) => {
    // TODO implmenet update student;
}

export const deleteStudent = async (studentId: string) => {
    let deleted = await Student.findByIdAndDelete(studentId);
    console.log(deleted);
    return deleted;
}


