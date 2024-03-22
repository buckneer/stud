import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/service/Register/Register';
import SubjectAdd from './pages/service/SubjectAdd/SubjectAdd';
import StudentAdd from './pages/service/StudentAdd/StudentAdd';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register/>} />
        <Route path='/subject/add' element={<SubjectAdd/>} />
        <Route path='/student/add' element={<StudentAdd/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
