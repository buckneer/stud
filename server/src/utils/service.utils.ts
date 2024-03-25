import { Model, Types } from 'mongoose';
import { newError, newResponse } from '.';

// this needs to be worked on a bit or maybe deleted completely...
export const objectIdsInModel = async (ModelParam: Model<any>, objectIds: Types.ObjectId[] | string[], keys: string[] | string) => {
	let count = await ModelParam.find().count( { _id: { $in: objectIds } } ); 
	return count === objectIds.length;
}

export const addToModelArray = async (ModelParam: Model<any>, _id: string, key: string, array: Types.ObjectId[]) => {
	let modelObj = await ModelParam.findOne({ _id });
	
	if(!modelObj) throw newError(404, 'Ne postoji model sa tim ID-em!');

	let alreadyIn = !array.every(elem => modelObj[key].indexOf(elem) === -1);

	if(alreadyIn) throw newError(400, 'Već postoji u bazi!');

	modelObj[key] = [ ...modelObj[key], ...array ];
	
	let updated = await modelObj.save();
	if(!updated) throw newError();

	return newResponse('Podaci su uspešno izmenjeni!');
}

export const removeFromModelArray = async (ModelParam: Model<any>, _id: string, key: string, item: Types.ObjectId) => {
	let modelObj = await ModelParam.findOne({ _id });

	if(!modelObj) throw newError(404, 'Ne postoji model sa tim ID-em!');

	// @ts-ignore
	let index = modelObj[key].indexOf(item);
	if(index === -1) throw newError(400, 'Pogrešna stavka za brisanje!');

	modelObj[key] = modelObj[key].splice(index, 1);
	
	let updated = await modelObj.save();
	if(!updated) throw newError();

	return newResponse('Uspešno ste izmenili model!');
}