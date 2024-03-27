import React from 'react'
import {GraduationCap} from "lucide-react";
import RandomBlob from "../../components/RandomBlob/RandomBlob";

export default function Home() {
  return (
    <div className="bg-white">
      <div className="flex h-full">
        <div className="lists-container flex-1">
          <div className="list-header flex justify-between p-5 ">
            <h1 className="font-black text-3xl">Studenti</h1>
            <div className="search-container">
              <input className='border-0 rounded-2xl bg-slate-100' type="text" placeholder="Pretraga" />
            </div>
          </div>
          <div className="lists grid grid-cols-3 gap-10 mx-5">
            <div className="card overflow-hidden p-0  w-full">
              <div className="flex justify-between p-5">
                <div className="flex flex-col justify-center items-center font-black">
                  <div className="">
                    1
                  </div>
                  <div className="">
                    Sem
                  </div>
                </div>
                <div className="icon text-blue-300">
                  <RandomBlob width={100} height={100} />
                </div>
              </div>
              <div className="bg-slate-100 p-3">
                <h1 className=' font-black'>Neki Korisnik</h1>
                <p>miftarisimel@gmail.com</p>
              </div>
            </div>
            <div className="card overflow-hidden p-0  w-full">
              <div className="flex justify-between p-5">
                <div className="flex flex-col justify-center items-center font-black">
                  <div className="">
                    1
                  </div>
                  <div className="">
                    Sem
                  </div>
                </div>
                <div className="icon text-blue-300">
                  <RandomBlob width={100} height={100} />
                </div>
              </div>
              <div className="bg-slate-100 p-3">
                <h1 className=' font-black'>Neki Korisnik</h1>
                <p>miftarisimel@gmail.com</p>
              </div>
            </div>
            <div className="card overflow-hidden p-0  w-full">
              <div className="flex justify-between p-5">
                <div className="flex flex-col justify-center items-center font-black">
                  <div className="">
                    1
                  </div>
                  <div className="">
                    Sem
                  </div>
                </div>
                <div className="icon text-blue-300">
                  <RandomBlob width={100} height={100} />
                </div>
              </div>
              <div className="bg-slate-100 p-3">
                <h1 className=' font-black'>Neki Korisnik</h1>
                <p>miftarisimel@gmail.com</p>
              </div>
            </div>
            <div className="card overflow-hidden p-0  w-full">
              <div className="flex justify-between p-5">
                <div className="flex flex-col justify-center items-center font-black">
                  <div className="">
                    1
                  </div>
                  <div className="">
                    Sem
                  </div>
                </div>
                <div className="icon text-blue-300">
                  <RandomBlob width={100} height={100} />
                </div>
              </div>
              <div className="bg-slate-100 p-3">
                <h1 className=' font-black'>Neki Korisnik</h1>
                <p>miftarisimel@gmail.com</p>
              </div>
            </div>
            <div className="card overflow-hidden p-0  w-full">
              <div className="flex justify-between p-5">
                <div className="flex flex-col justify-center items-center font-black">
                  <div className="">
                    1
                  </div>
                  <div className="">
                    Sem
                  </div>
                </div>
                <div className="icon text-blue-300">
                  <RandomBlob width={100} height={100} />
                </div>
              </div>
              <div className="bg-slate-100 p-3">
                <h1 className=' font-black'>Neki Korisnik</h1>
                <p>miftarisimel@gmail.com</p>
              </div>
            </div>
            <div className="card overflow-hidden p-0  w-full">
              <div className="flex justify-between p-5">
                <div className="flex flex-col justify-center items-center font-black">
                  <div className="">
                    1
                  </div>
                  <div className="">
                    Sem
                  </div>
                </div>
                <div className="icon text-blue-300">
                  <RandomBlob width={100} height={100} />
                </div>
              </div>
              <div className="bg-slate-100 p-3">
                <h1 className=' font-black'>Neki Korisnik</h1>
                <p>miftarisimel@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
        <div className='sidebar bg-slate-100 p-5'>
          <h1>Hello World</h1>
        </div>
      </div>

    </div>
  )
}
