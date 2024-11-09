import Appoinment from "../models/Appoinment.js";
import User from "../models/User.js";
import Doctor from "../models/Doctor.js";


export const createAppointment = async (req, res) => {
    try {
        const { clientID, doctorID, appointmentDate, reason } = req.body;

        
        const doctor = await Doctor.findById(doctorID);
        if (!doctor) return res.status(404).json({ message: "Doctor not found" });

        
        const newAppointment = new Appoinment({
            clientID,
            doctorID,
            appointmentDate,
            reason,
            status: "pending", 
        });
        await newAppointment.save();

        
        await User.findByIdAndUpdate(clientID, { $push: { appointments: newAppointment._id } });
        await Doctor.findByIdAndUpdate(doctorID, { $push: { appointments: newAppointment._id } });

        res.status(201).json(newAppointment); 
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export const getAppointmentsByUser = async (req, res) => {
    try {
        const { userID } = req.params;
        
        
        const appointments = await Appoinment.find({ clientID: userID })
            .populate("doctorID", "name specialization") 
            .populate("clientID", "name"); 

        res.status(200).json(appointments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export const getAppointmentsByDoctor = async (req, res) => {
    try {
        const { doctorID } = req.params;
        
        
        const appointments = await Appoinment.find({ doctorID })
            .populate("clientID", "name") 
            .populate("doctorID", "name specialization"); 

        res.status(200).json(appointments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export const updateAppointmentStatus = async (req, res) => {
    try {
        const { appointmentID } = req.params;
        const { status } = req.body;

        
        const updatedAppointment = await Appoinment.findByIdAndUpdate(
            appointmentID,
            { status },
            { new: true }
        );

        if (!updatedAppointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        res.status(200).json(updatedAppointment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export const deleteAppointment = async (req, res) => {
    try {
        const { appointmentID } = req.params;

        
        const appointment = await Appointment.findById(appointmentID);
        if (!appointment) return res.status(404).json({ message: "Appointment not found" });

        
        await User.findByIdAndUpdate(appointment.clientID, { $pull: { appointments: appointmentID } });
        await Doctor.findByIdAndUpdate(appointment.doctorID, { $pull: { appointments: appointmentID } });

    
        await appointment.remove();

        res.status(200).json({ message: "Appointment deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
