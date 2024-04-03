import { Document, Schema, model, Types } from 'mongoose';


export interface StudentDocument extends Document {
    user?: Types.ObjectId;
    studentId?: string;
    modelNum?: string;
    subjects?: Types.ObjectId[];
    completedSubjects?: Types.ObjectId[];
    department?: Types.ObjectId;
    degree?: string;
    status?: string;
    dateOfEnrollment?: string;
    currentSemester?: string;
    grades?: Types.ObjectId[];
    exams?: Types.ObjectId[];
    signs?: Types.ObjectId[];
    university?: Types.ObjectId
}

const StudentSchema = new Schema({
    user: { type: Schema.ObjectId, ref: 'User' },
    studentId: { type: String, required: true },
    modelNum: { type: String, required: true },
    subjects: [{ type: Schema.ObjectId, ref: 'Subject', index: true  }], // Obj.Id
    completedSubjects: [{ type: Schema.ObjectId, ref: 'Subject', index: true }], // Obj.Id
    department: { type: Schema.ObjectId, ref: 'Department', required: false }, // Obj.Id
    degree: { type: String, enum: ['OAS', 'MAS', 'DAS'] },
    status: { type: String, enum: ['Budžet', 'Samofinansiranje', 'Done'], required: false },
    dateOfEnrollment: { type: String, required: false },
    currentSemester: { type: String, default: '1'},
    grades: [{ type: Schema.ObjectId, ref: 'Grades', index: true }], 
    signs: [{ type: Schema.ObjectId, ref: 'Subject' }], 
    university: {type: Schema.ObjectId, required: false, ref: 'University'},
});

const Student = model<StudentDocument>('Student', StudentSchema);

export default Student;
