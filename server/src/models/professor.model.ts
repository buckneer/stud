import { Document, Schema, model, Types } from 'mongoose';

export interface ProfessorDocument extends Document {
    title?: string;
    subjects: string[];
    grades: string[];
    universities: string[];
}

const ProfessorSchema = new Schema({
    title: { type: String },
    subjects: [{ type: String, ref: 'Subject', index: true }], // Obj.Id
    grades: [{ type: String, ref: 'Grade', index: true }], // Obj.Id
    universities: [{ type: String, ref: 'Univeristy', index: true }] // Obj.Id
});

const Professor = model<ProfessorDocument>('Professor', ProfessorSchema);

export default Professor;