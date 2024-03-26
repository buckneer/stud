import {Document, Schema, model, Types} from 'mongoose'

export interface UserDocument extends Document {
    email: string;
    password?: string,
    name: string;
    roles: string[];
    confirmed: boolean;
    code: string;
    phoneNumber?: string;
    universities: Types.ObjectId[]
}

const UserSchema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: false},
    name: {type: String, required: true},
    roles: [{type: String, required: true}],
    confirmed: {type: Boolean, default: false},
    code: {type: String, required: false},
    phoneNum: {type: String, required: false},
    universities: [{type: Schema.ObjectId, ref: "University"}]
});

const User = model<UserDocument>('User', UserSchema);

export default User;


