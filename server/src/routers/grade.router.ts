import express from "express";
import {userGuard} from "../middleware/routeGuard";
import {handleAddGrade, handleGetGrade, handleGetGrades, handleGetStats, handleUpdateGrade} from "../controllers/grade.controller";



const router = express.Router({mergeParams: true});

router.post('/', userGuard, handleAddGrade);
router.patch('/:grade/', handleUpdateGrade);
router.get('/:grade/', handleGetGrade);
router.get('/', handleGetGrades);

router.get('/student/stats', userGuard, handleGetStats);

export {router as gradeRouter};
