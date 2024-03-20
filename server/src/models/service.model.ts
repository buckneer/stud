import { Document, Schema, model, Types } from 'mongoose';

export interface ServiceDocument extends Document {
    // Studentska sluzba
}

const ServiceSchema = new Schema({ 

});

const Service = model<ServiceDocument>('Service', ServiceSchema);

export default Service;