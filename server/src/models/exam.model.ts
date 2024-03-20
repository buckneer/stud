import { Document, Schema, model, Types } from 'mongoose';
import { StudentDocument } from './student.model';
import { SubjectDocument } from './subject.model';
import { ProfessorDocument } from './professor.model';
import { PeriodDocument } from './period.model';
import { GradeDocument } from './grade.model';

export interface ExamDocument extends Document {
    date?: string;
    students: StudentDocument[];
    subject: SubjectDocument;
    professor: ProfessorDocument //! Can be removed
    grades: GradeDocument[];
    period: PeriodDocument;
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