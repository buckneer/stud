import { Document, Schema, model, Types } from 'mongoose';

export interface GradeDocument extends Document {
	subject?: Types.ObjectId; // Subject doc
	professor?: Types.ObjectId;
	professorGrade?: number;
	service?: Types.ObjectId; // Service doc
	serviceGrade?: number;
	confirmed?: boolean;
	student: Types.ObjectId;
	period?: Types.ObjectId; // Exam period
	exam?: Types.ObjectId;
}

const GradeSchema = new Schema({
	subject: { type: Schema.ObjectId, ref: 'Subject' },
	professor: {type: Schema.ObjectId, ref: 'Professor'},
	professorGrade: {type: Number},
	service: {type: Schema.ObjectId, ref: 'Service'},
	serviceGrade: {type: Number},
	confirmed: {type: Boolean, default: false},
	student: {type: Schema.ObjectId, ref: 'Student'},
	period: {type: Schema.ObjectId, ref: 'Period'},
	exam: {type: Schema.ObjectId, ref: 'Exam'}
});

const Grade = model<GradeDocument>('Grade', GradeSchema);

export default Grade;
