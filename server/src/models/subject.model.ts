import { Document, Schema, model, Types } from 'mongoose';

export interface SubjectDocument extends Document {
    name: string;
    code: string;
    professors: Types.ObjectId[];
    department: Types.ObjectId;
    university: Types.ObjectId;
    semester: number;
    espb: number;
    degree: string; // OAS MAS DAS
    requiredSub: Types.ObjectId[];
    type: "R" | "O";
}

const SubjectSchema = new Schema({
    name: {type: String},
    code: {type: String},
    professors: [{type: Schema.ObjectId, ref: 'Professor'}],
    department: {type: Schema.ObjectId, ref: 'Department'},
    university: {type: Schema.ObjectId, ref: 'University'},
    degree: {type: String, enum: ['OAS', 'MAS', 'DAS']},
    semester: {type: Number, required: true},
    espb: {type: Number},
    type: {type: String, required: true, default: "R"},
    requiredSub: [{type: Schema.ObjectId, ref: 'Subject'}]
});

const Subject = model<SubjectDocument>('Subject', SubjectSchema);

export default Subject;
