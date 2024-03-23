import { Model, Types } from 'mongoose';

// this needs to be worked on a bit or maybe deleted completely...
export const objectIdsInModel = async (ModelParam: Model<any>, objectIds: Types.ObjectId[] | string[], keys: string[] | string) => {
	let count = await ModelParam.find().count( { _id: { $in: objectIds } } ); 
	return count === objectIds.length;
}
