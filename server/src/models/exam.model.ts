import { Document, Schema, model, Types } from 'mongoose';

export interface ExamModel extends Document {
    // Ispitni rok
}

const ExamSchema = new Schema({ 

});

const Exam = model<ExamModel>('Exam', ExamSchema);

export default Exam;