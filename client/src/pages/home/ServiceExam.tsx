import React, {ChangeEvent, FormEvent, useEffect, useRef, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {useAddExamMutation, useGetExamsQuery, useUpdateExamMutation} from '../../app/api/examApiSlice';
import StudTitle from '../../components/StudTitle/StudTitle';
import {CirclePlus, Pencil, Save, Trash2} from 'lucide-react';
import {useGetActivePeriodQuery} from '../../app/api/periodApiSlice';
import Table from "../../components/Table/Table";
import {useGetSubjectsForExamQuery} from "../../app/api/subjectApiSlice";
import Loader from "../../components/Loader/Loader";
import TD from "../../components/Table/TableColumn";
import {Exam} from "../../app/api/types/types";
import MutationState from '../../components/MutationState/MutationState';
import { formatDate } from '../../utils/formatDate';

const ServiceExam = () => {
	const {uni} = useParams();
	const [search, setSearch] = useState('');
	const [date, setDate] = useState<{id: string, date: string}[]>([]);

	// const {
	// 	data: examData,
	// 	isLoading: isExamLoading,
	// 	isSuccess: isExamSuccess,
	// 	isError: isExamError
	// } = useGetExamsQuery(uni!);


	const cols = ['Kod', 'Naziv', 'Profesor', 'Datum Ispita', 'Akcije'];

	const handleDateChange = (e: ChangeEvent<any>, id: string) => {
		const updatedDate = e.target.value;
		setDate(prevDate => {
			const index = prevDate.findIndex(item => item.id === id);
			if (index !== -1) {
				const updatedDates = [...prevDate];
				updatedDates[index] = { ...updatedDates[index], date: updatedDate };
				return updatedDates;
			} else {
				return [...prevDate, { id, date: updatedDate }];
			}
		});
	};

	const {
		data: activePeriod,
		isLoading: isPeriodLoading,
		isSuccess: isPeriodSuccess,
		isError: isPeriodError
	} = useGetActivePeriodQuery(uni!);

	const {
		data: subjectData,
		isLoading: isSubjectsLoading,
		isSuccess: isSubjectsSuccess,
		isError: isSubjectsError
	} = useGetSubjectsForExamQuery(
		{ uni: uni!, period: activePeriod?._id }, // Use activePeriodId instead of activePeriod._id
		{
			skip: !activePeriod?._id || !isPeriodSuccess// Skip the query if activePeriodId is null
		}
	);

	const [
		addExam,
		{
			isLoading: isAddExamLoading,
			isError: isAddExamError,
			isSuccess: isAddExamSuccess,
			reset
		}
	] = useAddExamMutation();

	const {
		data: examData,
		isLoading: isExamLoading,
		isSuccess: isExamSuccess,
		isError: isExamError
	} = useGetExamsQuery({ university: uni!, period: activePeriod?._id }, {
		skip: !activePeriod?._id || !isPeriodSuccess
	});

	const resetRef = useRef(reset)
  resetRef.current = reset;

	// exam: Exam
	const handleSave = async (exam: Exam) => {

		try {
			await addExam({university: uni!, body: exam});

			setTimeout(() => {
				resetRef.current();
			}, 1000);
		} catch (e) {
			console.error(e);
		}
	}

	// TODO implement later!
	// const bulkAdd = (exam: Exam[]) => {
	//
	// }

	return (
		<>
			<div className="lists-container flex-1 h-full overflow-y-scroll py-5 w-full bg-white">
				<div className="list-header flex justify-between p-5 items-center">
					{!isPeriodLoading && (<StudTitle text={activePeriod.name ? `Ispiti za ${activePeriod.name}` : 'Aktivirajte ispitni rok...'} />) }
					<div className="search-container flex justify-center items-center gap-3">
						{!isPeriodLoading && (
							<Link to={`/uni/${uni}/period/${activePeriod._id}/exam/add`} // TODO take a look at THIS
							      className="add-field flex gap-3 rounded-2xl bg-slate-100 p-2 border-[1px] border-slate-200 cursor-pointer hover:bg-slate-200	">
								<div className="flex">
									<div className="font-semibold">
										Novi ispit
									</div>
								</div>
								<CirclePlus size={26}/>
							</Link>
						)}
						<input className="border-0 rounded-2xl bg-slate-100" id='search' placeholder='Pretraga'
						       name='Pretraga' type='text' value={search} onChange={(e) => setSearch(e.target.value)}/>
					</div>
				</div>
					<MutationState
						isLoading={isAddExamLoading}
						isSuccess={isAddExamSuccess}
						isError={isAddExamError}
					/>
				<div className="w-full flex justify-center pb-5 border-b-4">
					<Table cols={cols}>
						{isSubjectsLoading && <Loader />}
						{
							isSubjectsSuccess && subjectData?.length !== 0 ?
								<>
									{
										subjectData.map(subj => (
											<tr key={ subj._id }>
												<TD>{ subj.code }</TD>
												<TD>{ subj.name }</TD>
												{/*@ts-ignore*/}
												<TD>{ subj?.professors!.map((prof) => <>{ prof.user.name }</>) }</TD>
												<TD>
													<input
														className="rounded-xl border-0 bg-slate-100"
														type="datetime-local"
														name={subj._id}
														onChange={(e) => handleDateChange(e, subj._id!)}
														value={date.find(item => item.id === subj._id)?.date || ''}
													/>
												</TD>
												<TD>
													<div className="flex w-full justify-center gap-2">
														<Save className="cursor-pointer hover:bg-green-700 rounded-xl hover:p-1 hover:text-white transition-all hover:scale-125 active:scale-75" size={28} onClick={() => {
															handleSave({
																date: date.find(item => item.id === subj._id)?.date || '',
																subject: subj._id,
																professor: subj.professors![0], // TODO change to react-select
																period: activePeriod?._id,
																// department: activePeriod.department, TODO undefined!!
																university: uni
															})
														}} />
													</div>
												</TD>
											</tr>
										))
									}
								</> : <div className="p-5 font-black"></div>
						}
					</Table>
				</div>

				<div className="w-full flex justify-center mt-5">
					<Table cols={cols}>
						{isExamLoading && <Loader />}
						{
							isExamSuccess && examData?.length !== 0 ?
								<>
									{
										examData.map(exam => (
											<tr key={ exam._id }>
												{/* @ts-ignore */}
												<TD>{ exam.subject.code }</TD>
												{/* @ts-ignore */}
												<TD>{ exam.subject.name}</TD>
												{/*@ts-ignore*/}
												<TD>{ exam?.professor.user.name }</TD>
												<TD>{ formatDate(exam.date as string, true) }</TD>
												<TD>
													<div className="flex w-full justify-center gap-2">
														<Link to={`/uni/${uni}/exam/${exam._id}/edit`}>
															<Pencil className="cursor-pointer hover:bg-green-700 overflow-visible rounded-xl hover:p-1 hover:text-white transition-all hover:scale-125 active:scale-75" size={26}/>
														</Link>
													</div>
												</TD>
											</tr>
										))
									}
								</> : <div className="p-5 font-black"></div>
						}
					</Table>
				</div>
			</div>
		</>
	)
}

export default ServiceExam;
