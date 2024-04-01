import University from '../models/university.model';
import Period, { PeriodDocument } from '../models/period.model';
import { newError, newResponse } from '../utils';
import Department from '../models/department.model';
import Student from '../models/student.model';
import { SubjectDocument } from '../models/subject.model';

export const addPeriod = async (data: PeriodDocument) => {
	let uniObj = await University.findOne({ _id: data.university });

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

export const getUniPeriods = async (_id: string/*, active: string | boolean*/) => {
	let university = await University.findOne({ _id });

	if(!university) throw newError(404, 'Ne postoji univerzitet!');

	// let query = (active) 
	// 	? { university: _id,  end: { $gte: new Date().toISOString() }}
	// :  { university: _id }

	let periods = await Period.find( { university: _id });

	return periods;
}

export const getAvailableExamsInPeriod = async (_id: string) => {
	let student = await Student.findOne({ _id }).populate('subjects');

	if(!student) throw newError(404, 'Student ne postoji!');
	
	let period = await Period.findOne({ acceptDate: { $gt: new Date(Date.now()) } });

	if(!period) throw newError(400, 'Ne postoji aktivni ispitni rok!');

	// return exams... 
	let subjects = student.subjects?.filter((subject: any) => {
		if(period.semester !== 0 && subject.semester !== period.semester) {
			return false;
		}

		// test this one
		if(!period?.exams?.find((ex: any) => student.subjects?.indexOf(ex) !== -1)) {
			return false;
		}

		let reqSubs: any[] = subject?.requiredSub;
		
		if(reqSubs.length) {
			return !reqSubs.find((sub: any) => student.completedSubjects?.indexOf(sub) === -1);
		}

		return true;
	});

	return subjects;
}