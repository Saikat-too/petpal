import mongoose, { Types } from "mongoose";

const ActivityLogSchema = new  mongoose.Schema({

    userId:{
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'clinet',
    },
    doctorId : {
        type : mongoose.Schema.Types.ObjectId , 
        ref : 'doctor',
    },
    appointmentId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'appointment',
    },
    timestamp:{
        type : Date , 
        default : Date.now
    },
    activityType : {
        type : String,
        required : True ,
    },
    description : {
        type : String ,
        required : True ,
    },


});

const ActivityLog = mongoose.model('ActivityLog' , ActivityLogSchema);
export default ActivityLog ; 