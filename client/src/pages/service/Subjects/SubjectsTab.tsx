import React, { useState } from 'react';
import { useGetUniSubjectsQuery } from '../../../app/api/subjectApiSlice';
import { Link, useParams } from 'react-router-dom';
import StudTitle from '../../../components/StudTitle/StudTitle';
import Table from '../../../components/Table/Table';
import Loader from '../../../components/Loader/Loader';
import TD from '../../../components/Table/TableColumn';
import { CirclePlus, Pencil, Trash2 } from 'lucide-react';

const SubjectsTab = () => {
	const { uni } = useParams();
	const [ search, setSearch ] = useState(''); 
	// add other filters here...?
	const {
		data: subjectData,
		isLoading: isSubjectLoading,
		isSuccess: isSubjectSuccess,
		isError: isSubjectError
	} = useGetUniSubjectsQuery(uni!);

	const cols = ['Kod', 'Naziv', 'Profesor', 'Tip', 'ESPB', 'Akcije'];

	return (
		<>
			<div className="lists-container flex-1 h-full overflow-y-scroll py-5 w-full bg-white">
				<div className="list-header flex justify-between p-5 items-center">
					<StudTitle text={"Predmeti"} />
					<div className="search-container flex justify-center items-center gap-3">
						<Link to={`/uni/${uni}/subject/add`} className="add-field flex gap-3 rounded-2xl bg-slate-100 p-2 border-[1px] border-slate-200 cursor-pointer hover:bg-slate-200	">
							<div className="flex">
								<div className="font-semibold">
									Novi predmet
								</div>
							</div>
							<CirclePlus size={26} />
						</Link>
						<input className="border-0 rounded-2xl bg-slate-100" id='search' placeholder='Pretraga' name='Pretraga' type='text' value={search} onChange={(e) => setSearch(e.target.value)} />
					</div>
				</div>
				<div className="w-full flex justify-center">
					<Table cols={cols}>
						{isSubjectLoading && <Loader />}
						{
							isSubjectSuccess && subjectData?.length !== 0 ? 
							<>
								{
									subjectData.map(subj => (
										<tr key={ subj._id }>
											<TD>{ subj.code }</TD>
											<TD>{ subj.name }</TD>
											<TD>{ subj?.professors!.map((prof) => <>{ prof }</>) }</TD>
											<TD>{ subj.type === 'R' ? 'O' : 'I' }</TD>
											<TD>{ subj.espb }</TD>
											<TD>
												<div className="flex w-full justify-center gap-2">
													<Link to={`http://localhost:3000/uni/${uni}/subject/${subj._id}/edit`} className="hover:rotate-12 transition"><Pencil /></Link>
													<div className="hover:rotate-12 transition cursor-pointer hover:text-red-500 "><Trash2 /*onClick={() => { setIsOpen(true); setDepName(name); setDepId(_id) }}*/ /></div>
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

export default SubjectsTab;