import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import Login from './pages/Login/Login';
import Register from './pages/service/Register/Register';
import SubjectAdd from './pages/service/SubjectAdd/SubjectAdd';
import StudentAdd from './pages/service/StudentAdd/StudentAdd';

import Home from './pages/home/Home';

import ProfessorAdd from './pages/service/ProfessorAdd/ProfessorAdd';
import DepartmentAdd from './pages/service/DepartmentAdd/DepartmentAdd';
import PeriodAdd from './pages/service/PeriodAdd/PeriodAdd';
import ExamAdd from './pages/service/ExamAdd/ExamAdd';
import GradeAdd from './pages/service/GradeAdd/GradeAdd';
import ServiceAdd from './pages/service/ServiceAdd/ServiceAdd';

import TokenRequired from './components/auth/TokenRequired';
import { useSelector } from 'react-redux';
import { RootState } from './app/store';
import UniAdd from './pages/admin/UniAdd/UniAdd';
import Container from './components/container';
import Navbar from './components/Navbar';
import SetPassword from './pages/SetPassword/SetPassword';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import NotFound from "./pages/NotFound/NotFound";
import StudentHome from "./pages/student/StudentHome/StudentHome";

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
              <Route path='/uni/:uni/' element={<Home />} />
              {/* TODO: check if user is in uni :uni service here... */}
              <Route path='/uni/:uni/register' element={<Register/>} />
              <Route path='/uni/:uni/subject/add' element={<SubjectAdd/>} />
              <Route path='/uni/:uni/student/add' element={<StudentAdd/>} />
              <Route path='/uni/:uni/professor/add' element={<ProfessorAdd/>} />
              <Route path='/uni/:uni/department/add' element={<DepartmentAdd/>} />
              <Route path='/uni/:uni/period/add' element={<PeriodAdd/>} />
              <Route path='/uni/:uni/department/:dep/exam/add' element={<ExamAdd/>} />
              <Route path='/uni/:uni/department/:dep/grade/add' element={<GradeAdd/>} />
              <Route path='/uni/:uni/service/add' element={<ServiceAdd/>} />

              {/* STUDENT ROUTES */}
              <Route path='/uni/:uni/student' element={<StudentHome />} />
              {/* User has to have admin privileges */}
              {/* TODO: CHANGE THIS TO AdminRequired! */}
              <Route element={<TokenRequired />}>
                <Route path='/admin/uni/add' element={<UniAdd />}/>
              </Route>

            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;
