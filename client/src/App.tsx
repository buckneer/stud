import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/service/Register/Register';
import Test from './pages/Test';
import SubjectAdd from './pages/service/SubjectAdd/SubjectAdd';
import StudentAdd from './pages/service/StudentAdd/StudentAdd';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/test' element={<Test />} />
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register/>} />
        <Route path='/addSubject' element={<SubjectAdd/>} />
        <Route path='/addStudent' element={<StudentAdd/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
