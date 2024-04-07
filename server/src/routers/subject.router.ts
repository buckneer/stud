import express from "express";
import {
	handleAddRequiredsToSubject,
	handleAddSubject,
	handleGetAvailableOptionalSubjects,
	handleGetAvailableReqSubjects,
	handleGetEnrollableSubjects,
	handleGetOptionalSubjects,
	handleGetProfessorSubjects,
	handleGetSubject,
	handleGetSubjectRole,
	handleGetSubjects,
	handleRemoveProfessorFromSubject,
	handleRemoveRequiredFromSubject,
	handleUpdateSubject
} from "../controllers/subject.controller";
import {handleAddProfessorsToSubject, handleGiveSign} from "../controllers/professor.controller";
import {AuthGuard, userGuard} from "../middleware/routeGuard";

const profRoles = {
	professor: {role: 'professor'},
	addGrade: {role: 'professor', }
}

const router = express.Router({mergeParams: true});


// uni/:uni/subject ...
router.post('/', handleAddSubject);
router.patch('/:sub/', handleUpdateSubject);
router.get('/:sub/', handleGetSubject);
router.get('/subject/department/:dep/', handleGetSubjects);
router.get('/', handleGetSubjects);
router.patch('/:sub/professor/', handleAddProfessorsToSubject);
router.delete('/:sub/professor/', handleRemoveProfessorFromSubject);
router.patch('/:sub/required/', handleAddRequiredsToSubject);
router.delete('/:sub/required/', handleRemoveRequiredFromSubject);
router.get('/:sub/role/:role/', handleGetSubjectRole);
router.patch('/:sub/sign/', handleGiveSign);

router.get('/professor/active/',
	userGuard,
	AuthGuard([profRoles.professor]), handleGetProfessorSubjects);

router.get('/department/:dep/required/', handleGetAvailableReqSubjects);

router.get('/department/:dep/',
	userGuard,
	AuthGuard([{role: 'student'}]), handleGetEnrollableSubjects)

router.get('/department/:dep/optional',
	userGuard,
	AuthGuard([{role: 'student'}]),
	handleGetOptionalSubjects);

	router.get('/department/:dep/optional/available', handleGetAvailableOptionalSubjects);
export {router as subjectRouter};
