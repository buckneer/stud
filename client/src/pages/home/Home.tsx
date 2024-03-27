import React from 'react'
import {GraduationCap} from "lucide-react";
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
        <div className="lists-container flex-1 h-full overflow-y-scroll">
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
        <div className='sidebar bg-slate-100 p-5'>
          <h1>Hello World</h1>
        </div>
      </div>

    </div>
  )
}
