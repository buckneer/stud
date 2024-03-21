import { Document, Schema, model, Types } from 'mongoose';

export interface ServiceDocument extends Document {
    user?: Types.ObjectId;
    university?: Types.ObjectId;
}

const ServiceSchema = new Schema({ 
    user: {type: Schema.ObjectId, ref: 'User'},
    university: {type: Schema.ObjectId, ref: 'University'}
});

const Service = model<ServiceDocument>('Service', ServiceSchema);

export default Service;