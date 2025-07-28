import React, { useState, useEffect } from 'react';

function EmployeeForm({ onAddEmployee, onUpdateEmployee, editEmployee }) {
  const [fullName, setFullName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [department, setDepartment] = useState('');
  const [dateOfJoining, setDateOfJoining] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

  useEffect(() => {
    if (editEmployee) {
      setFullName(editEmployee.fullName);
      setJobTitle(editEmployee.jobTitle);
      setDepartment(editEmployee.department);
      setDateOfJoining(editEmployee.dateOfJoining);
      setProfilePicture(editEmployee.profilePicture || '');
    }
  }, [editEmployee]);

  const convertToBase64 = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => setProfilePicture(reader.result);
    reader.onerror = (err) => console.error("Error: ", err);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEmployee = {
      fullName,
      jobTitle,
      department,
      dateOfJoining,
      profilePicture
    };

    if (editEmployee) {
      onUpdateEmployee(newEmployee);
    } else {
      onAddEmployee(newEmployee);
    }

    // Clear form
    setFullName('');
    setJobTitle('');
    setDepartment('');
    setDateOfJoining('');
    setProfilePicture('');
  };

  return (
    <form onSubmit={handleSubmit} className="employee_form">
      <h2>{editEmployee ? "Update Employee" : "Add New Employee"}</h2>

      <div className="input_field">
        <label>Full Name:</label>
        <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
      </div>

      <div className="input_field">
        <label>Job Title:</label>
        <input type="text" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} required />
      </div>

      <div className="input_field">
        <label>Department:</label>
        <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} required />
      </div>

      <div className="input_field">
        <label>Date of Joining:</label>
        <input type="date" value={dateOfJoining} onChange={(e) => setDateOfJoining(e.target.value)} required />
      </div>

      <div className="input_field">
        <label>Profile Picture:</label>
        <input type="file" accept="image/*" onChange={convertToBase64} />
      </div>

      <button className="submit_btn" type="submit">
        {editEmployee ? "Update Employee" : "Add Employee"}
      </button>
    </form>
  );
}

export default EmployeeForm;
