import express from "express";
import {
	handleAddExam,
	handleAddGradesToExam,
	handleAddStudentsToExam, handleAddStudentToExams, handleExamsCanAdd,
	handleGetExam,
	handleGetExams,
	handleGetGradesByExam, handleGetPendingProfessorExams,
	handleGetStudentExams,
	handleRemoveGradeFromExam,
	handleRemoveStudentFromExam,
	handleUpdateExam
} from "../controllers/exam.controller";
import {userGuard} from "../middleware/routeGuard";



const router = express.Router({mergeParams: true});

router.get('/', handleGetExams);
router.get('/:exam/', handleGetExam);
router.get('/:exam/grade/', handleGetGradesByExam);
router.get('/student/:stud', handleExamsCanAdd);
router.get('/student/:stud/status/:status', handleGetStudentExams);
router.get('/period/:period/pending', userGuard, handleGetPendingProfessorExams);

router.post('/', handleAddExam);
router.post('/student/:stud', handleAddStudentToExams);

router.patch('/:exam/', handleUpdateExam);
router.patch('/:exam/grade/', handleAddGradesToExam);
router.patch('/:exam/student/', handleAddStudentsToExam);

router.delete('/:exam/student/', handleRemoveStudentFromExam);
router.delete('/:exam/grade/', handleRemoveGradeFromExam);

export {router as examRouter};
