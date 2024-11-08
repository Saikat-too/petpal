import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true ,
        trim: true,
        min : 3 , 
        max : 20 ,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        min : 10 , 
        max : 50 ,
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
        min : 8 ,
      },
      picturePath :{
         type : String , 
         default : "",
      },
      phone: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        enum: ['client', 'doctor'],
        default: 'client', 
      },
      address: {
        street: String,
        city: String,
        state: String,
        postalCode: String,
      },
      pets: [
        {
          type: String,
          breed: String,
          age: Number,
          name: String,
        },
      ],
     
});

const User  = mongoose.model("User" , UserSchema);

export default User ;