import {Document, Schema, model } from 'mongoose'

export interface UserDocument extends Document {
    email: string;
    password?: string,
    name: string;
    role: string;
    confirmed: boolean;
    code: string;  
    university?: string;
    phoneNumber?: string;
}

const UserSchema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: false},
    name: {type: String, required: true},
    role: {type: String, default: 'user'},
    confirmed: {type: Boolean, default: false},
    code: {type: String, required: false},
    university: {type: Schema.ObjectId, required: false, ref: 'University'},
    phoneNum: {type: String, required: false}
});

const User = model<UserDocument>('User', UserSchema);

export default User;


