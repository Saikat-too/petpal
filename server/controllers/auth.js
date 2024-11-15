import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js"
import ActivityLog from "../models/Activity_log.js";
/* Registration User */ 

export const register = async(req , res) => {
    try {
        const {
            name , 
            email , 
            password ,
            picturePath,
            phone , 
            role ,
            address ,
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password , salt);


        const newUser = new User ({
            name , 
            email , 
            password : passwordHash ,
            picturePath,
            phone , 
            role ,
            address ,

        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
        
        const userId = new savedUser._id;
        
     const activitylog = new ActivityLog({
        userId ,
        timestamp : new Date() ,
        activityType : "Create User",
        description : 'User created with email : ${email}'
  
      });
  
      await activitylog.save();

    } catch(err){
        res.status(500).json({error: err.message });
    }
};

/*Log IN */ 

export const login = async(req , res) => {
    try {
        const {email , password} = req.body;
        const user = await User.findOne({email: email});
        if(!user) return res.status(400).json({msg : "User does not exist. "});

        const isMatch = await bcrypt.compare(password , user.password);
        if(!isMatch) return res.status(400).json({msg : "Invalid Password."});

        const token = jwt.sign({id : user._id}.process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({token , user});


        const userId = new user._id;
        
        const activitylog = new ActivityLog({
            userId ,
            timestamp : new Date() ,
            activityType : "LogIn",
            description : 'User created with email : ${email}'
    
        });
  
      await activitylog.save();
        
    } catch (err) {
        
        res.status(500).json({error : err.message})
        
    }
};