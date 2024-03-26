import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

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
import Navbar from './components/navbar';

function App() {
  const session = useSelector((state: RootState) => state.session);

  return (
    <BrowserRouter>
      <div className='flex flex-col h-screen'>
        {/* Prevents navbar from rendering if user is not logged in... */}
        { session.refreshToken ? <Navbar /> : null }

        <Container>
          <Routes>
            <Route path='/login' element={<Login />} />

            {/* User has to be logged in to access these */}
            <Route element={<TokenRequired />}>
              <Route path='/' element={<Home />} />
              {/* TODO: check if user is in uni :uni service here... */}
              <Route path='/register' element={<Register/>} />
              <Route path='/uni/:uni/subject/add' element={<SubjectAdd/>} />
              <Route path='/uni/:uni/student/add' element={<StudentAdd/>} />
              <Route path='/uni/:uni/professor/add' element={<ProfessorAdd/>} />
              <Route path='/uni/:uni/department/add' element={<DepartmentAdd/>} />
              <Route path='/uni/:uni/department/:dep/period/add' element={<PeriodAdd/>} />
              <Route path='/uni/:uni/department/:dep/exam/add' element={<ExamAdd/>} />
              <Route path='/uni/:uni/department/:dep/grade/add' element={<GradeAdd/>} />
              <Route path='/uni/:uni/service/add' element={<ServiceAdd/>} />

              {/* User has to have admin privileges */}
              {/* TODO: CHANGE THIS TO AdminRequired! */}
              <Route element={<TokenRequired />}>
                <Route path='/admin/uni/add' element={<UniAdd />}/>
              </Route>

            </Route>


          </Routes>
        </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;
