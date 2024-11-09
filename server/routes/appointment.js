import express from 'express';
import {
    createAppointment,
    getAppointmentsByUser,
    getAppointmentsByDoctor,
    updateAppointmentStatus,
    deleteAppointment
} from '../controllers/appointment.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Appointment routes
router.post('/', verifyToken, createAppointment); 
router.get('/user/:userID',verifyToken, getAppointmentsByUser); 
router.get('/doctor/:doctorID',verifyToken, getAppointmentsByDoctor); 
router.put('/:appointmentID/status',verifyToken, updateAppointmentStatus); 
router.delete('/:appointmentID',verifyToken, deleteAppointment); 

export default router;
