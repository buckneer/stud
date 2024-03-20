import { Document, Schema, model, Types } from 'mongoose';

export interface SubjectModel extends Document {
    // Predmet
}

const SubjectSchema = new Schema({ 

});

const Subject = model<SubjectModel>('Subject', SubjectSchema);

export default Subject;