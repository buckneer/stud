import { Document, Schema, model, Types } from 'mongoose';

export interface DepDocument extends Document {
	name?: string;
	university?: Types.ObjectId;
	students?: Types.ObjectId[];
	professors?: Types.ObjectId[];
}

const DepartmentSchema = new Schema({ 
	name: {type: String},
	university: {type: Schema.ObjectId, ref: 'University'},
	students: [{type: Schema.ObjectId, ref: 'Student'}],
	professors: [{type: Schema.ObjectId, ref: 'Professor'}],
});

const Department = model<DepDocument>('Department', DepartmentSchema);

export default Department;