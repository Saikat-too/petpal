import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    min : 5 , 
    max : 10
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    min : 8 ,
  },
  phone: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },

  availability: [
    {
      day: {
        type: String, // e.g. "Monday", "Tuesday"
        required: true,
      },
      timeSlots: [
        {
          startTime: {
            type: String,
            required: true,
          },
          endTime: {
            type: String, 
            required: true,
          },
        },
      ],
    },
  ],
  role: {
    type: String,
    enum: ['doctor'],
    default: 'doctor',
  },
  appointments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Appointment', 
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Doctor = mongoose.model('Doctor', DoctorSchema);
export default Doctor ;
