import { Document, Schema, model, Types } from 'mongoose';

export interface SubjectDocument extends Document {
    name: string;
    code: string;
    professors: Types.ObjectId[];
    department: Types.ObjectId;
    espb: number;
    requiredSub: Types.ObjectId[];
}

const SubjectSchema = new Schema({ 
    name: {type: String},
    code: {type: String},
    professors: [{type: Schema.ObjectId, ref: 'Professor'}],
    department: {type: Schema.ObjectId, ref: 'Department'},
    espb: {type: Number},
    requiredSub: [{type: Schema.ObjectId, ref: 'Subject'}]
});

const Subject = model<SubjectDocument>('Subject', SubjectSchema);

export default Subject;