import express from "express";
import {
	handleAddExamToPeriod,
	handleAddPeriod,
	handleGetActivePeriod,
	handleGetPeriod,
	handleGetPeriods, handleRemoveExamFromPeriod,
	handleSetPeriodActive,
	handleUpdatePeriod
} from "../controllers/period.controller";



const router = express.Router({mergeParams: true});

router.get('/', handleGetPeriods);
router.get('/:period/', handleGetPeriod);
router.get('/status/active/', handleGetActivePeriod);

router.post('/', handleAddPeriod);

router.patch('/:period/active/', handleSetPeriodActive);
router.patch('/:period/', handleUpdatePeriod);
router.patch('/:period/exam/', handleAddExamToPeriod);

router.delete('/:period/exam/', handleRemoveExamFromPeriod);

export {router as periodRouter};
