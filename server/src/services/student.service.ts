import { ObjectId, Types } from "mongoose";
import Student, { StudentDocument } from "../models/student.model";
import User from "../models/user.model";
import { newError, newResponse } from "../utils";


export const addStudent = async (userId: string, student: StudentDocument) => {


    // TODO check if the user with same Id is already registered as student

    let newStudent = new Student(student);
    let user = await User.findOne({_id: userId});

    if(!user) throw newError(404, 'Korisnik nije pronađen!');

    newStudent.user = user._id;
    let saved = await newStudent.save();
    
    if(!saved) throw newError(500, 'Internal Server Error');

    return newResponse('Novi Student je kreiran');

}


export const getStudents = async () => {

    // TODO omit password and code from the results
    let students = Student.find().populate('user');

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

