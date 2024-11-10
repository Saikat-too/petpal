import User from "../models/User.js";
import Appoinment from "../models/Appoinment.js";
import ActivityLog from "../models/Activity_log.js";

/* Read */ 
export const getUser = async(req , res) =>{
    try {
        const {id} = req.params ; 
        const user = await User.findById(id);
        res.status(200).json(user);
        
    } catch (err) {
        res.status(404).json({message : err.message});
    }
};

export const getuserAppointments = async(req , res) =>{
    try {
        const {id} = req.params ; 
        const user = await User.findById(id);
        const appointments = await Appoinment.find({ _id: { $in: user.appointments } })
        .populate('doctor') 
        .exec();
        const formattedAppointments = appointments.map(({ _id, clientID, doctorID, appointmentDate, reason, status }) => ({
            appointmentId: _id,
            doctorName: doctorID ? doctorID.name : 'N/A', 
            appointmentDate,
            reason,
            status,
          }));
        res.status(200).json(formattedAppointments);
        
    } catch (err) {
        res.status(404).json({message : err.message});
    }
};



/* Add or Remove Appointment */
export const addRemoveAppointment = async (req, res) => {
  const { id: userId, appointmentId } = req.params; 

  try {
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    
    const appointment = await Appoinment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    
    const hasAppointment = user.appointments.includes(appointmentId);

    if (hasAppointment) {
      
      user.appointments.pull(appointmentId);
      await user.save();
      res.status(200).json({ message: 'Appointment removed successfully', userId, appointmentId });
    } else {
      
      user.appointments.push(appointmentId);
      await user.save();
      res.status(200).json({ message: 'Appointment added successfully', userId, appointmentId });
    }

    await user.save();
    await appointment.save();

    const description = hasAppointment
      ? `User removed appointment with ID ${appointmentId}`
      : `User added appointment with ID ${appointmentId}`;
    const actionType = hasAppointment ? 'REMOVE_APPOINTMENT' : 'ADD_APPOINTMENT';

    const activitylog = new ActivityLog({
      userId ,
      timestamp : new Date() ,
      activityType : actionType,
      description,

    });

    await activitylog.save();

    const appointments = await Appoinment.find({ _id: { $in: user.appointments } })
        .populate('doctor') 
        .exec();
        const formattedAppointments = appointments.map(({ _id, clientID, doctorID, appointmentDate, reason, status }) => ({
            appointmentId: _id,
            doctorName: doctorID ? doctorID.name : 'N/A', 
            appointmentDate,
            reason,
            status,
          }));
    res.status(200).json(formattedAppointments);

  } catch (err) {
    res.status(500).json({ message: 'Error adding/removing appointment', error: err.message });
  }
};

