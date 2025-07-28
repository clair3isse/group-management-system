import React, { useState, useEffect } from 'react';
import EmployeeForm from './employeeForm';
import EmployeeList from './EmployeeList';
import './index.css';

function App() {
  const [employees, setEmployees] = useState([]);
  const [editEmployee, setEditEmployee] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(sessionStorage.getItem("employees")) || [];
    setEmployees(stored);
  }, []);

  const saveToStorage = (updated) => {
    sessionStorage.setItem("employees", JSON.stringify(updated));
    setEmployees(updated);
  };

  const addEmployee = (newEmp) => {
    const updated = [...employees, newEmp];
    saveToStorage(updated);
  };

  const updateEmployee = (updatedEmp) => {
    const updatedList = [...employees];
    updatedList[editIndex] = updatedEmp;
    saveToStorage(updatedList);
    setEditEmployee(null);
    setEditIndex(null);
  };

  const deleteEmployee = (index) => {
    const updated = employees.filter((_, i) => i !== index);
    saveToStorage(updated);
  };

  const handleEdit = (employee, index) => {
    setEditEmployee(employee);
    setEditIndex(index);
  };

  return (
    <div className="App">
      <h1>Employee Management System</h1>
      
      <EmployeeForm
        onAddEmployee={addEmployee}
        onUpdateEmployee={updateEmployee}
        editEmployee={editEmployee}
      />

      <EmployeeList
        employees={employees}
        onEdit={handleEdit}
        onDelete={deleteEmployee}
      />
    </div>
  );
}

export default App;
