import {Document, Schema, Types, model } from 'mongoose';

export interface SessionDocument extends Document {
    userId: Types.ObjectId;
    refreshToken: string,
    active: boolean,
    userAgent: string
}


const SessionSchema = new Schema({
    userId: {type: String, required: true},
    refreshToken: {type: String, required: true},
    active: {type: Boolean, required: true},
    userAgent: {type: String, required: true},
})


const Session = model<SessionDocument>('Session', SessionSchema);

export default Session;