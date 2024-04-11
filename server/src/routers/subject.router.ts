import express from "express";
import {
	handleAddRequiredsToSubject,
	handleAddSubject,
	handleGetAvailableOptionalSubjects,
	handleGetAvailableReqSubjects,
	handleGetEnrollableSubjects,
	handleGetOptionalSubjects,
	handleGetProfessorsOnSubject,
	handleGetProfessorSubjects,
	handleGetSubject,
	handleGetSubjectRole,
	handleGetSubjects, handleGetSubjectsForExam,
	handleRemoveProfessorFromSubject,
	handleRemoveRequiredFromSubject,
	handleUpdateSubject
} from "../controllers/subject.controller";
import {handleAddProfessorsToSubject, handleGiveSign} from "../controllers/professor.controller";
import {AuthGuard, isProfessorOnSubject, userGuard} from "../middleware/routeGuard";

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
router.get('/period/:period', handleGetSubjectsForExam);
router.get('/', handleGetSubjects);
router.patch('/:sub/professor/', handleAddProfessorsToSubject);
router.delete('/:sub/professor/', handleRemoveProfessorFromSubject);
router.patch('/:sub/required/', handleAddRequiredsToSubject);
router.delete('/:sub/required/', handleRemoveRequiredFromSubject);
router.get('/:sub/role/:role/', handleGetSubjectRole);
router.patch('/:sub/sign/', userGuard, AuthGuard([
	{
		role: 'professor',
		when: isProfessorOnSubject
	}
]), handleGiveSign);

router.get('/:sub/professor', handleGetProfessorsOnSubject);
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
