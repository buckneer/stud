import React from 'react';
import { Session } from '../../../app/api/types/types';
import { Helmet } from 'react-helmet';
import { useGetStatsQuery } from '../../../app/api/gradeApiSlice';
import { useGetStudentByUserQuery } from '../../../app/api/studentApiSlice';
import Loader from '../../../components/Loader/Loader';
import StudTitle from '../../../components/StudTitle/StudTitle';
import Table from '../../../components/Table/Table';
import TD from '../../../components/Table/TableColumn';
import ModelNum from './ModelNum';
import ExamCard from '../../../components/ExamCard/ExamCard';
import { BookOpenCheck, CaptionsOff, LayoutList, LineChart, Link } from 'lucide-react';

export interface IProfile {
	session: Session;
	uni?: string;
}

const Profile = ({ session, uni }: IProfile) => {
	
	const {
		data: studentData,
		isLoading: isStudentLoading,
		isSuccess: isStudentSuccess,
		isError: isStudentErrror
	} = useGetStudentByUserQuery(uni!);

	const {
		data: stats,
		isLoading: isStatsLoading,
		isSuccess: isStatsSuccess,
		isError: isStatsError
	} = useGetStatsQuery(uni!, {
		skip: !studentData
	});
	
	return (
		<>
			<Helmet>
				<title>Profil | Stud</title>
			</Helmet>
			<div className="lists-container flex-1 h-full overflow-y-scroll py-5 w-full bg-white">
				{ (isStudentLoading || isStatsLoading) && <Loader /> }
				{ 
					isStudentSuccess && isStatsSuccess && 
					<>
						<div className="list-header flex justify-between p-5 ">
							<StudTitle text='STUDentski profil' />
							{/* @ts-ignore */}
							<StudTitle text={`${studentData?.user?.name!} ${studentData.studentId}`} />
						</div>

						<div className="w-full flex justify-center">
							<Table width="w-4/5 md:w-2/3" cols={['Informacije', '']}>
								<tr>
									<TD>Ime i prezime</TD>
									{/* @ts-ignore */}
									<TD>{studentData?.user?.name!}</TD>
								</tr>
								<tr>
									<TD>Broj indeska</TD>
									<TD>{studentData.studentId}</TD>
								</tr>
								<tr>
									<TD>Semestar</TD>
									<TD>{studentData.currentSemester}</TD>
								</tr>
								<tr>
									<TD>Datum upisa</TD>
									<TD>{studentData.dateOfEnrollment || '-'}</TD>
								</tr>
								<tr>
									<TD>Prosek</TD>
									<TD>{stats.average}</TD>
								</tr>
								<tr>
									<TD>ESPB</TD>
									<TD>{stats.espb}</TD>
								</tr>

							</Table>
						</div>
						<div className="w-full flex justify-center">
							<div className="w-4/5 md:w-2/3 overflow-hidden grid grid-cols-2 gap-3 mt-3">
								<ExamCard text='Položeni ispiti' Icon={BookOpenCheck} value={stats.passed} />
								<ExamCard text="Neuspeli ispiti" Icon={CaptionsOff} value={stats.failed} color='text-red-500'/>
								<ExamCard text="Prijavljeni ispiti" Icon={LayoutList} value={stats.examCount} color='text-slate-500' />
								<ExamCard text="Prolaznost" Icon={LineChart} value={`${(stats.passed / (stats.examCount || 1) * 100).toFixed(2) as string}%`} color='text-blue-400' />
							</div>
						</div>

						<div className="w-full flex justify-center">
							{/* Ovo treba u bar graph */}
							{
								stats.gradesNum.map((grade: any) => 
									<>
										{ grade.grade } - { grade.count }
									</>
								)
							}
						</div>

						<div className="w-full flex justify-center">
							<ModelNum data={studentData?.modelNum!.toUpperCase()} />
						</div>
					</>
				}
			</div>
			
		</>
	)
}

export default Profile;