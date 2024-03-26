
import { handleAddProfessor, handleGetProfessor, handleGetProfessors, handleUpdateProfessor } from "./controllers/professor.controller";
import { handleAddStudent, handleAddStudentToSubjects, handleAddSubjectsToCompleted, handleDeleteStudent, handleGetStudent, handleGetStudents, handleRemoveStudentFromSubject, handleUpdateStudent } from "./controllers/student.controller";
import { handleAddStudentsUni, handleGetAllUnis, handleNewUni, handleGetUni, handleAddProfessorsToUni, handleAddStudentsToUni } from "./controllers/university.controller";
import { handleAddUnisToUser, handleGetUser, handleLogin, handleLogout, handleRefresh, handleRegister, handleRemoveUniFromUser, handleSendPasswordMail, handleSetPassword } from "./controllers/user.controller";
import { Express, Request, Response } from "express";
import { roleGuard, userGuard } from "./middleware/routeGuard";
import { handleAddDepartment, handleGetDepartment, handleGetDepartments, handleUpdateDepartment } from "./controllers/department.controller";
import { handleAddProfessorsToSubject, handleAddProfessorToManySubjects, handleAddSubject, handleGetSubject, handleGetSubjects, handleUpdateSubject } from "./controllers/subject.controller";
import { handleAddGrade, handleGetGrade, handleGetGrades, handleUpdateGrade } from "./controllers/grade.controller";
import { handleAddExam, handleGetExam, handleGetExams, handleUpdateExam } from "./controllers/exam.controller";
import { handleAddPeriod, handleGetPeriod, handleGetPeriods, handleUpdatePeriod } from "./controllers/period.controller";


export default function (app: Express) {
    app.get("/healthcheck", (request: Request, response: Response) => response.sendStatus(200));
    app.get('/protected', userGuard, (request: Request, response: Response) => response.sendStatus(200));
    app.get('/protected/user', userGuard, roleGuard('user'), (request: Request, response: Response) => response.sendStatus(200));
    app.get('/protected/admin', userGuard, roleGuard('admin'), (request: Request, response: Response) => response.sendStatus(200));
    app.get('/protected/service', userGuard, roleGuard('service'), (request: Request, response: Response) => response.sendStatus(200));

    // Session
    app.post('/login', handleLogin);
    app.post('/refresh', handleRefresh);
    app.post('/logout', handleLogout);
    
    // User
    app.post('/register', handleRegister);
    app.patch('/password', handleSetPassword);
    app.post('/password', handleSendPasswordMail);
    app.patch('/user/:id/uni/', handleAddUnisToUser);
    app.delete('/user/:id/uni/', handleRemoveUniFromUser);
    app.get('/user/:id', handleGetUser);

    // University
    app.post('/uni', handleNewUni);
    app.get('/uni', handleGetAllUnis);
    app.get('/uni/:id', handleGetUni);
    app.patch('/uni', handleAddStudentsUni);
    app.patch('/uni/')
    app.patch('/uni/:id/professor/', handleAddProfessorsToUni);
    app.patch('/uni/:id/student/', handleAddStudentsToUni)

    // Student
    app.post('/student/', /* userGuard, roleGuard('service'), */ handleAddStudent);
    // app.post('/uni/:university/student', handleAddStudent);
    app.get(['/student', '/uni/:university/student'], handleGetStudents);
    app.get('/student/:id', handleGetStudent);
    app.delete('/student/:id', handleDeleteStudent);
    app.patch('/student/:id', handleUpdateStudent);
    
    // added here...:
    app.patch('/subject/student/:id', handleAddStudentToSubjects);
    app.delete('/subject/student/:id', handleRemoveStudentFromSubject);
    //          ????
    app.patch('/completed_subject/student/:id', handleAddSubjectsToCompleted);

    // Professor
    app.post('/professor/', handleAddProfessor);
    app.get('/professor/:professor', handleGetProfessor);
    app.get('/uni/:university/professor', handleGetProfessors); // <- add all university professors
    app.patch('/professor/:professor', handleUpdateProfessor);
    app.patch('/professor/:id/subject', handleAddProfessorToManySubjects);

    // Departments
    app.post('/uni/:uni/department/', handleAddDepartment);
    app.patch('/department/:department', handleUpdateDepartment);
    app.get('/department/:department', handleGetDepartment);
    app.get('/uni/:university/department/', handleGetDepartments);

    // Subject
    app.post('/subject/', handleAddSubject);
    app.patch('/subject/:id', handleUpdateSubject);
    app.get('/subject/:id', handleGetSubject);
    app.get('/department/:dep/subject/', handleGetSubjects);
    app.get('/uni/:uni/subject/', handleGetSubjects);
    
    // Grade
    app.post('/grades/', handleAddGrade);
    app.patch('/grades/:id', handleUpdateGrade);
    app.get('/grades/:id', handleGetGrade);
    app.get('/grades/', handleGetGrades);

    // Exam
    app.post('/exam/', handleAddExam);
    app.patch('/exam/:id/', handleUpdateExam);
    app.get('/exam/:id/', handleGetExam);
    app.get('/exam/', handleGetExams);

    // Period
    app.post('/period', handleAddPeriod);
    app.patch('/period/:id', handleUpdatePeriod);
    app.get('/period/:id', handleGetPeriod);
    app.get('/period/', handleGetPeriods);

}
