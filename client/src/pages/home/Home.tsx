import React from 'react'
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
import RandomBlob from "../../components/RandomBlob/RandomBlob";
import {useDeleteUserMutation, useGetPendingQuery} from "../../app/api/userApiSlice";
import Loader from "../../components/Loader/Loader";
import UserItem from "../../components/UserItem/UserItem";
import {Helmet} from "react-helmet";
import SidebarItem from "../../components/SidebarItem/SidebarItem";

const university: string = "65fafc2da919db458f7ed90d";
const role: string = "student";
export default function Home() {

  const {
    data,
    isLoading,
    isSuccess,
    isError
  } = useGetPendingQuery({university, role});


  return (
    <div className="bg-white">
      <Helmet>
        <title>Početna | Stud</title>
      </Helmet>
      <div className="flex h-full">
        <div className="lists-container flex-1 h-full overflow-y-scroll py-5">
          <div className="list-header flex justify-between p-5 ">
            <h1 className="font-black text-3xl">Studenti</h1>
            <div className="search-container">
              <input className='border-0 rounded-2xl bg-slate-100' type="text" placeholder="Pretraga" />
            </div>
          </div>
          <div className="lists grid grid-cols-3 gap-10 mx-5 overflow-y-auto">
            {isLoading && <Loader />}
            {isSuccess && (
                data.map(user => (
                    <UserItem user={user} university={university} role={role}/>
                ))
            )}
          </div>
        </div>
        <div className='sidebar flex flex-col items-center divide-y-2 bg-slate-100 px-5 py-10'>
          <div className="flex flex-col items-center gap-5 px-5 py-2">
            <UserCircle size={100} />
            <h1 className="font-black">Logged in</h1>
          </div>
          <div className="flex flex-col justify-between h-full">
            <div className="pt-5 w-full flex flex-col gap-2 divide-y-2">
              <div className="">
                <SidebarItem name="Studenti" Icon={GraduationCap} />
                <SidebarItem name="Profesori" Icon={User} />
                <SidebarItem name="STUD Služba" Icon={FolderArchive} />
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
