import React from 'react';
import './Children.css';

const Children = ({ childrenData }) => {
  return (
    <div className="children-container">
      <div className="children-card">
        {childrenData.map((child, index) => (
          <div className="child-details" key={index}>
            <p><strong>Name:</strong> {child.name}</p>
            <p><strong>Email:</strong> {child.email}</p>
            {/* <p><strong>Phone:</strong> {child.phone}</p>
            <p><strong>Address:</strong> {child.address}</p>
            <p><strong>City:</strong> {child.city}</p>
            <p><strong>State:</strong> {child.state}</p>
            <p><strong>Postal Code:</strong> {child.postalCode}</p> */}
            <p><strong>Class:</strong> {child.class}</p>
            <p><strong>Syllabus:</strong> {child.syllabus}</p>
            <p><strong>Subject:</strong> {child.subject}</p>
            <p><strong>Preferred Tutor:</strong> {child.preferedTutor}</p>
            <p><strong>Preferred Time:</strong> {child.preferedTime}</p>
            <button>Delete profile</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Children;
