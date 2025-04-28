import React, { useState } from 'react';
import './Child.css';
import axios from '../api/axios';
import { FaTimes } from 'react-icons/fa';


const Child = ({setChildForm}) => {
    const [errMsg, setErrMsg] = useState("");
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        class: '',
        syllabus: '',
        subject: '',
        preferedTutor: '',
        preferedTime: ''
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleAddChild = async (e) => {
        e.preventDefault();
        const { name, email, phone, class: childClass, syllabus, subject, preferedTutor, preferedTime } = formData;
        if (!name || !childClass || !syllabus || !subject) {
            setErrMsg("Please fill all the required fields");
            setTimeout(() => {
                setErrMsg('');
            }, 2000);
            return;
        }
        setTimeout(() => {
            setErrMsg('');
        }, 2000);

        try{
          const response=await axios.post("/parent/addchild", 
            JSON.stringify({ name, email, phone, class: childClass, syllabus, subject, preferedTutor, preferedTime }),
            { headers: { 'Content-Type': 'application/json' },
            withCredentials:true },
          );
          console.log(response?.data);
          window.location.reload();
    
        }catch (err) {
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
    <div className='childContainer'>
        <div className='ChildMainContainer'>
            <FaTimes className="close-icon" onClick={()=>{
              setChildForm(false);
            }} />
            <h2>Child details</h2>
            <div className='childDetails'>
                <input type='text' name='name'placeholder='Enter your child name*' value={formData.name} onChange={handleChange} required />
                <input type='email' name='email' placeholder='Enter your email' value={formData.email} onChange={handleChange}  />
                <input type='number' name='phone' placeholder='Enter your phone number' value={formData.phone} onChange={handleChange}  />
                <input type='text' name='class' placeholder='Enter your child class' value={formData.class} onChange={handleChange} required />
                <input type='text' name='syllabus' placeholder='Enter your child syllabus' value={formData.syllabus} onChange={handleChange} required />
                <input type='text' name='subject' placeholder='Enter your child subjects' value={formData.subject} onChange={handleChange} required />
                <input type='text' name='preferedTutor' placeholder='Enter your preferred tutor' value={formData.preferedTutor} onChange={handleChange}  />
                <input type='text' name='preferedTime' placeholder='Enter your preferred time' value={formData.preferedTime} onChange={handleChange}  />
                {errMsg && <p style={{ color: 'red' }}>{errMsg}</p>}
                <button type='submit' onClick={handleAddChild}>Add child</button>
            </div>
        </div>
    </div>
  )
}

export default Child