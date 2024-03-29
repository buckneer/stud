import {Document, Schema, model, ObjectId} from 'mongoose'

export interface ResetDocument extends Document {
	code: string;
	active: boolean;
	user: ObjectId;
	createdAt: string;
}

const ResetSchema = new Schema({
	code: {type: String, required: true},
	active: {type: Boolean, required: true},
	user: {type: String, required: true},
}, {timestamps: true});

const Reset = model<ResetDocument>('Reset', ResetSchema);

export default Reset;


