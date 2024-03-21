import { Document, Schema, model, Types } from 'mongoose';

export interface ExamDocument extends Document {
    date?: string;
    students: Types.ObjectId[];
    subject: Types.ObjectId;
    professor: Types.ObjectId //! Can be removed
    grades: Types.ObjectId[];
    period: Types.ObjectId;
    ended: boolean;
}

const ExamSchema = new Schema({ 
    date: [{type: String}],
    students: [{type: Schema.ObjectId, ref: 'Student'}],
    subject: {type: Schema.ObjectId, ref: 'Subject'},
    professor: {type: Schema.ObjectId, ref: 'Professor'},
    grades: [{type: Schema.ObjectId, ref: 'Grade'}],
    period: {type: Schema.ObjectId, ref: 'Period'},
    ended: {type: Boolean, default: false}
});

const Exam = model<ExamDocument>('Exam', ExamSchema);

export default Exam;