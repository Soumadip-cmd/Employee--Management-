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
        token: localStorage.getItem("authToken"),
      },
      method: "GET",
    });

    const responseData = await response.json();
    setDept(responseData);
  };

  //add departments
  const addDept = async (name, email) => {
    const url = "http://localhost:8800/add-department";

    if (Array.isArray(name)) {
      name = name[0];
    }
    if (Array.isArray(email)) {
      email = email[0];
    }

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("authToken"),
      },
      method: "POST",
      body: JSON.stringify({
        name: String(name),
        email: String(email),
      }),
    });

    await response.json();
    setDept(dept.concat());
  };

  //delete department
  const deleteDept = async (id) => {
    const url = `http://localhost:8800/delete-department/${id}`;

    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("authToken"),
        },
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      await response.json();
      const delDept = dept.filter((depts) => depts._id !== id);

      setDept(delDept);
    } catch (error) {
      console.error("Failed to delete department:", error);
    }
  };

  //edit department
  const editDept = async (id, name, email) => {
    const url = `http://localhost:8800/edit-department/${id}`;

    if (Array.isArray(name)) {
      name = name[0];
    }
    if (Array.isArray(email)) {
      email = email[0];
    }

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("authToken"),
      },
      method: "PUT",
      body: JSON.stringify({
        name: String(name),
        email: String(email),
      }),
    });

    await response.json();
    const data = JSON.parse(JSON.stringify(dept));
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      if (element._id === id) {
        element.email = email;
        element.name = name;
        break;
      }
    }
    setDept(data);
  };

  // ---------------Admin--------------------

  const [admin, setAdmin] = useState([]);

  //getAdmin
  const getAdmin = async () => {
    const url = "http://localhost:8800/get-all-admin";
    try {
      const response = await fetch(url);
      const responseData = await response.json();
      if (responseData.Success) {
        setAdmin(responseData.allAdmin);
      } else {
        console.error("Failed to fetch admins");
      }
    } catch (error) {
      console.error("Error fetching admins:", error);
    }
  };

  // Add admin
  const addAdmin = async (name, email, password, avatar) => {
    const url = "http://localhost:8800/create-user";

    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          name: String(name),
          email: String(email),
          password: String(password),
          avatar: String(avatar),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Response error:", response.status, response.statusText);
        alert(`Error: ${data.msg || "Invalid Credentials!"}`);
        return;
      }

      if (!data.success) {
        console.error("Backend error:", data.errors);
        alert(`Error: ${data.msg || "Check your inputs."}`);
        return;
      }

      // alert('Admin created successfully!');
    } catch (error) {
      console.error("Fetch error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  //delete Admin
  const deleteAdmin = async (id) => {
    const url = `http://localhost:8800/deleteAdmin/${id}`;

    try {
      const response = await fetch(url, {
        headers: {},
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      await response.json();
      const delAdmin = admin.filter((k) => k._id !== id);

      setAdmin(delAdmin);
    } catch (error) {
      console.error("Failed to delete department:", error);
    }
  };

  //edit Admin
  const editAdmin = async (id, name, email) => {
    const url = `http://localhost:8800/editAdmin/${id}`;

    if (Array.isArray(name)) {
      name = name[0];
    }
    if (Array.isArray(email)) {
      email = email[0];
    }

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({
        name: String(name),
        email: String(email),
      }),
    });

    await response.json();
    const data = JSON.parse(JSON.stringify(dept));
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      if (element._id === id) {
        element.email = email;
        element.name = name;
        break;
      }
    }
    setAdmin(data);
  };

  // ------Staff ----------------------

  const [staff, setStaff] = useState([]);

  //get staff
  const getStaff = async () => {
    const url = `http://localhost:8800/get-staffs`;
    try {
      const response = await fetch(url, {
        headers: {
          token: localStorage.getItem("authToken"),
        },
        method: "GET",
      });

      const data = await response.json();

      setStaff(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //add Staff
  const addStaff = async (
    name,
    gender,
    phone,
    dob,
    city,
    country,
    department,
    email,
    photo,
    date_of_join,
    state,
    address
  ) => {
    const url = `http://localhost:8800/add-Staff`;
    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("authToken"),
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

      await response.json();
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
          token: localStorage.getItem("authToken"),
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
  const editStaff = async (
    id,
    name,
    gender,
    phone,
    dob,
    city,
    country,
    department,
    email,
    photo,
    date_of_join,
    state,
    address
  ) => {
    const url = `http://localhost:8800/edit-Staff/${id}`;
    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("authToken"),
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

      await response.json();
      const strData = JSON.parse(JSON.stringify(admin));
      for (let i = 0; i < strData.length; i++) {
        let element = strData[i];
        if (element._id === id) {
          element.name = name;
          element.gender = gender;
          element.phone = phone;
          element.dob = dob;
          element.city = city;
          element.country = country;
          element.department = department;
          element.email = email;
          element.photo = photo;
          element.date_of_join = date_of_join;
          element.state = state;
          element.address = address;
          break;
        }
      }

      setStaff(strData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // -----------Salary-----------

  const [salary, setSalary] = useState([]);

  //get all salary
  const getSal = async () => {
    const url = "http://localhost:8800/get-all-Salary";

    const response = await fetch(url, {
      headers: {
        token: localStorage.getItem("authToken"),
      },
      method: "GET",
    });

    const responseData = await response.json();
    setSalary(responseData);
  };

  //add salary
  const addSal = async (StaffName, department, Paid_Salary) => {
    const url = "http://localhost:8800/add-Salary";

    if (Array.isArray(StaffName)) {
      StaffName = StaffName[0];
    }
    if (Array.isArray(department)) {
      department = department[0];
    }
    if (Array.isArray(Paid_Salary)) {
      Paid_Salary = Paid_Salary[0];
    }

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("authToken"),
      },
      method: "POST",
      body: JSON.stringify({
        StaffName: String(StaffName),
        department: String(department),
        Paid_Salary: String(Paid_Salary),
      }),
    });

    await response.json();
    setSalary(salary.concat());
  };

  //delete salary
  const deleteSal = async (id) => {
    const url = `http://localhost:8800/delete-Salary/${id}`;

    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("authToken"),
        },
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      await response.json();
      const delSalary = salary.filter((s) => s._id !== id);

      // Assuming setDept is the function to update the state
      setSalary(delSalary);
    } catch (error) {
      console.error("Failed to delete department:", error);
    }
  };

  //edit Salary
  const editSal = async (id, StaffName, department, Paid_Salary) => {
    const url = `http://localhost:8800/edit-Salary/${id}`;

    if (Array.isArray(StaffName)) {
      StaffName = StaffName[0];
    }
    if (Array.isArray(department)) {
      department = department[0];
    }
    if (Array.isArray(Paid_Salary)) {
      Paid_Salary = Paid_Salary[0];
    }

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("authToken"),
      },
      method: "PUT",
      body: JSON.stringify({
        StaffName: String(StaffName),
        department: String(department),
        Paid_Salary: String(Paid_Salary),
      }),
    });

    await response.json();
    const data = JSON.parse(JSON.stringify(salary));
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      if (element._id === id) {
        element.StaffName = StaffName;
        element.department = department;
        element.Paid_Salary = Paid_Salary;
        break;
      }
    }
    setSalary(data);
  };

  return (
    <DataContext.Provider
      value={{
        addDept,
        getDept,
        dept,
        deleteDept,
        editDept,
        admin,
        addStaff,
        getStaff,
        staff,
        deleteStaff,
        editStaff,
        editSal,
        deleteSal,
        addSal,
        getSal,
        salary,
        addAdmin,
        getAdmin,
        deleteAdmin,
        editAdmin,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export default DataState;
