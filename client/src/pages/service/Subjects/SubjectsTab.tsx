import React, { useState } from 'react';
import { useGetUniSubjectsQuery } from '../../../app/api/subjectApiSlice';
import { Link, useParams } from 'react-router-dom';
import StudTitle from '../../../components/StudTitle/StudTitle';
import Table from '../../../components/Table/Table';
import Loader from '../../../components/Loader/Loader';
import TD from '../../../components/Table/TableColumn';
import InputField from '../../../components/InputField/InputField';
import { CirclePlus } from 'lucide-react';

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
			<div className="lists-container flex-1 h-full overflow-y-scroll py-5 w-full">
				<div className="list-header flex justify-between p-5 items-center">
					<StudTitle text={"Predmeti"} />
					<div className="search-container flex justify-center items-center gap-5">
						<Link to={`/uni/${uni}/subject/add`} className="flex gap-2 items-center hover:bg-white p-3 rounded-xl transition-colors">
							<div className="flex gap-1">
								<div className="font-semibold">
									Dodaj
								</div>
								<div className="font-semibold">
									Predmet
								</div>
							</div>
							<CirclePlus size={26} />
						</Link>
						<InputField id='search' name='Pretraga' type='text' inputVal={search} setVal={(e) => setSearch(e.target.value)} />
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