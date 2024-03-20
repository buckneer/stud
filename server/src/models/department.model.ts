import { Document, Schema, model, Types } from 'mongoose';

export interface DepModel extends Document {
    // Smer na faksu
}

const DepartmentSchema = new Schema({ 

});

const Department = model<DepModel>('Department', DepartmentSchema);

export default Department;