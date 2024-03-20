import { UniDocument } from '../models/university.model';
import { Document, Schema, model, Types } from 'mongoose';
import { UserDocument } from './user.model';

export interface StudentDocument extends Document {
    userId: UserDocument;
    studentId: string;
    modelNum?: string;
    subjects: string[];
    completedSubjects: string[];
    department: string;
    degree: string;
    status: string;
    dateOfEnrollment: string;
    currentSemester: string;
    grades: string[];
    universities: UniDocument[]
}

const StudentSchema = new Schema({
    studentId: { type: String, required: true },
    modelNum: { type: String, required: true },
    subjects: [{ type: String, ref: 'Subject', index: true  }], // Obj.Id
    completedSubjects: [{ type: Schema.ObjectId, ref: 'Subject', index: true }], // Obj.Id
    department: { type: Schema.ObjectId, ref: 'Department', required: true }, // Obj.Id
    degree: { type: String, enum: ['OAS', 'MAS', 'DAS'] },
    status: { type: String, enum: ['Budžet', 'Samofinansiranje', 'Done'], required: true },
    dateOfEnrollment: { type: String, required: true },
    currentSemester: { type: String, default: '1'},
    grades: [{ type: String, ref: 'Grades', index: true }], // Obj.Id
    universities: [{type: Schema.ObjectId, required: false, ref: 'University'}],
});

const Student = model<StudentDocument>('Student', StudentSchema);

export default Student;
