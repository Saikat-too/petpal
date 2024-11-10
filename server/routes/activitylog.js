import express  from 'express';
import { getActivityLogbyUser , getActivityLogbyDoctor , getActivityLogbyAppointment } from '../controllers/activitylog';
const router = express.Router();

router.post('/user/:userID' , getActivityLogbyUser);
router.post('/doctor/:doctorID' , getActivityLogbyDoctor);
router.post('/appoinment/:appointmentID' , getActivityLogbyAppointment);

