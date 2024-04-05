
import { handleAddGradesToProfessor, handleAddProfessor, handleAddProfessorsToSubject, handleAddSubjectsToProfessor, handleAddUniToProfessor, handleGetProfessor, handleGetProfessorGrades, handleGetProfessors, handleGiveSign, handleRemoveGradeFromProfessor, handleRemoveUniFromProfessor, handleUpdateProfessor } from "./controllers/professor.controller";
import { handleAddStudentsUni, handleGetAllUnis, handleNewUni, handleGetUni, handleAddProfessorsToUni, handleAddStudentsToUni, handleAddDepartmentsToUni, handleRemoveDepartmentFromUni, handleAddServicesToUni, handleRemoveServiceFromUni, handleRemoveProfessorFromUni } from "./controllers/university.controller";
import {
    handleAddUnisToUser,
    handleGetPendingUsers,
    handleGetUser,
    handleGetUserUnisByRole,
    handleLogin,
    handleLogout,
    handleRefresh,
    handleRegister,
    handleRemoveUniFromUser,
    handleSendPasswordMail,
    handleSetPassword, handleUserDelete
} from "./controllers/user.controller";
import { Express, Request, Response } from "express";
import {AuthGuard, isServiceInUniversity, roleGuard, userGuard} from "./middleware/routeGuard";
import {depRouter} from "./routers/department.router";
import {sessionRouter} from "./routers/user.router";
import {uniRouter} from "./routers/university.router";
import {studentRouter} from "./routers/student.router";
import {professorRouter} from "./routers/professor.router";
import {subjectRouter} from "./routers/subject.router";
import {optionalRouter} from "./routers/optional.router";
import {gradeRouter} from "./routers/grade.router";
import {examRouter} from "./routers/exam.router";
import {periodRouter} from "./routers/period.router";
import {serviceRouter} from "./routers/service.router";


// TEST TOKENS:
// STUDENT: (student3) eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MGQ0OWZlMmZjMDQ2Nzc5NDE5NmU3NCIsImVtYWlsIjoic3R1ZGVudDNAZ21haWwuY29tIiwicm9sZXMiOlsic3R1ZGVudCJdLCJpYXQiOjE3MTIxOTIzNjR9.GgR-cOHj_5CHt5uo1fF-8FZtwz8MbOvaLC57e618zWA
// PROFESSOR: (profesor) eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MGQ0YTMzMmZjMDQ2Nzc5NDE5NmU4NyIsImVtYWlsIjoicHJvZmVzb3JAZ21haWwuY29tIiwicm9sZXMiOlsicHJvZmVzc29yIl0sImlhdCI6MTcxMjE5MjQxN30.9B4_2VFrd-0jyfGq-DkdotM1I7O4YZeDmu1zYDS49Jg
// SERVICE: (miftarisimel) eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDU4MDc2Zjk3YjJhZDUyYTI0OTMxNiIsImVtYWlsIjoibWlmdGFyaXNpbWVsQGdtYWlsLmNvbSIsInJvbGVzIjpbInNlcnZpY2UiLCJzdHVkZW50Il0sImlhdCI6MTcxMjE5MjQ2M30.bun4bzNd0QJMwEmi4GTK402-ZAA4I4Y2pQs37uByvkY

export const serviceRoles = {
    university: {role: 'service', when: isServiceInUniversity}
}



export const studentRoles = {
    student: {role: 'student'}
}

export default function (app: Express) {
    app.get("/thanks", (request: Request, response: Response) => response.status(200).send({ message: 'Hvala Vam puno što koristite naše usluge! :)' }));

    app.get("/healthcheck", (request: Request, response: Response) => response.sendStatus(200));

    app.post('/register/', userGuard, handleRegister);
    app.patch('/password/', handleSetPassword);
    app.post('/password/', handleSendPasswordMail);
    app.patch('/user/:id/uni/', handleAddUnisToUser);
    app.delete('/user/:id/uni/', handleRemoveUniFromUser);
    app.get('/user/:id/', handleGetUser);
    app.get('/uni/:uni/user/:role/pending/', handleGetPendingUsers);
    app.delete('/user', handleUserDelete);
    app.get('/user/:id/uni/role/:role/', handleGetUserUnisByRole);

    app.use('/', sessionRouter);
    app.use('/uni', uniRouter);
    app.use('/uni/:uni/department', depRouter);
    app.use('/uni/:uni/student', studentRouter);
    app.use('/uni/:uni/professor', professorRouter);
    app.use('/uni/:uni/subject', subjectRouter);
    app.use('/uni/:uni/optional', optionalRouter);
    app.use('/uni/:uni/grade', gradeRouter);
    app.use('/uni/:uni/exam', examRouter);
    app.use('/uni/:uni/period', periodRouter)
    app.use('/uni/:uni/service', serviceRouter);
}
