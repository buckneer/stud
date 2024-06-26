import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './app/store';
import { Navigate } from 'react-router-dom';

import Login from './pages/Login/Login';
import Register from './pages/service/Register/Register';
import SubjectAdd from './pages/service/SubjectAdd/SubjectAdd';
import StudentAdd from './pages/service/StudentAdd/StudentAdd';

import Home from './pages/home/Home';

import ProfessorAdd from './pages/service/ProfessorAdd/ProfessorAdd';
import DepartmentAdd from './pages/service/DepartmentAdd/DepartmentAdd';
import DepartmentEdit from './pages/service/DepartmentEdit/DepartmentEdit';
import PeriodAdd from './pages/service/PeriodAdd/PeriodAdd';
import PeriodEdit from './pages/service/PeriodEdit/PeriodEdit';
import ExamAdd from './pages/service/ExamAdd/ExamAdd';
import GradeAdd from './pages/service/GradeAdd/GradeAdd';
import ServiceAdd from './pages/service/ServiceAdd/ServiceAdd';

import TokenRequired from './components/auth/TokenRequired';
import UniAdd from './pages/admin/UniAdd/UniAdd';
import Container from './components/container';
import Navbar from './components/Navbar';
import SetPassword from './pages/SetPassword/SetPassword';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import NotFound from "./pages/NotFound/NotFound";
import StudentHome from "./pages/student/StudentHome/StudentHome";
import SubjectEdit from './pages/service/SubjectEdit/SubjectEdit';
import StudentEdit from './pages/service/StudentEdit/StudentEdit';
import ExamEdit from './pages/service/ExamEdit/ExamEdit';
import Departments from "./pages/department/DepartmentHome/DepartmentHome"
import ProfessorHome from "./pages/professor/ProfessorHome/ProfessorHome";
import OptionalAdd from './pages/service/OptionalAdd/OptionalAdd';
import RoleGuard from './components/auth/RoleGuard';
import ProfessorEdit from './pages/service/ProfessorEdit/ProfessorEdit';
import Students from './pages/service/Students/Students';
import Student from './pages/service/Students/Student';

function App() {
  const session = useSelector((state: RootState) => state.session);

  return (
    <BrowserRouter>
      <div className='flex flex-col h-screen'>
        {/* Prevents Navbar from rendering if user is not logged in... */}
        {/*{ session.refreshToken ? <Navbar /> : null }*/}
        <Navbar />

        <Container>
          <Routes>
            {/*  GROUP 1 */}
            <Route path="/password/:code" element={<SetPassword />} />
            <Route path="/password" element={<SetPassword />} />

            {/* GROUP 2 */}
            <Route path='/reset/password/' element={<ResetPassword />} />
            <Route path='/reset/password/:email' element={<ResetPassword />} />

            <Route path='/login' element={<Login />} />

            {/* User has to be logged in to access these */}
            <Route element={<TokenRequired />}>
              {/* WHILE TESTING REPLACE THIS WITH roles={['service', 'professor', 'student']} IF NEEDED */}
              <Route element={<RoleGuard roles={['service']}/>}>
                <Route path='/uni/:uni/service' element={<Home />} />
                <Route path='/uni/:uni/register' element={<Register/>} />
                <Route path='/uni/:uni/subject/add' element={<SubjectAdd/>} />
                <Route path='/uni/:uni/subject/:id/edit' element={<SubjectEdit />} />
                <Route path='/uni/:uni/student/add' element={<StudentAdd/>} />
                <Route path='/uni/:uni/student/:id/edit' element={<StudentEdit />} />
                <Route path='/uni/:uni/professor/add' element={<ProfessorAdd/>} />
                <Route path='/uni/:uni/professor/:id/edit' element={<ProfessorEdit/>} />
                <Route path='/uni/:uni/department/add' element={<DepartmentAdd/>} />
                <Route path='/uni/:uni/department/:id/edit' element={<DepartmentEdit/>} />
                <Route path='/uni/:uni/period/add' element={<PeriodAdd/>} />
                <Route path='/uni/:uni/period/:id/edit' element={<PeriodEdit/>} />
                <Route path='/uni/:uni/period/:period/exam/add' element={<ExamAdd/>} />
                <Route path='/uni/:uni/exam/:id/edit' element={<ExamEdit />} />
                <Route path='/uni/:uni/grade/add' element={<GradeAdd/>} />
                <Route path='/uni/:uni/service/add' element={<ServiceAdd/>} />
                <Route path='/uni/:uni/department/:department/edit' element={<DepartmentEdit />} />
                <Route path="/uni/:uni/optional/add" element={<OptionalAdd />} />
                <Route path='/uni/:uni/department/' element={<Departments />} />
                <Route path="/uni/:uni/service/student" element={<Students />} />
                <Route path="/uni/:uni/service/student/:student/" element={<Student />} />
              </Route>

              <Route element={<RoleGuard roles={['student']} />}>
                <Route path='/uni/:uni/student' element={<StudentHome />} />
              </Route>

              <Route element={<RoleGuard roles={['professor']} />}>
                <Route path='/uni/:uni/professor' element={<ProfessorHome />} />
              </Route>

              {/* User has to have admin privileges */}
              {/* TODO: CHANGE THIS TO AdminRequired! */}
              <Route element={<TokenRequired />}>
                <Route path='/admin/uni/add' element={<UniAdd />}/>
              </Route>

              <Route path="/" element={<Navigate to={`/uni/${session.metadata.university}/${session.metadata.role}`} />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;
