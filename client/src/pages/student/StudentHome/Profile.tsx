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
							<Table cols={['Informacije', '']}>
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

						<div className="w-full flex flex-row justify-center items-center mt-3">
							<div className="card flex flex-row justify-center items-center">
								Položeni ispiti: { stats.passed }
							</div>

							<div className="card flex flex-row justify-center items-center">
								Neuspeli ispiti: { stats.failed }
							</div>

							<div className="card flex flex-row justify-center items-center">
								Prijavljeni ispiti: { stats.examCount }
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