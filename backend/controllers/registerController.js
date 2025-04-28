const bcrypt= require("bcrypt");
const path = require("path");
const User = require("../model/users"); 

const handleUser= async ( req,res)=>{
    const { name, email, phone, address, city, state, postalCode, password } = req.body;
    const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
    try{
        const hashedPwd=await bcrypt.hash(password,10);
        const newUser=new User({
            name,
            email,
            phone,
            address,
            city,
            state,
            postalCode,
            password: hashedPwd,
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    }catch(error){
        console.log(error);
        res.status(500).json({error: "Internal server error"});
    }
}

//module.exports= handleUser;