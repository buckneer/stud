import University from '../models/university.model';
import Period, {PeriodDocument} from '../models/period.model';
import {newError, newResponse} from '../utils';
import Subject from "../models/subject.model";
import {ExamDocument} from "../models/exam.model";

export const addPeriod = async (data: PeriodDocument) => {
	let uniObj = await University.findOne({ _id: data.university });



	if(!uniObj) return newError(404, 'Odsek nije pronađen');

	let startDate = new Date(data.start!);
	let endDate = new Date(data.end!);

	let fStartDate = startDate.toISOString();
	let fEndDate = endDate.toISOString();

	let periods = await Period.find({
		$or: [
			{start: {$lte: fEndDate}, end: {$gte: fStartDate}},
			{start: {$gte: fStartDate, $lte: fEndDate}},
			{end: {$lte: fEndDate, $gte: fStartDate}},
		],
	});

	if(periods.length > 0) throw newError(403, 'Ispitni rok postoji u tom intervalu');
	let newPeriod = new Period(data);

	let saved = await newPeriod.save();

	if(!saved) return newError(500, 'Internal Server Error');

	return newResponse('Ispitni rok je sačuvan', 200, { id: saved._id });

}

export const compareTimes = () => {

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

export const getUniPeriods = async (_id: string, filter: string) => {
	let university = await University.findOne({ _id });

	if(!university) throw newError(404, 'Ne postoji univerzitet!');
	const currentDate = new Date();
	const utcDate = new Date(currentDate.toISOString());

	let query = filter === 'all' ?
		{university: _id} :
		{university: _id, start: { $lte: utcDate }, end: { $gte: utcDate }}

	return Period.find(query);
}

export const setPeriodActive = async (_id: string, uni: string) => {
	let university = await University.findOne({ _id: uni });

	if(!university) throw newError(404, 'Ne postoji univerzitet!');

	await Period.updateMany({ university: uni }, {
		$set: {
			active: false
		}
	});

	let period = await Period.findOneAndUpdate(
		{
			_id, university: uni, active: false,
			// acceptDate: { $gt: utcDate }
		},
		{
			$set: { active: true }
		}
	);


	if(!period) throw newError(400, 'Ne postoji rok i/ili je već aktivan!');

	return newResponse('Uspešno ste objavili rok!', 200);
}

export const setPeriodFinished = async (_id: string, uni: string) => {
	let university = await University.findOne({ _id: uni });

	if(!university) throw newError(404, 'Ne postoji univerzitet!');

	let period = await Period.findOneAndUpdate(
		{
			_id, university: uni
		},
		{
			$set: { active: false }
		}
	);

	if(!period) throw newError(400, 'Ne postoji rok i/ili je već aktivan!');

	return newResponse('Uspešno ste zatvorili rok!', 200);
}

export const getActivePeriod = async (_id: string) => {
	let university = await University.findOne({ _id });

	if(!university) throw newError(404, 'Ne postoji univerzitet!');

	let utcDate = new Date().toISOString();

	let period = await Period.findOne({ university: _id, active: true,
		end: { $gt: utcDate }
	});

	if(!period) return newResponse('Ne postoji ispitni rok!', 200, { exists: false });

	return period;
}

// export const getAvailableExamsInPeriod = async (_id: string) => {
// 	let student = await Student.findOne({ _id }).populate('subjects');
//
// 	if(!student) throw newError(404, 'Student ne postoji!');
//
// 	let period = await Period.findOne({ acceptDate: { $gt: new Date(Date.now()) } });
//
// 	if(!period) throw newError(400, 'Ne postoji aktivni ispitni rok!');
//
// 	// return exams...
// 	let subjects = student.subjects?.filter((subject: any) => {
// 		if(period.semester !== 0 && subject.semester !== period.semester) {
// 			return false;
// 		}
//
// 		// test this one
// 		if(!period?.exams?.find((ex: any) => student.subjects?.indexOf(ex) !== -1)) {
// 			return false;
// 		}
//
// 		let reqSubs: any[] = subject?.requiredSub;
//
// 		if(reqSubs.length) {
// 			return !reqSubs.find((sub: any) => student.completedSubjects?.indexOf(sub) === -1);
// 		}
//
// 		return true;
// 	});
//
// 	return subjects;
// }
