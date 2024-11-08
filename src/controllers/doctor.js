import Doctor from '../models/Doctor';
import Appointment from '../models/Appoinment';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const registerDoctor = async (req, res) => {
  try {
    const { name, email, password, specialization, phoneNumber, bio } = req.body;

    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) return res.status(400).json({ message: 'Doctor already exists' });

       const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password , salt);

    const newDoctor = new Doctor({
      name,
      email,
      password: hashedPassword,
      specialization,
      phoneNumber,
      bio,
    });
    await newDoctor.save();

    res.status(201).json({ message: 'Doctor registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    const doctor = await Doctor.findOne({ email });
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

    const isPasswordValid = await bcrypt.compare(password, doctor.password);
    if (!isPasswordValid) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: doctor._id, role: 'doctor' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, doctor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getDoctorProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findById(id).populate('appointments');
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    const { availability } = req.body; // Expected format: [{ day: 'Monday', startTime: '09:00', endTime: '17:00' }]

    const doctor = await Doctor.findById(id);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

    doctor.availability = availability;
    await doctor.save();

    res.status(200).json({ message: 'Availability updated successfully', availability: doctor.availability });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
