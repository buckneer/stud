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
  Component,
  UserCircle
} from "lucide-react";

import Loader from "../../components/Loader/Loader";
import UserItem from "../../components/UserItem/UserItem";
import {Helmet} from "react-helmet";
import SidebarItem from "../../components/SidebarItem/SidebarItem";
import {useParams} from "react-router-dom";
import UserContent from "../../components/UserContent/UserContent";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import DepartmentHome from '../department/DepartmentHome/DepartmentHome';
import { setMetadata } from '../../app/slices/sessionSlice';
import SubjectsTab from '../service/Subjects/SubjectsTab';
import ServicePeriod from "./ServicePeriod";
import ServiceExam from './ServiceExam';

const university: string = "65fafc2da919db458f7ed90d";
const role: string = "student";
export default function Home() {
  const session = useSelector((state: RootState) => state.session);
  const dispatch = useDispatch();
  const { uni } = useParams();
  const titles = ["Studenti", "Profesori", "STUD Sluzba"];
  const engRoles = ["student", "professor", "service"];


  const handleDataChange = (changeTo: number) => {
    dispatch(setMetadata({ serviceHome: changeTo }))
  }

  return (
    <div className="bg-white">
      <Helmet>
        <title>Početna | Stud</title>
      </Helmet>
      <div className="flex h-full">
        { session.metadata.serviceHome === 0 && <UserContent title={titles[0]} university={uni!} role={engRoles[0]} /> }
        { session.metadata.serviceHome === 1 && <UserContent title={titles[1]} university={uni!} role={engRoles[1]} /> }
        { session.metadata.serviceHome === 2 && <UserContent title={titles[2]} university={uni!} role={engRoles[2]} /> }
        { session.metadata.serviceHome === 3 && <ServicePeriod /> }
        { session.metadata.serviceHome === 4 && <ServiceExam /> }
        { session.metadata.serviceHome === 5 && <DepartmentHome /> }
        { session.metadata.serviceHome === 6 && <SubjectsTab /> }
        <Sidebar role="service">
          <div className="">
            <SidebarItem name="Studenti" to={0} Icon={GraduationCap} active={session.metadata.serviceHome === 0} changeData={handleDataChange} />
            <SidebarItem name="Profesori" to={1} Icon={User} active={session.metadata.serviceHome === 1} changeData={handleDataChange} />
            <SidebarItem name="STUD Služba" to={2} Icon={FolderArchive} active={session.metadata.serviceHome === 2} changeData={handleDataChange}/>
          </div>
          <div className="pt-1">
            <SidebarItem name="Ispitni Rokovi" to={3} active={session.metadata.serviceHome === 3} changeData={handleDataChange} Icon={CalendarCheck} />
            <SidebarItem name="Ispiti" to={4} active={session.metadata.serviceHome === 4} changeData={handleDataChange}  Icon={LayoutList} />
            <SidebarItem name="Odseci" to={5} Icon={Component} active={session.metadata.serviceHome === 5} changeData={handleDataChange} />
            <SidebarItem name="Predmeti" to={6} Icon={Book} active={session.metadata.serviceHome === 6} changeData={handleDataChange} />
          </div>
        </Sidebar>
      </div>

    </div>
  )
}
