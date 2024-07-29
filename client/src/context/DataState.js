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
          token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5ZDJmZmI3ZmFiYzdjODQwNjFkNzVlIn0sImlhdCI6MTcyMTYyOTUwNX0.H03vCO4Gp98YeNyzW0ZnVRAA5HovvbiLj5cxl3sSeW4`,
        },
        method: "GET",
      });

      const data = await response.json();
      console.log(data);
      setAdmin(data);
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
          token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5ZDJmZmI3ZmFiYzdjODQwNjFkNzVlIn0sImlhdCI6MTcyMTYyOTUwNX0.H03vCO4Gp98YeNyzW0ZnVRAA5HovvbiLj5cxl3sSeW4`,
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

  // Delete admin
  const deleteAdmin = async (id) => {
    const url = `http://localhost:8800/delete-admin/${id}`;
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5ZDJmZmI3ZmFiYzdjODQwNjFkNzVlIn0sImlhdCI6MTcyMTYyOTUwNX0.H03vCO4Gp98YeNyzW0ZnVRAA5HovvbiLj5cxl3sSeW4",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete admin: ${response.statusText}`);
      }

      await response.json();
      const updatedAdminList = admin.filter((k) => k._id !== id);
      setAdmin(updatedAdminList);
    } catch (error) {
      console.error("Error deleting admin:", error);
    }
  };

  //edit Admin
  const editAdmin = async (id, name, email, photo) => {
    const url = `http://localhost:8800/edit-admin/${id}`;
    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5ZDJmZmI3ZmFiYzdjODQwNjFkNzVlIn0sImlhdCI6MTcyMTYyOTUwNX0.H03vCO4Gp98YeNyzW0ZnVRAA5HovvbiLj5cxl3sSeW4`,
        },
        method: "PUT",
        body: JSON.stringify({
          name: String(name),
          email: String(email),
          photo: String(photo),
        }),
      });

      const data = await response.json();
      const strData = JSON.parse(JSON.stringify(admin));
      for (let i = 0; i < strData.length; i++) {
        let element = strData[i];
        if (element._id === id) {
          element.name = name;
          element.email = email;
          element.photo = photo;
          break;
        }
      }

      setAdmin(strData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // ------Staff ----------------------

  const [staff, setStaff] = useState([]);


  //get staff
  const getStaff=async()=>{
    const url = `http://localhost:8800/get-staffs`;
    try {
      const response = await fetch(url, {
        headers: {
          token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5ZDJmZmI3ZmFiYzdjODQwNjFkNzVlIn0sImlhdCI6MTcyMTYyOTUwNX0.H03vCO4Gp98YeNyzW0ZnVRAA5HovvbiLj5cxl3sSeW4`,
        },
        method: "GET",
      });

      const data = await response.json();
      // console.log(data);
      setStaff(data);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  //add Staff
  const addStaff = async (name, gender, phone, dob, city, country, department, email, photo, date_of_join, state, address ) => {
    const url = `http://localhost:8800/add-Staff`;
    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5ZDJmZmI3ZmFiYzdjODQwNjFkNzVlIn0sImlhdCI6MTcyMTYyOTUwNX0.H03vCO4Gp98YeNyzW0ZnVRAA5HovvbiLj5cxl3sSeW4`,
        },
        method: "POST",
        body: JSON.stringify({
          name: String(name),
          gender: String(gender),
          phone: String(phone),
          dob: String(dob),
          city: String(city),
          country: String(country),
          department: String(department),
          email: String(email),
          photo: String(photo),
          date_of_join: String(date_of_join),
          state: String(state),
          address: String(address),
        }),
      });

      const data = await response.json();
      setStaff(staff.concat());
    } catch (error) {
      console.error("Error:", error);
    }
  };


  //delete Staff
  const deleteStaff = async (id) => {
    const url = `http://localhost:8800/delete-Staff/${id}`;
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5ZDJmZmI3ZmFiYzdjODQwNjFkNzVlIn0sImlhdCI6MTcyMTYyOTUwNX0.H03vCO4Gp98YeNyzW0ZnVRAA5HovvbiLj5cxl3sSeW4",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete staff: ${response.statusText}`);
      }

      await response.json();
      const updateStaffList = staff.filter((k) => k._id !== id);
      setStaff(updateStaffList);
    } catch (error) {
      console.error("Error deleting admin:", error);
    }
  };


  //edit Staff
  const editStaff = async (id,name, gender, phone, dob, city, country, department, email, photo, date_of_join, state, address ) => {
    const url = `http://localhost:8800/edit-Staff/${id}`;
    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5ZDJmZmI3ZmFiYzdjODQwNjFkNzVlIn0sImlhdCI6MTcyMTYyOTUwNX0.H03vCO4Gp98YeNyzW0ZnVRAA5HovvbiLj5cxl3sSeW4`,
        },
        method: "PUT",
        body: JSON.stringify({
          name: String(name),
          gender: String(gender),
          phone: String(phone),
          dob: String(dob),
          city: String(city),
          country: String(country),
          department: String(department),
          email: String(email),
          photo: String(photo),
          date_of_join: String(date_of_join),
          state: String(state),
          address: String(address),
        }),
      });

      const data = await response.json();
      const strData = JSON.parse(JSON.stringify(admin));
      for (let i = 0; i < strData.length; i++) {
        let element = strData[i];
        if (element._id === id) {
          element.name=name
          element.gender=gender
          element.phone=phone
          element.dob=dob
          element.city=city
          element.country=country
          element.department=department
          element.email=email
          element.photo=photo
          element.date_of_join=date_of_join
          element.state=state
          element.address=address
          break;
        }
      }

      setStaff(strData);
    } catch (error) {
      console.error("Error:", error);
    }
  };



  return (
    <DataContext.Provider
      value={{
        addDept,
        getDept,
        dept,
        deleteDept,
        editDept,
        addAdmin,
        upload,
        getAdmin,
        admin,
        deleteAdmin,
        editAdmin,
        addStaff,
        getStaff,
        staff,
        deleteStaff,
        editStaff
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export default DataState;
