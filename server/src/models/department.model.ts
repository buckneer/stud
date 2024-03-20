import { Document, Schema, model, Types } from 'mongoose';
import { UniDocument } from './university.model';
import { StudentDocument } from './student.model';
import { ProfessorDocument } from './professor.model';

export interface DepDocument extends Document {
    name?: string;
    university?: UniDocument;
    students?: StudentDocument[];
    professors?: ProfessorDocument[];
}

const DepartmentSchema = new Schema({ 
    name: {type: String},
    university: {type: Schema.ObjectId, ref: 'University'},
    students: [{type: Schema.ObjectId, ref: 'Student'}],
    professors: [{type: Schema.ObjectId, ref: 'Professor'}],
});

const Department = model<DepDocument>('Department', DepartmentSchema);

export default Department;