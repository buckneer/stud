import { Document, Schema, model, Types } from 'mongoose';

export interface PeriodDocument extends Document {
    start?: string;
    end?: string;
    exams: Types.ObjectId[];
    university: Types.ObjectId; // maybe this is not needed
    // perhaps this is needed: 
    // department: Types.ObjectId;
}

const PeriodSchema = new Schema({
    start: {type: String, required: true},
    end: {type: String, required: true},
    exams: [{type: Schema.ObjectId, ref: 'Exam'}],
    university: {type: Schema.ObjectId, ref: 'University'},
    // department: {type: Schema.ObjectId, ref: 'Department'}
});

const Period = model<PeriodDocument>('Period', PeriodSchema);

export default Period;