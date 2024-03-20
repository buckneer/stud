import { Document, Schema, model, Types } from 'mongoose';
import { ProfessorDocument } from './professor.model';
import { DepDocument } from './department.model';

export interface SubjectDocument extends Document {
    name: string;
    code: string;
    professors: ProfessorDocument[];
    department: DepDocument;
    espb: number;
    requiredSub: SubjectDocument[];
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