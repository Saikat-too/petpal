import express from "express";
import {
    getUser,
    getuserAppointments,
    addRemoveAppointments,
    
} from "../controllers/users.js" ;

import {verifyToken} from "../middleware/auth.js";

const router = express.Router() ; 

/* Read */ 

router.get("/:id" , verifyToken , getUser);
router.get("/:id/appointments" , verifyToken , getuserAppointments);

/* Update */ 
router.patch("/:id/:appointments" , verifyToken , addRemoveAppointments);


export default router ; 