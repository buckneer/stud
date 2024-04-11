import express from "express";
import {
	handleAddExamsToStudent,
	handleAddStudent,
	handleAddStudentToSubjects,
	handleAddSubjectsToCompleted, handleAddSubjectsToStudent,
	handleDeleteStudent,
	handleGetStudent,
	handleGetStudentGrades,
	handleGetStudents,
	handleGetStudentsBySemester, handleGetStudentsBySubject,
	handleGetStudentSubjects,
	handleRemoveStudentFromSubject,
	handleUpdateStudent,
	removeExamFromStudent
} from "../controllers/student.controller";
import {handleGetAvailableExamsInPeriod} from "../controllers/period.controller";
import {AuthGuard, isProfessorOnSubject, isServiceInUniversity, userGuard} from "../middleware/routeGuard";


const studentRoles = {
	student: {role: 'student'}
}


const router = express.Router({mergeParams: true});

router.get('/', handleGetStudents);
router.post('/', handleAddStudent);
// app.post('/uni/:university/student', handleAddStudent);
router.get('/:stud/', handleGetStudent);
router.delete('/:stud/', handleDeleteStudent);
router.patch('/:stud/', handleUpdateStudent);
router.patch('/:stud/exam/', handleAddExamsToStudent);
router.delete('/:stud/exam/', removeExamFromStudent);
router.get('/:stud/grade/', handleGetStudentGrades);
router.get('/:stud/period/exam/', handleGetAvailableExamsInPeriod);

// TODO CHANGED!!!
router.patch('/:stud/subject/', handleAddStudentToSubjects);
router.delete('/:stud/subject/', handleRemoveStudentFromSubject);
router.patch('/:stud/subject/completed/', handleAddSubjectsToCompleted);
router.get('/semester/', handleGetStudentsBySemester);
router.get(['/:stud/current/subject', '/current/subject'], userGuard, handleGetStudentSubjects);
router.patch('/subject/add',
	userGuard,
	AuthGuard([studentRoles.student]), handleAddSubjectsToStudent);

router.get('/subject/:sub/', userGuard,
	AuthGuard([
		{
			role: 'professor',
			when: isProfessorOnSubject
		},
		{
			role: 'service',
			when: isServiceInUniversity
		}
	]), handleGetStudentsBySubject);

export {router as studentRouter};
