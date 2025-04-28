const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    password: { type: String, required: true }, 
    role: { type: String, enum: ["Parent", "Tutor"], required: true },
    children : [{ type: mongoose.Schema.Types.ObjectId, ref: "Children" }],
});

const childrenSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phone: { type: String },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    postalCode: { type: String },
    class : { type:Number ,required:true},
    syllabus:{type:String,required:true},
    subject:{type:String,required:true},
    preferedTutor:{type:String,required:true},
    preferedTime:{type:String,required:true},
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" } 
  });

const user2Schema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    password: { type: String, required: true },
    experience: { type: String, required: true },
    role: { type: String, enum: ["Parent", "Tutor"], required: true },
    children : [{ type: mongoose.Schema.Types.ObjectId, ref: "Children" }], 
});

const User = mongoose.model("User", userSchema);
const Children = mongoose.model("Children", childrenSchema);
const User2 = mongoose.model("User2",user2Schema);
module.exports = {User, Children, User2};
