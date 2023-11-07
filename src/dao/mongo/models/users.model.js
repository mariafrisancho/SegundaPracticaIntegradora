import mongoose from "mongoose";

const usersCollection="users";
const userSchema=new mongoose.Schema({
    firts_name:{
        type:String,
        required:true
    },
    last_name:String,
    age:Number,
    email:
    {
        type:String,
        required:true,
        unique:true

    },
    password:{
        type:String,
        required:true
      
    },
    cart:{
        type:mongoose.Schema.Types.ObjectId,     
        ref:"carts"

    },

     rol:{
        type:String,
        enum:["user","admin"],
        default:"user"

     }
     

});

export const usersModel=mongoose.model(usersCollection,userSchema);