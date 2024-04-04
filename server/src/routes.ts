
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
import { handleAddDepartment, handleAddProfessorToDepartment, handleAddStudentsToDepartment, handleAddSubjectsToDepartment, handleGetDepartment, handleGetDepartments, handleRemoveProfessorFromDepartment, handleRemoveStudentFromDepartment, handleRemoveSubjectFromDepartment, handleUpdateDepartment } from "./controllers/department.controller";
import {
    handleAddProfessorToManySubjects,
    handleAddRequiredsToSubject,
    handleAddSubject,
    handleAddSubjectsToOptional,
    handleGetAvailableReqSubjects, handleGetEnrollableSubjects, handleGetOptionalSubjects, handleGetProfessorSubjects,
    handleGetSubject,
    handleGetSubjectRole,
    handleGetSubjects,
    handleRemoveProfessorFromSubject,
    handleRemoveRequiredFromSubject,
    handleUpdateSubject
} from "./controllers/subject.controller";
import { handleAddGrade, handleGetGrade, handleGetGrades, handleUpdateGrade } from "./controllers/grade.controller";
import {
    handleAddExam,
    handleAddGradesToExam,
    handleAddStudentsToExam,
    handleAddStudentToExams, handleExamsCanAdd,
    handleGetExam,
    handleGetExams,
    handleGetGradesByExam, handleGetPendingProfessorExams,
    handleGetStudentExams,
    handleGetUniExams,
    handleRemoveGradeFromExam,
    handleRemoveStudentFromExam,
    handleUpdateExam
} from "./controllers/exam.controller";
import { handleAddExamToPeriod, handleAddPeriod, handleGetAvailableExamsInPeriod, handleGetPeriod, handleGetPeriods, handleGetUniPeriods, handleRemoveExamFromPeriod, handleUpdatePeriod } from "./controllers/period.controller";
import { handleAddService, handleGetServiceGrades, handleGetServices } from "./controllers/service.controller";
import {
    handleAddExamsToStudent,
    handleAddStudent, handleAddStudentToSubjects, handleAddSubjectsToCompleted,
    handleDeleteStudent,
    handleGetStudent,
    handleGetStudentGrades,
    handleGetStudents, handleGetStudentsByDepartment, handleGetStudentsBySemester, handleRemoveStudentFromSubject, handleUpdateStudent, removeExamFromStudent
} from "./controllers/student.controller";
import { handleAddOptional, handleGetOptional } from "./controllers/optional.controller";


// TEST TOKENS:
// STUDENT: (student3) eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MGQ0OWZlMmZjMDQ2Nzc5NDE5NmU3NCIsImVtYWlsIjoic3R1ZGVudDNAZ21haWwuY29tIiwicm9sZXMiOlsic3R1ZGVudCJdLCJpYXQiOjE3MTIxOTIzNjR9.GgR-cOHj_5CHt5uo1fF-8FZtwz8MbOvaLC57e618zWA
// PROFESSOR: (profesor) eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MGQ0YTMzMmZjMDQ2Nzc5NDE5NmU4NyIsImVtYWlsIjoicHJvZmVzb3JAZ21haWwuY29tIiwicm9sZXMiOlsicHJvZmVzc29yIl0sImlhdCI6MTcxMjE5MjQxN30.9B4_2VFrd-0jyfGq-DkdotM1I7O4YZeDmu1zYDS49Jg
// SERVICE: (miftarisimel) eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDU4MDc2Zjk3YjJhZDUyYTI0OTMxNiIsImVtYWlsIjoibWlmdGFyaXNpbWVsQGdtYWlsLmNvbSIsInJvbGVzIjpbInNlcnZpY2UiLCJzdHVkZW50Il0sImlhdCI6MTcxMjE5MjQ2M30.bun4bzNd0QJMwEmi4GTK402-ZAA4I4Y2pQs37uByvkY

const serviceRoles = {
    university: {role: 'service', when: isServiceInUniversity}
}

const profRoles = {
    getSubjects: {role: 'professor'},
    addGrade: {role: 'professor', }
}

