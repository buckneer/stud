import React, {useState} from 'react'
import {
  Book,
  CalendarCheck,
  FolderArchive,
  GraduationCap,
  LayoutList,
  LogOut, Menu,
  Settings,
  User,
  UserCircle
} from "lucide-react";
import { useGetPendingQuery} from "../../app/api/userApiSlice";
import Loader from "../../components/Loader/Loader";
import UserItem from "../../components/UserItem/UserItem";
import {Helmet} from "react-helmet";
import SidebarItem from "../../components/SidebarItem/SidebarItem";
import {useParams} from "react-router-dom";
import UserContent from "../../components/UserContent/UserContent";
import Sidebar from "../../components/Sidebar/Sidebar";

const university: string = "65fafc2da919db458f7ed90d";
const role: string = "student";
export default function Home() {

  const { uni } = useParams();
  const [selectedData, setSelectedData] = useState(0);
  const titles = ["Studenti", "Profesori", "STUD Sluzba"];
  const engRoles = ["student", "professor", "service"];


  const handleDataChange = (changeTo: number) => {
    setSelectedData(changeTo);


  }

  return (
    <div className="bg-white">
      <Helmet>
        <title>Početna | Stud</title>
      </Helmet>
      <div className="flex h-full">
        <UserContent title={titles[selectedData]} university={uni!} role={engRoles[selectedData]} />
        <Sidebar role="service">
          <div className="">
            <SidebarItem name="Studenti" Icon={GraduationCap} active={selectedData == 0} to={0} changeData={handleDataChange} />
            <SidebarItem name="Profesori" Icon={User} active={selectedData == 1}  to={1} changeData={handleDataChange} />
            <SidebarItem name="STUD Služba" Icon={FolderArchive} active={selectedData == 2}  to={2} changeData={handleDataChange}/>
          </div>
          <div className="pt-1">
            <SidebarItem name="Ispitni Rokovi" Icon={CalendarCheck} />
            <SidebarItem name="Ispiti" Icon={LayoutList} />
            <SidebarItem name="Predmeti" Icon={Book} />
          </div>
        </Sidebar>
      </div>

    </div>
  )
}
