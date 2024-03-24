import { Document, Schema, model } from 'mongoose'

export interface UserDocument extends Document {
    email: string;
    password?: string,
    name: string;
    roles: string[];
    confirmed: boolean;
    code: string;  
    phoneNumber?: string;
}

const UserSchema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: false},
    name: {type: String, required: true},
    roles: [{type: String, default: 'student'}],
    confirmed: {type: Boolean, default: false},
    code: {type: String, required: false},
    phoneNum: {type: String, required: false}
});

const User = model<UserDocument>('User', UserSchema);

export default User;


