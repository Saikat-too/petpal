// routes/activityLog.js
import express from 'express';
import ActivityLog from '../models/ActivityLog.js';
import User from '../models/User.js';
import Doctor from '../models/Doctors.js';
import Appoinment from '../models/Appoinment.js';

const router = express.Router();


export const createActivityUser = async(req , res) => {
    
    try {
        const {userId , timestamp , activityType , description } = req.body ;
        
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const newActivityLog = new ActivityLog({
            userId ,
            timestamp,
            activityType,
            description,
        });

        await newActivityLog.save();
        res.status(201).json(newActivityLog);

        
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch activity logs', error });
    }
};

export const createActivityDoctor = async(req , res) => {
    
    try {
        const {userId , timestamp , activityType , description } = req.body ;
        
        const doctor = await Doctor.findById(userId);
        if (!doctor) return res.status(404).json({ message: "Doctor not found" });

        const newActivityLog = new ActivityLog({
            userId ,
            timestamp,
            activityType,
            description,
        });

        await newActivityLog.save();
        res.status(201).json(newActivityLog);

        
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch activity logs', error });
    }
};

export const createActivityAppointment = async(req , res) => {
    
    try {
        const {userId , timestamp , activityType , description } = req.body ;
        
        const appointment = await Appoinment.findById(userId);
        if (!appointment) return res.status(404).json({ message: "Appointment not found" });

        const newActivityLog = new ActivityLog({
            userId ,
            timestamp,
            activityType,
            description,
        });

        await newActivityLog.save();
        res.status(201).json(newActivityLog);

        
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch activity logs', error });
    }
};

export default router;
