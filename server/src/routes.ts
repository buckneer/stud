
import { handleAddProfessor, handleGetProfessor, handleGetProfessors, handleUpdateProfessor } from "controllers/professor.controller";
import { handleAddStudent, handleDeleteStudent, handleGetStudent, handleGetStudents } from "./controllers/student.controller";
import { handleAddStudentsUni, handleGetAllUnis, handleNewUni } from "./controllers/university.controller";
import { handleLogin, handleLogout, handleRefresh, handleRegister, handleSendPasswordMail, handleSetPassword } from "./controllers/user.controller";
import {Express, Request, Response} from "express";


export default function (app: Express) {
    app.get("/healthcheck", (request: Request, response: Response) => response.sendStatus(200));


    // Session
    app.post('/login', handleLogin);
    app.post('/refresh', handleRefresh);
    app.post('/logout', handleLogout);
    
    // User
    app.post('/register', handleRegister);
    app.patch('/password', handleSetPassword);
    app.post('/password', handleSendPasswordMail);

    // University
    app.post('/uni', handleNewUni);
    app.get('/uni', handleGetAllUnis);
    app.patch('/uni', handleAddStudentsUni);

    // Student
    app.post('/student/:university/:user', handleAddStudent);
    app.get(['/student', '/student/:university'], handleGetStudents);
    app.get('/student/:id', handleGetStudent);
    app.delete('/student/:id', handleDeleteStudent);

    // Professor
    app.post('/professor/:university/:user', handleAddProfessor);
    app.get('/professor/:professor', handleGetProfessor);
    app.get('/professor', handleGetProfessors);
    app.patch('/professor/:professor', handleUpdateProfessor);

}
