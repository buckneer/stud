import { Schema, Document, model } from "mongoose";
import { UserDocument } from "./user.model";

export interface UniDocument extends Document {
    name?: string;
    email?: string;
    students?: UserDocument[];
    professors?: UserDocument[];
    services?: UserDocument[];
    departments?: string[];
    parentUni?: string;
}

const UniSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: false},
    students: [{type: Schema.ObjectId, ref: 'User'}],
    professors: [{type: Schema.ObjectId, ref: 'User'}],
    service: [{type: Schema.ObjectId, ref: 'User'}],
    departments: [{type: String}],
    parentUni: {type: String}
})

const University = model<UniDocument>('University', UniSchema);

export default University;