import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
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

const ServiceExam = () => {
	const {uni} = useParams();
	const [search, setSearch] = useState('');
	const [date, setDate] = useState<{id: string, date: string}[]>([]);
	const [activePeriodId, setActivePeriodId] = useState("")

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

	useEffect(() => {
		// Update activePeriodId only when activePeriod is successfully fetched
		if (isPeriodSuccess && activePeriod) {
			setActivePeriodId(activePeriod._id);
		}
	}, [isPeriodSuccess, activePeriod]);

	const {
		data: subjectData,
		isLoading: isSubjectsLoading,
		isSuccess: isSubjectsSuccess,
		isError: isSubjectsError
	} = useGetSubjectsForExamQuery(
		{ uni: uni!, period: activePeriodId }, // Use activePeriodId instead of activePeriod._id
		{
			skip: !activePeriod // Skip the query if activePeriodId is null
		}
	);

	const [
		addExam,
		{
			isLoading: isAddExamLoading,
			isError: isAddExamError,
			isSuccess: isAddExamSuccess
		}
	] = useAddExamMutation();
	// exam: Exam
	const handleSave = async (exam: Exam) => {

		try {
			await addExam({university: uni!, body: exam});
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
					{!isPeriodLoading && (<StudTitle text={`Ispiti za ${activePeriod.name}`}/>) }
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

				<div className="w-full flex justify-center">
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
														type="datetime-local"
														name={subj._id}
														onChange={(e) => handleDateChange(e, subj._id!)}
														value={date.find(item => item.id === subj._id)?.date || ''}
													/>
												</TD>
												<TD>
													<div className="flex w-full justify-center gap-2">
														<Save className="cursor-pointer" onClick={() => {
															handleSave({
																date: date.find(item => item.id === subj._id)?.date || '',
																subject: subj._id,
																professor: subj.professors![0], // TODO change to react-select
																period: activePeriodId,
																// department: activePeriod.department, TODO undefined!!
																university: uni
															})
														}} />
													</div>
												</TD>
											</tr>
										))
									}
								</> : <div className="p-5 font-black">Nema predmeta na fakultetu...</div>
						}
					</Table>
				</div>
			</div>
		</>
	)
}

export default ServiceExam;
