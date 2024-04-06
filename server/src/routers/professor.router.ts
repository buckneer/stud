import express from "express";
import {
	handleAddGradesToProfessor,
	handleAddProfessor, handleAddSubjectsToProfessor, handleAddUniToProfessor,
	handleGetProfessor, handleGetProfessorGrades,
	handleGetProfessors, handleRemoveGradeFromProfessor, handleRemoveUniFromProfessor,
	handleUpdateProfessor
} from "../controllers/professor.controller";
import {handleAddProfessorToManySubjects} from "../controllers/subject.controller";
import {handleRemoveProfessorFromUni} from "../controllers/university.controller";



const router = express.Router({mergeParams: true});

router.get('/', handleGetProfessors); // <- add all university professors
router.get('/:professor/', handleGetProfessor);
router.get('/:professor/grade/', handleGetProfessorGrades);

router.post('/', handleAddProfessor);

router.patch('/:professor/', handleUpdateProfessor);
router.patch('/:professor/subject/', handleAddProfessorToManySubjects);
router.patch('/:professor/grade/', handleAddGradesToProfessor);
router.patch('/:professor/uni/', handleAddUniToProfessor);
router.patch('/:professor/subject/', handleAddSubjectsToProfessor);


router.delete('/:professor/grade/', handleRemoveGradeFromProfessor);
router.delete('/:professor/uni/', handleRemoveUniFromProfessor);
// router.delete('/:professor/subject/', handleRemoveProfessorFromUni);


export {router as professorRouter};
