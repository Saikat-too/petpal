// data/index.js

import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

// Sample Users
export const users = [
    {
        name: 'John Doe',
        email: 'john@example.com',
        password: await hashPassword('Password123#@'),
        picturePath: '../public/assets/man.jpg',
        phone: '1234567890',
        role: 'client',
        address: '123 Main St, City A',
        appointments: []
    },
    {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: await hashPassword('Password123@#'),
        picturePath: '../public/assets/man.jpg',
        phone: '0987654321',
        role: 'client',
        address: '456 Elm St, City B',
        appointments: []
    }
];

// Sample Doctors
export const doctors = [
    {
        name: 'Dr. Alice Brown',
        email: 'alice@example.com',
        password: await hashPassword('Securepass12@'),
        phone: '1234512345',
        specialization: 'Veterinarian',
        
        availability: [
            {
                day: 'Monday',
                timeSlots: [
                    { startTime: '09:00', endTime: '12:00' },
                    { startTime: '13:00', endTime: '17:00' }
                ]
            },
            {
                day: 'Wednesday',
                timeSlots: [
                    { startTime: '09:00', endTime: '12:00' },
                    { startTime: '13:00', endTime: '17:00' }
                ]
            }
        ],
        appointments: []
    },
    {
        name: 'Dr. Bob White',
        email: 'bob@example.com',
        password: await hashPassword('Securepass12#@'),
        phone: '5432154321',
        specialization: 'Veterinarian Surgeon',
       
        availability: [
            {
                day: 'Tuesday',
                timeSlots: [
                    { startTime: '10:00', endTime: '14:00' },
                    { startTime: '15:00', endTime: '18:00' }
                ]
            },
            {
                day: 'Thursday',
                timeSlots: [
                    { startTime: '10:00', endTime: '14:00' },
                    { startTime: '15:00', endTime: '18:00' }
                ]
            }
        ],
        appointments: []
    }
];

