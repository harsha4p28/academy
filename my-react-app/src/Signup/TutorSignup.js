import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const TutorSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    experience: '',
    password: '',
    confirmPassword: ''
  });

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone, address, city, state, postalCode, experience, password, confirmPassword } = formData;

    if (!USER_REGEX.test(name) || !PWD_REGEX.test(password)) {
      setErrMsg("Invalid Name or Password");
      return;
    }
    if (password !== confirmPassword) {
      setErrMsg("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        '/register',
        JSON.stringify({ name, email, phone, address, city, state, postalCode, password,experience, role: 'Tutor' }),
        { headers: { 'Content-Type': 'application/json'} ,
        withCredentials:true }
      );
      console.log(response?.data);
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        postalCode: '',
        experience: '',
        password: '',
        confirmPassword: ''
      });
    } catch(err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      }else {
          setErrMsg('Registration Failed')
      }
      setTimeout(() => {
        setErrMsg('');
      }, 2000);
    }
  };

  return (
    <section>
      <form className="signUp-form" onSubmit={handleSubmit}>
        <h3>Sign up today to start connecting with parents</h3>

        <input type="text" name="name" placeholder="Tutor Name" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Tutor Email" value={formData.email} onChange={handleChange} required />
        <input type="number" name="phone" placeholder="Tutor Phone Number" value={formData.phone} onChange={handleChange} required />
        <input type="text" name="address" placeholder="Tutor Address" value={formData.address} onChange={handleChange} required />
        <input type="text" name="city" placeholder="Tutor City" value={formData.city} onChange={handleChange} required />
        <input type="text" name="state" placeholder="Tutor State" value={formData.state} onChange={handleChange} required />
        <input type="number" name="postalCode" placeholder="Tutor Postal Code" value={formData.postalCode} onChange={handleChange} required />
        <input type="text" name="experience" placeholder="Experience (in years)" value={formData.experience} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Tutor Password" value={formData.password} onChange={handleChange} required />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
        {errMsg && <p style={{ color: 'red' }}>{errMsg}</p>}
        {success && <p style={{ color: 'green' }}>Registration Successful!<br /> <Link to="/login">Login here</Link></p>}

        <button type="submit" disabled={formData.password !== formData.confirmPassword}>
          Sign Up
        </button>

        <p>
          Already registered? <Link to="/login">Sign In</Link>
        </p>
      </form>
    </section>
  );
};

export default TutorSignup;
