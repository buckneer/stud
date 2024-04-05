import express from "express";
import {handleAddGrade, handleGetGrade, handleGetGrades, handleUpdateGrade} from "../controllers/grade.controller";



const router = express.Router({mergeParams: true});

router.post('/', handleAddGrade);
router.patch('/:grade/', handleUpdateGrade);
router.get('/:grade/', handleGetGrade);
router.get('/', handleGetGrades);

export {router as gradeRouter};
