import { Document, Schema, model, Types } from 'mongoose';

export interface PeriodDocument extends Document {
    start?: string;
    end?: string;
    acceptDate?: string;
    semester?: number; // parni, neparni, oba
    exams?: Types.ObjectId[];
    university?: Types.ObjectId; // maybe this is not needed,
    type?: number; // 0 - irregular, 1 - regular
    name?: string // janurasko-feb itd.
    active?: boolean;
    // perhaps this is needed:
    // department: Types.ObjectId;
}

const PeriodSchema = new Schema({
    type: {type: Number, required: true, default: 1},
    name: {type: String, required: true},
    start: {type: Date, required: true},
    end: {type: Date, required: true},
    acceptDate: {type: Date, required: true},
    exams: [{type: Schema.ObjectId, ref: 'Exam'}],
    university: {type: Schema.ObjectId, ref: 'University'},
    semester: {type: Number, required: true},
    active: {type: Boolean, default: false}
    // department: {type: Schema.ObjectId, ref: 'Department'}
});

const Period = model<PeriodDocument>('Period', PeriodSchema);

export default Period;
