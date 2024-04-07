import express from "express";
import {
	handleAddDepartmentsToUni,
	handleAddProfessorsToUni, handleAddServicesToUni, handleAddStudentsToUni,
	handleAddStudentsUni,
	handleGetAllUnis,
	handleGetUni,
	handleNewUni, handleRemoveDepartmentFromUni, handleRemoveServiceFromUni
} from "../controllers/university.controller";
import {handleGetUniPeriods} from "../controllers/period.controller";
import {handleGetUniExams} from "../controllers/exam.controller";
import { handleGetUserRolesInUni } from "../controllers/user.controller";
import { userGuard } from "../middleware/routeGuard";


const router = express.Router({mergeParams: true});

router.get('/', handleGetAllUnis)
router.post('/', handleNewUni)
router.patch('/', handleAddStudentsUni)
router.get('/:uni/', handleGetUni)
// router.patch('/'); // <-- TREBA DA SE SREDI!

// SERVICE
router.patch('/:uni/service/', handleAddServicesToUni)
router.delete('/:uni/service/', handleRemoveServiceFromUni)

// PROFESSOR
router.patch('/:uni/professor/', handleAddProfessorsToUni)

// STUDENT
router.patch('/:uni/student/', handleAddStudentsToUni)
// DEPARTMENT
router.patch('/:uni/department', handleAddDepartmentsToUni)
router.delete('/:uni/department/', handleRemoveDepartmentFromUni)


// PERIOD
router.get('/:uni/period/',  handleGetUniPeriods);

// EXAM
router.get('/:uni/exam/', handleGetUniExams)


// USER
router.get('/:uni/user/', userGuard, handleGetUserRolesInUni);

export {router as uniRouter};
