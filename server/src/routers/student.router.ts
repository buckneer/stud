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
	handleGetStudentsBySemester,
	handleRemoveStudentFromSubject,
	handleUpdateStudent,
	removeExamFromStudent
} from "../controllers/student.controller";
import {handleGetAvailableExamsInPeriod} from "../controllers/period.controller";
import {AuthGuard, userGuard} from "../middleware/routeGuard";


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
router.patch('/subject/',
	userGuard,
	AuthGuard([studentRoles.student]), handleAddSubjectsToStudent);

export {router as studentRouter};
