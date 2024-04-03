import { Document, Schema, model, Types } from 'mongoose';
import {GradeDocument} from "./grade.model";
import {SubjectDocument} from "./subject.model";

export interface ExamDocument extends Document {
    date?: string;
    students?: Types.ObjectId[];
    subject?: Types.ObjectId | SubjectDocument;
    professor?: Types.ObjectId //! Can be removed
    grades?: Types.ObjectId[] | GradeDocument[] ;
    period?: Types.ObjectId;
    ended?: boolean;
    department?: Types.ObjectId;
    university?: Types.ObjectId;
}


const ExamSchema = new Schema({
    date: {type: String, required: true},
    students: [{type: Schema.ObjectId, ref: 'Student'}],
    subject: {type: Schema.ObjectId, ref: 'Subject'},
    professor: {type: Schema.ObjectId, ref: 'Professor'},
    grades: [{type: Schema.ObjectId, ref: 'Grade'}],
    period: {type: Schema.ObjectId, ref: 'Period'},
    department: {type: Schema.ObjectId, ref: 'Department'},
    university: {type: Schema.ObjectId, ref: 'University'},
    ended: {type: Boolean, default: false},
});

const Exam = model<ExamDocument>('Exam', ExamSchema);

export default Exam;
