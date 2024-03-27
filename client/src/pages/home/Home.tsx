import React from 'react'
import {
  Book,
  CalendarCheck,
  FolderArchive,
  GraduationCap,
  LayoutList,
  LogOut,
  Settings,
  User,
  UserCircle
} from "lucide-react";
import RandomBlob from "../../components/RandomBlob/RandomBlob";
import {useGetPendingQuery} from "../../app/api/userApiSlice";
import Loader from "../../components/Loader/Loader";
import UserItem from "../../components/UserItem/UserItem";
import {Helmet} from "react-helmet";

const university: string = "65fafc2da919db458f7ed90d";
const role: string = "student";
export default function Home() {

  const {
    data,
    isLoading,
    isSuccess,
    isError
  } = useGetPendingQuery({university, role})

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
                <div className="w-full rounded-2xl p-2 hover:bg-white transition-all cursor-pointer flex gap-2">
                  <GraduationCap />
                  <h1>Studenti</h1>
                </div>
                <div className="w-full rounded-2xl p-2 hover:bg-white transition-all cursor-pointer flex gap-2">
                  <User />
                  <h1>Profesori</h1>
                </div>
                <div className="w-full rounded-2xl p-2 hover:bg-white transition-all cursor-pointer flex gap-2">
                  <FolderArchive />
                  <h1>Stud. Služba</h1>
                </div>
              </div>
              <div className="pt-1">
                <div className="w-full rounded-2xl p-2 hover:bg-white transition-all cursor-pointer flex gap-2">
                  <LayoutList />
                  <h1>Ispiti</h1>
                </div>
                <div className="w-full rounded-2xl p-2 hover:bg-white transition-all cursor-pointer flex gap-2">
                  <Book />
                  <h1>Predmeti</h1>
                </div>
                <div className="w-full rounded-2xl p-2 hover:bg-white transition-all cursor-pointer flex gap-2">
                  <CalendarCheck />
                  <h1>Ispitni Rokovi</h1>
                </div>
              </div>
            </div>
            <div className="w-full rounded-2xl p-2 hover:bg-white transition-all cursor-pointer flex gap-2">
              <LogOut />
              <h1>Odjavi se</h1>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}
