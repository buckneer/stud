import express from "express";
import {handleLogin, handleLogout, handleRefresh} from "../controllers/user.controller";



const router = express.Router({mergeParams: true});


router
	.post('/login/', handleLogin)
	.post('/refresh/', handleRefresh)
	.post('/logout/', handleLogout)

export {router as sessionRouter};
