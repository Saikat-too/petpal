import express from 'express';
import { registerDoctor, loginDoctor, getDoctorProfile, updateAvailability } from '../controllers/doctorController';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', registerDoctor); 
router.post('/login', loginDoctor); 
router.get('/:id', verifyToken, getDoctorProfile); 
router.put('/:id/availability', verifyToken, updateAvailability); 

export default router;