export default function (app: Express) {
    app.get("/thanks", (request: Request, response: Response) => response.status(200).send({ message: 'Hvala Vam puno što koristite naše usluge! :)' }));

    app.get("/healthcheck", (request: Request, response: Response) => response.sendStatus(200));
    app.get('/protected', userGuard, (request: Request, response: Response) => response.sendStatus(200));
    app.get('/protected/user', userGuard, roleGuard(['student']), (request: Request, response: Response) => response.sendStatus(200));
    app.get('/protected/professor', userGuard, roleGuard(['professor']), (request: Request, response: Response) => response.sendStatus(200));
    app.get('/protected/service', userGuard, roleGuard(['service']), (request: Request, response: Response) => response.sendStatus(200));

    //app.get('/protected/', userGuard, roleGuard(['professor', 'service']), (request: Request, response: Response) => response.sendStatus(200));
    app.get('/protected/uni/:uni/', userGuard, AuthGuard([serviceRoles.university]), (request: Request, response: Response) => response.sendStatus(200));

    // Session
    app.post('/login/', handleLogin);
    app.post('/refresh/', handleRefresh);
    app.post('/logout/', handleLogout);

    // User
    app.post('/register/', userGuard, handleRegister);
    app.patch('/password/', handleSetPassword);
    app.post('/password/', handleSendPasswordMail);
    app.patch('/user/:id/uni/', handleAddUnisToUser);
    app.delete('/user/:id/uni/', handleRemoveUniFromUser);
    app.get('/user/:id/', handleGetUser);
    app.get('/uni/:uni/user/:role/pending/', handleGetPendingUsers);
    app.delete('/user', handleUserDelete);
    app.get('/user/:id/uni/role/:role/', handleGetUserUnisByRole);


    // University
    app.post('/uni/', handleNewUni);
    app.get('/uni/', handleGetAllUnis);
    app.get('/uni/:uni/', handleGetUni);
    app.patch('/uni/', handleAddStudentsUni);
    app.patch('/uni/'); // <-- TREBA DA SE SREDI!
    app.patch('/uni/:uni/professor/', handleAddProfessorsToUni);
    app.patch('/uni/:uni/student/', handleAddStudentsToUni);
    app.patch('/uni/:uni/department', handleAddDepartmentsToUni);
    app.delete('/uni/:uni/department/', handleRemoveDepartmentFromUni);
    app.patch('/uni/:uni/service/', handleAddServicesToUni);
    app.delete('/uni/:uni/service/', handleRemoveServiceFromUni);
    app.get('/uni/:uni/period/',  handleGetUniPeriods);
    app.get('/uni/:uni/exam/', handleGetUniExams);


    // Student
    app.post('/student/', /* userGuard, roleGuard('service'), */ handleAddStudent);
    // app.post('/uni/:university/student', handleAddStudent);
    app.get(['/student/', '/uni/:university/student/'], handleGetStudents);
    app.get('/student/:id/', handleGetStudent);
    app.delete('/student/:id/', handleDeleteStudent);
    app.patch('/student/:id/', handleUpdateStudent);
    app.patch('/student/:id/exam/', handleAddExamsToStudent);
    app.delete('/student/:id/exam/', removeExamFromStudent);
    app.get('/student/:id/grade/', handleGetStudentGrades);
    app.get('/student/:id/period/exam/', handleGetAvailableExamsInPeriod);
    // added here...:
    app.patch('/subject/student/:id/', handleAddStudentToSubjects);
    app.delete('/subject/student/:id/', handleRemoveStudentFromSubject);
    //          ????
    app.patch('/completed_subject/student/:id/', handleAddSubjectsToCompleted);
    app.get('/uni/:id/student/semester', handleGetStudentsBySemester);


    // Professor
    app.post('/professor/', handleAddProfessor);
    app.get('/professor/:professor/', handleGetProfessor);
    app.get('/uni/:university/professor/', handleGetProfessors); // <- add all university professors
    app.patch('/professor/:professor/', handleUpdateProfessor);
    app.patch('/professor/:id/subject/', handleAddProfessorToManySubjects);
    app.patch('/professor/:id/grade/', handleAddGradesToProfessor);
    app.delete('/professor/:id/grade/', handleRemoveGradeFromProfessor);
    app.patch('/professor/:id/uni/', handleAddUniToProfessor);
    app.delete('/professor/:id/uni/', handleRemoveUniFromProfessor);
    app.patch('/professor/:id/subject/', handleAddSubjectsToProfessor);
    app.delete('/professor/:id/subject/', handleRemoveProfessorFromUni);
    app.get('/professor/:id/grade/', handleGetProfessorGrades);

    // Departments
    app.post('/uni/:uni/department/', handleAddDepartment);
    app.patch('/department/:department/', handleUpdateDepartment);
    app.get('/department/:department/', handleGetDepartment);
    app.get('/uni/:university/department/', handleGetDepartments);
    app.patch('/department/:id/student/', handleAddStudentsToDepartment);
    app.delete('/department/:id/student/', handleRemoveStudentFromDepartment);
    app.patch('/department/:id/professor/', handleAddProfessorToDepartment);
    app.delete('/department/:id/professor/', handleRemoveProfessorFromDepartment);
    app.patch('/department/:id/subject/', handleAddSubjectsToDepartment);
    app.delete('/department/:id/subject', handleRemoveSubjectFromDepartment);
    app.get('/department/:id/student/', handleGetStudentsByDepartment);

    // Subject
    app.post('/subject/', handleAddSubject);
    app.patch('/subject/:id/', handleUpdateSubject);
    app.get('/subject/:id/', handleGetSubject);
    app.get('/department/:dep/subject/', handleGetSubjects);
    app.get('/uni/:uni/subject/', handleGetSubjects);
    app.patch('/subject/:id/professor/', handleAddProfessorsToSubject);
    app.delete('/subject/:id/professor/', handleRemoveProfessorFromSubject);
    app.patch('/subject/:id/required/', handleAddRequiredsToSubject);
    app.delete('/subject/:id/required/', handleRemoveRequiredFromSubject);
    app.get('/subject/:id/role/:role/', handleGetSubjectRole);
    app.patch('/sign/subject/:id/', handleGiveSign);
    app.get('/uni/:uni/subjects/professor/',
        userGuard,
        AuthGuard([{role: 'professor'}]), handleGetProfessorSubjects);
    app.get('/uni/:uni/dep/:dep/subject/req/', handleGetAvailableReqSubjects);
    app.get('/uni/:uni/dep/:dep/subject/', handleGetEnrollableSubjects)
    app.get('/uni/:uni/dep/:dep/subject/optional', handleGetOptionalSubjects);

    // Optional
    app.post('/optional/', handleAddOptional);
    app.get('/uni/:uni/optional', handleGetOptional);
    app.patch('/uni/:uni/optional/:opt/subject/', handleAddSubjectsToOptional);

    // Grade
    app.post('/grades/', handleAddGrade);
    app.patch('/grades/:id/', handleUpdateGrade);
    app.get('/grades/:id/', handleGetGrade);
    app.get('/grades/', handleGetGrades);

    // Exam
    app.post('/exam/', handleAddExam);
    app.patch('/exam/:id/', handleUpdateExam);
    app.get('/exam/:id/', handleGetExam);
    app.get('/exam/', handleGetExams);
    app.patch('/exam/:id/student/', handleAddStudentsToExam);
    app.delete('/exam/:id/student/', handleRemoveStudentFromExam);
    app.patch('/exam/:id/grade/', handleAddGradesToExam);
    app.delete('/exam/:id/grade/', handleRemoveGradeFromExam);
    app.get('/exam/:id/grade/', handleGetGradesByExam);
    app.get('/student/:id/status/:status/', handleGetStudentExams);
    app.post('/exam/student/:id', handleAddStudentToExams);
    app.get('/exam/period/:period/pending', userGuard, handleGetPendingProfessorExams);
    app.get('/uni/:uni/exam/student/:id', handleExamsCanAdd);

    // Period
    app.post('/period/', handleAddPeriod);
    app.patch('/period/:id/', handleUpdatePeriod);
    app.get('/period/:id/', handleGetPeriod);
    app.get('/period/', handleGetPeriods);
    app.patch('/period/:id/exam/', handleAddExamToPeriod);
    app.delete('/period/:id/exam/', handleRemoveExamFromPeriod);


    // Service
    app.post('/service/', handleAddService);
    app.get('/uni/:id/service/', handleGetServices); // uni services...
    app.delete('/service/:id/'); // <-- IMPLEMENT THIS...
    app.get('/service/:id/grade/', handleGetServiceGrades);

}
