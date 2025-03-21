const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
//const connectDB = require("./database");
//const User = require("./models/User")

const app = express();
const PORT = 5000;

app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true
}));
app.use(bodyParser.json());

//connectDB();

// Parent Registration
app.post('/register-parent', (req, res) => {
  const { name, email, phone, address, city, state, postalCode, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  console.log('Parent Registered:', req.body);
  res.status(201).json({ message: 'Parent registered successfully!' });
});

// Tutor Registration
app.post('/tutor-register', (req, res) => {
  const { name, email, phone, address, city, state, postalCode, experience, password } = req.body;
  if (!name || !email || !password || !experience) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  console.log('Tutor Registered:', req.body);
  res.status(201).json({ message: 'Tutor registered successfully!' });
});

//Login
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password ) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  console.log('Logged in :', req.body);
  res.status(201).json({ message: 'Login successfull!' });
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
