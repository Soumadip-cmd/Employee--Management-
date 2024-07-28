import React, { useState } from "react";
import DataContext from "./DataContext";

const DataState = (props) => {
  const [dept, setDept] = useState([]);

  // -------------DEpartment-------------------

  //get all departments
  const getDept = async () => {
    const url = "http://localhost:8800/get-departments";

    const response = await fetch(url, {
      headers: {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5ZDJmZmI3ZmFiYzdjODQwNjFkNzVlIn0sImlhdCI6MTcyMTYyOTUwNX0.H03vCO4Gp98YeNyzW0ZnVRAA5HovvbiLj5cxl3sSeW4",
      },
      method: "GET",
    });

    const responseData = await response.json();
    // console.log(responseData);
    setDept(responseData);
  };

  //add departments
  const addDept = async (deptName, employeeId) => {
    const url = "http://localhost:8800/add-department";

    if (Array.isArray(deptName)) {
      deptName = deptName[0];
    }
    if (Array.isArray(employeeId)) {
      employeeId = employeeId[0];
    }

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5ZDJmZmI3ZmFiYzdjODQwNjFkNzVlIn0sImlhdCI6MTcyMTYyOTUwNX0.H03vCO4Gp98YeNyzW0ZnVRAA5HovvbiLj5cxl3sSeW4",
      },
      method: "POST",
      body: JSON.stringify({
        deptName: String(deptName),
        employeeId: String(employeeId),
      }),
    });

    const responseData = await response.json();
    // console.log(responseData);
    setDept(dept.concat());
  };

  //delete department
  const deleteDept = async (id) => {
    const url = `http://localhost:8800/delete-department/${id}`;

    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5ZDJmZmI3ZmFiYzdjODQwNjFkNzVlIn0sImlhdCI6MTcyMTYyOTUwNX0.H03vCO4Gp98YeNyzW0ZnVRAA5HovvbiLj5cxl3sSeW4",
        },
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const responseData = await response.json();
      const delDept = dept.filter((depts) => depts._id !== id);

      // Assuming setDept is the function to update the state
      setDept(delDept);
      // console.log(delDept)
      console.log("Department deleted successfully:", responseData);
    } catch (error) {
      console.error("Failed to delete department:", error);
    }
  };

  //edit department
  const editDept = async (id, deptName, employeeId) => {
    const url = `http://localhost:8800/edit-department/${id}`;

    if (Array.isArray(deptName)) {
      deptName = deptName[0];
    }
    if (Array.isArray(employeeId)) {
      employeeId = employeeId[0];
    }

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5ZDJmZmI3ZmFiYzdjODQwNjFkNzVlIn0sImlhdCI6MTcyMTYyOTUwNX0.H03vCO4Gp98YeNyzW0ZnVRAA5HovvbiLj5cxl3sSeW4",
      },
      method: "PUT",
      body: JSON.stringify({
        deptName: String(deptName),
        employeeId: String(employeeId),
      }),
    });

    const responseData = await response.json();
    const data = JSON.parse(JSON.stringify(dept));
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      if (element._id === id) {
        element.employeeId = employeeId;
        element.deptName = deptName;
        break;
      }
    }
    setDept(data);
  };

  // ---------------Admin--------------------

  const [admin, setAdmin] = useState([]);
  const [upload, setUpload] = useState();

  //get Admin
  const getAdmin = async () => {
    const url = `http://localhost:8800/get-admins`;
    try {
      const response = await fetch(url, {
        headers: {
          token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5ZDJmZmI3ZmFiYzdjODQwNjFkNzVlIn0sImlhdCI6MTcyMTYyOTUwNX0.H03vCO4Gp98YeNyzW0ZnVRAA5HovvbiLj5cxl3sSeW4`, // Replace with your actual token
        },
        method: "GET",
      });

      const data = await response.json();
      console.log(data)
      setAdmin(data)
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //addAdmin
  const addAdmin = async (name, email, photo) => {
    const url = `http://localhost:8800/add-admin`;
    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5ZDJmZmI3ZmFiYzdjODQwNjFkNzVlIn0sImlhdCI6MTcyMTYyOTUwNX0.H03vCO4Gp98YeNyzW0ZnVRAA5HovvbiLj5cxl3sSeW4`, // Replace with your actual token
        },
        method: "POST",
        body: JSON.stringify({
          name: String(name),
          email: String(email),
          photo: String(photo),
        }),
      });

      const data = await response.json();
      setAdmin(admin.concat());
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <DataContext.Provider
      value={{ addDept, getDept, dept, deleteDept, editDept, addAdmin, upload,getAdmin,admin }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export default DataState;
