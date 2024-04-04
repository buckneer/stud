import { Helmet } from "react-helmet";
import React, {ChangeEvent, HTMLProps, useEffect, useMemo, useState} from "react";
import StudTitle from "../../../components/StudTitle/StudTitle";
import Loader from "../../../components/Loader/Loader";
import UserItem from "../../../components/UserItem/UserItem";
import Sidebar from "../../../components/Sidebar/Sidebar";
import SidebarItem from "../../../components/SidebarItem/SidebarItem";
import { Book, CalendarCheck, FolderArchive, GraduationCap, LayoutList, User } from "lucide-react";

import { Exam } from "../../../app/api/types/types";
import { useParams } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { RootState } from "../../../app/store";
import { useGetAvailableExamsQuery } from "../../../app/api/examApiSlice";
import {useAddStudentExamsMutation} from "../../../app/api/studentApiSlice";
import Table, {IExam} from "../../../components/Table/Table";
import ExamPeriod from "./ExamPeriod";
import SubjectSelect from "./SubjectSelect";
import {setMetadata} from "../../../app/slices/sessionSlice";



function StudentHome() {
	const { uni } = useParams();
	const session = useSelector((state: RootState) => state.session);
	const dispatch = useDispatch();

	const handleDataChange = (changeTo: number) => {

		dispatch(setMetadata({ studentTab: changeTo }));
	}


	return (
		<div className="bg-white">
			<Helmet>
				<title>Početna | Stud</title>
			</Helmet>
			<div className="flex h-full">
				{session.metadata.studentTab == 0 && (<ExamPeriod session={session} uni={uni}/>)}
				{session.metadata.studentTab == 2 && (<SubjectSelect session={session} uni={uni}/>)}
				<Sidebar>
					<div className="pt-1">
						<SidebarItem name="Ispitni Rokovi" active={session.metadata.studentTab == 0} to={0} changeData={handleDataChange} Icon={CalendarCheck} />
						<SidebarItem name="Ispiti" active={session.metadata.studentTab == 1} to={1} changeData={handleDataChange} Icon={LayoutList} />
						<SidebarItem name="Predmeti" active={session.metadata.studentTab == 2} to={2} changeData={handleDataChange} Icon={Book} />
					</div>
				</Sidebar>
			</div>
		</div>
	);
}


export default StudentHome
