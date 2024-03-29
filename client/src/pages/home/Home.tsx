import React, {useState} from 'react'
import {
  Book,
  CalendarCheck,
  FolderArchive,
  GraduationCap,
  LayoutList,
  LogOut,
  Settings, Sidebar,
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
        <div className='sidebar flex flex-col items-center divide-y-2 bg-slate-100 px-5 py-10'>
          <div className="flex flex-col items-center gap-5 px-5 py-2">
            <UserCircle size={100} />
            <h1 className="font-black">Logged in</h1>
          </div>
          <div className="flex flex-col justify-between h-full">
            <div className="pt-5 w-full flex flex-col gap-2 divide-y-2">
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
            </div>
            <SidebarItem name="Odjavi se" Icon={LogOut} />
          </div>

        </div>
      </div>

    </div>
  )
}
