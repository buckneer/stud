import express from "express";
import {handleAddService, handleGetServiceGrades, handleGetServices} from "../controllers/service.controller";



const router = express.Router({mergeParams: true});


router.post('/', handleAddService);
router.get('/', handleGetServices); // uni services...
router.get('/:service/grade/', handleGetServiceGrades);


router.delete('/:service/'); // <-- IMPLEMENT THIS...

export {router as serviceRouter};
