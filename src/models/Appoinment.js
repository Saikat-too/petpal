const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor', 
    required: true,
  },
  appointmentDate: {
    type: Date,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Appointment = mongoose.model('Appointment', AppointmentSchema);
module.exports = Appointment;
