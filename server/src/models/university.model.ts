import {Schema, Document, model, Types} from "mongoose";

export interface UniDocument extends Document {
    name?: string;
    email?: string;
    students?: Types.ObjectId[];
    professors?: Types.ObjectId[];
    services?: Types.ObjectId[];
    departments?: Types.ObjectId[];
    parentUni?: string;
}

const UniSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: false},
    students: [{type: Schema.ObjectId, ref: 'User'}],
    professors: [{type: Schema.ObjectId, ref: 'User'}],
    services: [{type: Schema.ObjectId, ref: 'User'}],
    departments: [{type: Types.ObjectId}],
    parentUni: {type: String}
})

const University = model<UniDocument>('University', UniSchema);

export default University;
