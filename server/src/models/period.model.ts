import { Document, Schema, model, Types } from 'mongoose';

export interface PeriodDocument extends Document {
    start?: string;
    end?: string;
    exams: Types.ObjectId[]
}

const PeriodSchema = new Schema({
    // Ispitni rok schema
});

const Period = model<PeriodDocument>('Period', PeriodSchema);

export default Period;