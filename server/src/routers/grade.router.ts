import express from "express";
import {handleAddGrade, handleGetGrade, handleGetGrades, handleGetStats, handleUpdateGrade} from "../controllers/grade.controller";
import { userGuard } from "../middleware/routeGuard";



const router = express.Router({mergeParams: true});

router.post('/', handleAddGrade);
router.patch('/:grade/', handleUpdateGrade);
router.get('/:grade/', handleGetGrade);
router.get('/', handleGetGrades);

router.get('/student/stats', userGuard, handleGetStats);

export {router as gradeRouter};
