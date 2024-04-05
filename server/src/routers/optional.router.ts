import express from "express";
import {handleAddOptional, handleGetOptional} from "../controllers/optional.controller";
import {handleAddSubjectsToOptional} from "../controllers/subject.controller";



const router = express.Router({mergeParams: true});

router.post('/', handleAddOptional);
router.get('/', handleGetOptional);
router.patch('/:opt/subject/', handleAddSubjectsToOptional);

export {router as optionalRouter};
