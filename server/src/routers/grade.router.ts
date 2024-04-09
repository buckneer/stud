import express from "express";
import {handleAddGrade, handleGetGrade, handleGetGrades, handleUpdateGrade} from "../controllers/grade.controller";
import {userGuard} from "../middleware/routeGuard";



const router = express.Router({mergeParams: true});

router.post('/', userGuard, handleAddGrade);
router.patch('/:grade/', handleUpdateGrade);
router.get('/:grade/', handleGetGrade);
router.get('/', handleGetGrades);

export {router as gradeRouter};
