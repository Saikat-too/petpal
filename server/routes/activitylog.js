import express  from 'express';
import { getActivityLogbyUser , getActivityLogbyDoctor , getActivityLogbyAppointment } from '../controllers/activitylog';
const router = express.Router();

router.get('/user/:userID' , getActivityLogbyUser);
router.get('/doctor/:doctorID' , getActivityLogbyDoctor);
router.get('/appoinment/:appointmentID' , getActivityLogbyAppointment);

