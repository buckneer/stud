import { Document, Schema, model, Types } from 'mongoose';

export interface PeriodDocument extends Document {
    start?: string;
    end?: string;
    acceptDate?: string;
    semester?: number; // parni, neparni, oba
    exams?: Types.ObjectId[];
    university?: Types.ObjectId; // maybe this is not needed,
    // perhaps this is needed: 
    // department: Types.ObjectId;
}

const PeriodSchema = new Schema({
    start: {type: String, required: true},
    end: {type: String, required: true},
    acceptDate: {type: String, required: true},
    exams: [{type: Schema.ObjectId, ref: 'Exam'}],
    university: {type: Schema.ObjectId, ref: 'University'},
    semester: {type: String, required: true}
    // department: {type: Schema.ObjectId, ref: 'Department'}
});

const Period = model<PeriodDocument>('Period', PeriodSchema);

export default Period;