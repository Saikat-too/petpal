import express, { application } from 'express';
import { createActivityUser , createActivityDoctor , createActivityAppointment } from '../controllers/activitylog';
const router = express.Router();

router.post('/' , createActivityUser);
router.post('/' , createActivityDoctor);
router.post('/' , createActivityAppointment);

