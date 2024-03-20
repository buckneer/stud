import { Document, Schema, model, Types } from 'mongoose';

export interface ServiceModel extends Document {
    // Studentska sluzba
}

const ServiceSchema = new Schema({ 

});

const Service = model<ServiceModel>('Service', ServiceSchema);

export default Service;