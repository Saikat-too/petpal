
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    user: null,
    token: null,
    appointments: [] 
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setMode: (state, action) => {
            state.mode = state.mode ==="light" ? "dark" : "light";
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user  = null ; 
            state.token = null;
        },
        setAppointments: (state, action) => {
            state.appointments = action.payload; 
        },
        addAppointment: (state, action) => {
            state.appointments.push(action.payload); 
        },
        updateAppointmentStatus: (state, action) => {
            const { id, status } = action.payload;
            const appointment = state.appointments.find(app => app.id === id);
            if (appointment) {
                appointment.status = status;
            }
        },
        clearAppointments: (state) => {
            state.appointments = [];
        }
    }
});

export const { setMode, setLogin, setLogout, setAppointments, addAppointment, updateAppointmentStatus, clearAppointments } = userSlice.actions;

export default userSlice.reducer;
