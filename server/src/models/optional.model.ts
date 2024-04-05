import { Document, Schema, model, Types } from 'mongoose';

export interface OptionalDocument extends Document {
	name: string;
	espb: number;
	subjects: Types.ObjectId[];
	semester: number;
	department: Types.ObjectId;
	university: Types.ObjectId;
}

const OptionalSchema = new Schema({
	name: { type: String },
	espb: { type: Number, required: true },
	subjects: [{ type: Schema.ObjectId, ref: 'Subject' }],
	semester: { type: Number },
	degree: {type: String, enum: ['OAS', 'MAS', 'DAS']},
	department: { type: Schema.ObjectId, ref: 'Department' },
	university: { type: Schema.ObjectId, ref: 'University' },
});

const Optional = model<OptionalDocument>('Optional', OptionalSchema);

export default Optional;
