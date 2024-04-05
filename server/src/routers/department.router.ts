import express, {Request, Response} from "express";
import {
	handleAddDepartment,
	handleAddProfessorToDepartment,
	handleAddStudentsToDepartment,
	handleAddSubjectsToDepartment,
	handleGetDepartment,
	handleGetDepartments,
	handleRemoveProfessorFromDepartment,
	handleRemoveStudentFromDepartment,
	handleRemoveSubjectFromDepartment,
	handleUpdateDepartment
} from "../controllers/department.controller";
import {handleGetStudentsByDepartment} from "../controllers/student.controller";

const router = express.Router({mergeParams: true});


// /uni/:uni/department
router.get('/', handleGetDepartments);
router.post('/', handleAddDepartment);
router.get('/:department/', handleGetDepartment);
router.patch('/:department/', handleUpdateDepartment);

// STUDENT
router.get('/:department/student/', handleGetStudentsByDepartment);
router.patch('/:department/student/', handleAddStudentsToDepartment);
router.delete('/:department/student/', handleRemoveStudentFromDepartment);

// PROFESSOR
router.patch('/:department/professor/', handleAddProfessorToDepartment);
router.delete('/:department/professor/', handleRemoveProfessorFromDepartment);

// SUBJECT
router.patch('/:department/subject/', handleAddSubjectsToDepartment);
router.delete('/:department/subject', handleRemoveSubjectFromDepartment);



export {router as depRouter};
