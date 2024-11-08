import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User"

/* Registration User */ 

export const register = async(req , res) => {
    try {
        const {
            name , 
            email , 
            password ,
            phone , 
            role ,
            address ,
            pets
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password , salt);


        const newUser = new User ({
            name , 
            email , 
            password : passwordHash ,
            phone , 
            role ,
            address ,
            pets 

        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);

    } catch(err){
        res.status(500).json({error: err.message });
    }
}