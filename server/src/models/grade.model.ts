import { Document, Schema, model, Types } from 'mongoose';
import { ProfessorDocument } from './professor.model';
import { StudentDocument } from './student.model';

export interface GradeDocument extends Document {
    subject?: string; // Subject doc
    professor?: ProfessorDocument;
    profesorGrade?: number;
    service?: string; // Service doc
    serviceGrade?: number;
    confirmed?: boolean;
    student: StudentDocument;
    period?: string; // Exam period
}

const GradeSchema = new Schema({
    subject: { type: String },
	professor: {type: Schema.ObjectId, ref: 'Professor'},
	professorGrade: {type: Number},
	service: {type: String, ref: 'Service'},
	serviceGrade: {type: Number},
	confirmed: {type: Boolean, default: false},
	student: {type: Schema.ObjectId, ref: 'Student'},
	period: {type: String, ref: 'Period'}
});

const Grade = model<GradeDocument>('Grade', GradeSchema);

export default Grade;