import University from '../models/university.model';
import Period, { PeriodDocument } from '../models/period.model';
import { newError, newResponse } from '../utils';
import Department from '../models/department.model';

export const addPeriod = async (data: PeriodDocument) => {
	let uniObj = await Department.findOne({ _id: data.department });

	if(!uniObj) return newError(404, 'Odsek nije pronađen');

	let newPeriod = new Period(data);

	let saved = await newPeriod.save();
	
	if(!saved) return newError(500, 'Internal Server Error');

	return newResponse('Ispitni rok je sačuvan', 200, { id: saved._id });

}

export const getPeriod = async (_id: string) => {
	let period = await Period.findOne({ _id });
	if(!period) throw newError(404, 'Ispitni rok nije pronađen');

	return period;
}

export const getPeriods = async () => {
	let periods = await Period.find();

	return periods;
}

export const updatePeriod = async (_id: string, data: PeriodDocument) => {
	let periodObj = await Period.findOne({ _id });

	if(!periodObj) throw newError(404, 'Ispitni rok nije pronađen!');

	let updated = await Period.updateOne({ _id }, {
		$set: {
			...data
		}
	});

	if(!updated) throw newError(500, 'Internal Server Error');

	return newResponse('Ispitni rok uspešno ažuriran');
}