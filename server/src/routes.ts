
import { handleAddStudent, handleDeleteStudent, handleGetStudent, handleGetStudents } from "./controllers/student.controller";
import { handleAddStudentsUni, handleGetAllUnis, handleNewUni } from "./controllers/university.controller";
import { handleLogin, handleLogout, handleRefresh, handleRegister, handleSendPasswordMail, handleSetPassword } from "./controllers/user.controller";
import {Express, Request, Response} from "express";


export default function (app: Express) {
    app.get("/healthcheck", (request: Request, response: Response) => response.sendStatus(200));


    // User
    app.post('/login', handleLogin);
    app.post('/register', handleRegister);
    app.post('/refresh', handleRefresh);
    app.post('/logout', handleLogout);

    app.patch('/password', handleSetPassword);
    app.post('/password', handleSendPasswordMail);

    // University
    app.post('/uni', handleNewUni);
    app.get('/uni', handleGetAllUnis);
    app.patch('/uni', handleAddStudentsUni);

    // Student
    app.post('/student', handleAddStudent);
    app.get('/student', handleGetStudents);
    app.get('/student/:id', handleGetStudent);
    app.delete('/student', handleDeleteStudent);

}
