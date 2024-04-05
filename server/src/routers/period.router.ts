import express from "express";
import {
	handleAddExamToPeriod,
	handleAddPeriod,
	handleGetPeriod,
	handleGetPeriods, handleRemoveExamFromPeriod,
	handleUpdatePeriod
} from "../controllers/period.controller";



const router = express.Router({mergeParams: true});

router.get('/', handleGetPeriods);
router.get('/:period/', handleGetPeriod);

router.post('/', handleAddPeriod);

router.patch('/:period/', handleUpdatePeriod);
router.patch('/:period/exam/', handleAddExamToPeriod);

router.delete('/:period/exam/', handleRemoveExamFromPeriod);

export {router as periodRouter};
