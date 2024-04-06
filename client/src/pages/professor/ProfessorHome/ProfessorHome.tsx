import {Helmet} from "react-helmet";
import React from "react";
import SidebarItem from "../../../components/SidebarItem/SidebarItem";
import {Book, CalendarCheck, GraduationCap, LayoutList} from "lucide-react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../app/store";
import {setMetadata} from "../../../app/slices/sessionSlice";
import StudentsTab from "./StudentsTab";

function ProfessorHome() {

	const session = useSelector((state: RootState) => state.session);
	const dispatch = useDispatch();

	const handleDataChange = (changeTo: number) => {
		dispatch(setMetadata({ professorTab: changeTo }));
	}

	return (
		<div className="bg-white">
			<Helmet>
				<title>Početna | Stud</title>
			</Helmet>

			<div className="flex h-full bg-white">
			{/*	CONTENT */}
				{session.metadata.professorTab == 0 && (<StudentsTab />)}
				<Sidebar>
					<div className="pt-1">
						<SidebarItem name="Studenti" active={session.metadata.professorTab == 0} to={0} changeData={handleDataChange} Icon={GraduationCap} />
						<SidebarItem name="Ispitni Rokovi" active={session.metadata.professorTab == 1} to={1} changeData={handleDataChange} Icon={CalendarCheck} />
						<SidebarItem name="Ispiti" active={session.metadata.professorTab == 2} to={2} changeData={handleDataChange} Icon={LayoutList} />
						<SidebarItem name="Predmeti" active={session.metadata.professorTab == 3} to={3} changeData={handleDataChange} Icon={Book} />
					</div>
				</Sidebar>
			</div>
		</div>
	);
}

export default ProfessorHome
