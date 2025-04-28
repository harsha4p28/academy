const express = require('express');
const router = express.Router();
const User = require("../model/users"); 
//const registerController = require('../controllers/registerController');

router.post("/", async (req, res) => {
    try {
        const { name, email, phone, address, city, state, postalCode, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            phone,
            address,
            city,
            state,
            postalCode,
            password: hashedPassword, 
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;