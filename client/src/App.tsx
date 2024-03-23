import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/service/Register/Register';
import SubjectAdd from './pages/service/SubjectAdd/SubjectAdd';
import StudentAdd from './pages/service/StudentAdd/StudentAdd';
import Navbar from './components/navbar/navbar';
import Home from './pages/home/Home';
import Container from './components/container/Container';
import { useEffect, useState } from 'react';

function App() {


  return (
    <BrowserRouter>
      <div className='flex flex-col h-screen'>
        <Navbar />
        <Container>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register/>} />
            <Route path='/uni/:uni/subject/add' element={<SubjectAdd/>} />
            <Route path='/uni/:uni/student/add' element={<StudentAdd/>} />
          </Routes>
        </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;
