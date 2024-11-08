const mongoose = require('mongoose');

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
    validate: {
        validator: function(v) {
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(v);
        },
        message: props => `${props.value} is not a strong enough password.`
      },

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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Doctor = mongoose.model('Doctor', DoctorSchema);
module.exports = Doctor;
