import { Document, Schema, model, Types } from 'mongoose';
import { UserDocument } from './user.model';
import { DepDocument } from './department.model';
import { SubjectDocument } from './subject.model';
import { UniDocument } from './university.model';

export interface StudentDocument extends Document {
    user?: Types.ObjectId;
    studentId?: string;
    modelNum?: string;
    subjects?: SubjectDocument[];
    completedSubjects?: SubjectDocument[];
    department?: DepDocument;
    degree?: string;
    status?: string;
    dateOfEnrollment?: string;
    currentSemester?: string;
    grades?: string[];
    universities?: UniDocument[]
}

const StudentSchema = new Schema({
    user: { type: Schema.ObjectId, ref: 'User' },
    studentId: { type: String, required: true },
    modelNum: { type: String, required: true },
    subjects: [{ type: String, ref: 'Subject', index: true  }], // Obj.Id
    completedSubjects: [{ type: Schema.ObjectId, ref: 'Subject', index: true }], // Obj.Id
    department: { type: Schema.ObjectId, ref: 'Department', required: false }, // Obj.Id
    degree: { type: String, enum: ['OAS', 'MAS', 'DAS'] },
    status: { type: String, enum: ['Budžet', 'Samofinansiranje', 'Done'], required: false },
    dateOfEnrollment: { type: String, required: false },
    currentSemester: { type: String, default: '1'},
    grades: [{ type: String, ref: 'Grades', index: true }], // Obj.Id
    universities: [{type: Schema.ObjectId, required: false, ref: 'University'}],
});

const Student = model<StudentDocument>('Student', StudentSchema);

export default Student;
