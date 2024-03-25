import { Document, Schema, Types, model } from 'mongoose';
import { UserDocument } from './user.model';

export interface ProfessorDocument extends Document {
    title?: string;
    user: UserDocument;
    subjects: Types.ObjectId[];
    grades: Types.ObjectId[];
    universities: Types.ObjectId[];
}

const ProfessorSchema = new Schema({
    title: { type: String },
    user: { type: Schema.ObjectId, ref: 'User' },
    subjects: [{ type: Schema.ObjectId, ref: 'Subject', index: true }], 
    grades: [{ type: Schema.ObjectId, ref: 'Grade', index: true }],
    universities: [{ type: Schema.ObjectId, ref: 'Univeristy', index: true }]
});

const Professor = model<ProfessorDocument>('Professor', ProfessorSchema);

export default Professor;