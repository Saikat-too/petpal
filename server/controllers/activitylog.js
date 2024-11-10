// routes/activityLog.js
import express from 'express';
import ActivityLog from '../models/ActivityLog.js';
import User from '../models/User.js';
import Doctor from '../models/Doctors.js';
import Appoinment from '../models/Appoinment.js';

const router = express.Router();


export const getActivityLogbyUser = async (req, res) => {
    try {
        const { userID } = req.params;
        
        
        const activitylog = await ActivityLog.find({ userId : userID })
            
        if(!activitylog){
            return res.status(404).json({message : "No activity log found for this user"})
        }

        res.status(200).json(activitylog);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getActivityLogbyDoctor = async (req, res) => {
    try {
        const { doctorID } = req.params;
        
        
        const activitylog = await ActivityLog.find({ userId : doctorID })
            
        if(!activitylog){
            return res.status(404).json({message : "No activity log found for this user"})
        }

        res.status(200).json(activitylog);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getActivityLogbyAppointment = async (req, res) => {
    try {
        const { appointmentID } = req.params;
        
        
        const activitylog = await ActivityLog.find({ userId : appointmentID })
            
        if(!activitylog){
            return res.status(404).json({message : "No activity log found for this user"})
        }

        res.status(200).json(activitylog);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export default router;
