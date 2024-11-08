import User from "../models/User";
import Appoinment from "../models/Appoinment";

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
        const appointments = await Appointment.find({ _id: { $in: user.appointments } })
        .populate('doctor') 
        .exec();
        const formattedAppointments = appointments.map(({ _id, clientID, doctor, appointmentDate, reason, status }) => ({
            appointmentId: _id,
            doctorName: doctor ? doctor.name : 'N/A', 
            appointmentDate,
            reason,
            status,
          }));
        res.status(200).json(formattedAppointments);
        
    } catch (err) {
        res.status(404).json({message : err.message});
    }
};

/* Update */ 
import User from "../models/User";
import Appointment from "../models/Appointment";

/* Add or Remove Appointment */
export const addRemoveAppointment = async (req, res) => {
  const { id: userId, appointmentId } = req.params; 

  try {
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    
    const appointment = await Appointment.findById(appointmentId);
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

    const appointments = await Appointment.find({ _id: { $in: user.appointments } })
        .populate('doctor') 
        .exec();
        const formattedAppointments = appointments.map(({ _id, clientID, doctor, appointmentDate, reason, status }) => ({
            appointmentId: _id,
            doctorName: doctor ? doctor.name : 'N/A', 
            appointmentDate,
            reason,
            status,
          }));
    res.status(200).json(formattedAppointments);

  } catch (err) {
    res.status(500).json({ message: 'Error adding/removing appointment', error: err.message });
  }
};

