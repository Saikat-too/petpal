import express from "express";
import {
    getUser,
    getuserDoctors,
    addRemoveDoctor,
    
} from "../controllers/users.js" ;

import {verifyToken} from "../middleware/auth.js";

const router = express.Router() ; 

/* Read */ 

router.get("/:id" , verifyToken , getUser);
router.get("/:id/doctors" , verifyToken , getuserDoctors);

/* Update */ 
router.patch("/:id/:doctorID" , verifyToken , addRemoveDoctor);


export default router ; 