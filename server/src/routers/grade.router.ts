import express from "express";
import {AuthGuard, userGuard} from "../middleware/routeGuard";
import {
	handleAddGrade,
	handleConfirmGrade,
	handleGetGrade,
	handleGetGrades,
	handleGetGradesByPeriod,
	handleGetGradesBySubject,
	handleGetStats,
	handleUpdateGrade
} from "../controllers/grade.controller";



const router = express.Router({mergeParams: true});

router.post('/', userGuard, handleAddGrade);
router.patch('/:grade/', handleUpdateGrade);
router.patch('/:grade/confirm', userGuard, handleConfirmGrade);
router.get('/:grade/', handleGetGrade);
router.get("/subject/:sub", handleGetGradesBySubject);
router.get("/subject/:sub/period/:period", handleGetGradesByPeriod)
router.get('/', handleGetGrades);

router.get('/student/stats', userGuard, handleGetStats);

export {router as gradeRouter};
