import { Document, Schema, model, Types } from 'mongoose';
import { ExamDocument } from './exam.model';

export interface PeriodDocument extends Document {
    start?: string;
    end?: string;
    exams: ExamDocument[]
}

const PeriodSchema = new Schema({
    // Ispitni rok schema
});

const Period = model<PeriodDocument>('Period', PeriodSchema);

export default Period;