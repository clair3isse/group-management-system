import React from "react";

function EmployeeList({ employees, onEdit, onDelete }) {
  return (
    <div className="employee-list-container">
      <h2>Employee List</h2>

      {employees.length === 0 ? (
        <p>No employees added yet.</p>
      ) : (
        <div className="employee-grid">
          {employees.map((employee, index) => (
            <div className="employee-card" key={index}>
              <img
                src={employee.profilePicture || "https://via.placeholder.com/100"}
                alt="Profile"
                className="profile-picture"
              />
              <div className="employee-info">
                <p><strong>Name:</strong> {employee.fullName}</p>
                <p><strong>Title:</strong> {employee.jobTitle}</p>
                <p><strong>Department:</strong> {employee.department}</p>
                <p><strong>Date Joined:</strong> {employee.dateOfJoining}</p>
              </div>
              <div className="card-buttons">
                <button className="edit-btn" onClick={() => onEdit(employee, index)}>Edit</button>
                <button className="delete-btn" onClick={() => onDelete(index)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EmployeeList;
