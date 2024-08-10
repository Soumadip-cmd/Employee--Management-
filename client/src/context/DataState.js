import React, { useState } from "react";
import DataContext from "./DataContext";
import toast from "react-hot-toast";

const DataState = (props) => {
  const [dept, setDept] = useState([]);

  const link = process.env.REACT_APP_BACKEND_URL || "http://localhost:8800";
  // const link = "http://localhost:8800";
  // -------------DEpartment-------------------

  //get all departments
  const getDept = async () => {
    const url = `${link}/get-departments`;

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
  const addDept = async (deptName, employeeId) => {
    const url = `${link}/add-department`;

    if (Array.isArray(deptName)) {
      deptName = deptName[0];
    }
    if (Array.isArray(employeeId)) {
      employeeId = employeeId[0];
    }
    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("authToken"),
        },
        method: "POST",
        body: JSON.stringify({
          deptName: String(deptName),
          employeeId: String(employeeId),
        }),
      });

      await response.json();
      setDept(dept.concat());
      toast.success("Department added successfully");
    } catch (error) {
      console.error("Failed to add department:", error);
      toast.error("Failed to add department");
    }
  };

  //delete department
  const deleteDept = async (id) => {
    const url = `${link}/delete-department/${id}`;

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
      toast.success("Department deleted successfully");
    } catch (error) {
      console.error("Failed to delete department:", error);
      toast.error("Failed to delete department");
    }
  };

  //edit department
  const editDept = async (id, deptName, employeeId) => {
    const url = `${link}/edit-department/${id}`;

    if (Array.isArray(deptName)) {
      deptName = deptName[0];
    }
    if (Array.isArray(employeeId)) {
      employeeId = employeeId[0];
    }
    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("authToken"),
        },
        method: "PUT",
        body: JSON.stringify({
          deptName: String(deptName),
          employeeId: String(employeeId),
        }),
      });

      await response.json();
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
      toast.success("Department updated successfully");
    } catch (error) {
      console.error("Failed to edit department:", error);
      toast.error("Failed to update department");
    }
  };

  // ---------------Admin--------------------

  const [admin, setAdmin] = useState([]);

  //getAdmin
  const getAdmin = async () => {
    const url = `${link}/get-all-admin`;
    try {
      const response = await fetch(url);
      const responseData = await response.json();
      if (responseData.Success) {
        setAdmin(responseData.allAdmin);
        // console.log(responseData.allAdmin)
      } else {
        console.error("Failed to fetch admins");
      }
    } catch (error) {
      console.error("Error fetching admins:", error);
    }
  };

  // Add admin
  const addAdmin = async (name, email, password, avatar) => {
    const url = `${link}/create-user`;

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
        toast.error(`Error: ${data.msg || "Invalid Credentials!"}`);
        return;
      }

      if (!data.success) {
        console.error("Backend error:", data.errors);
        toast.error(`Error: ${data.msg || "Check your inputs."}`);
        return;
      }

      toast.success("Admin created successfully");
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  //delete Admin
  const deleteAdmin = async (id) => {
    const url = `${link}/deleteAdmin/${id}`;

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
      toast.success("Admin deleted successfully");
    } catch (error) {
      console.error("Failed to delete admin:", error);
      toast.error("Failed to delete admin");
    }
  };

  //edit Admin
  const editAdmin = async (id, name, email) => {
    const url = `${link}/editAdmin/${id}`;

    if (Array.isArray(name)) {
      name = name[0];
    }
    if (Array.isArray(email)) {
      email = email[0];
    }
    try {
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
      toast.success("Admin updated successfully");
    } catch (error) {
      console.error("Failed to update admin:", error);
      toast.error("Failed to update admin");
    }
  };

  // ------Staff ----------------------

  const [staff, setStaff] = useState([]);

  //get staff
  const getStaff = async () => {
    const url = `${link}/get-staffs`;
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
    const url = `${link}/add-Staff`;
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
      toast.success("Staff added successfully");
    } catch (error) {
      console.error("Error adding staff:", error);
      toast.error("Failed to add staff");
    }
  };

  //delete Staff
  const deleteStaff = async (id) => {
    const url = `${link}/delete-Staff/${id}`;
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
      toast.success("Staff deleted successfully");
    } catch (error) {
      console.error("Failed to delete staff:", error);
      toast.error("Failed to delete staff");
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
    const url = `${link}/edit-Staff/${id}`;
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
      toast.success("Staff updated successfully");
    } catch (error) {
      console.error("Failed to update staff:", error);
      toast.error("Failed to update staff");
    }
  };

  // -----------Salary-----------

  const [salary, setSalary] = useState([]);

  //get all salary
  const getSal = async () => {
    const url = `${link}/get-all-Salary`;

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
    const url = `${link}/add-Salary`;

    if (Array.isArray(StaffName)) {
      StaffName = StaffName[0];
    }
    if (Array.isArray(department)) {
      department = department[0];
    }
    if (Array.isArray(Paid_Salary)) {
      Paid_Salary = Paid_Salary[0];
    }
    try {
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
      toast.success("Salary added successfully!");
    } catch (error) {
      console.error("Failed to add salary:", error);
      toast.error("Failed to add salary");
    }
  };

  //delete salary
  const deleteSal = async (id) => {
    const url = `${link}/delete-Salary/${id}`;

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
      toast.success("Salary deleted successfully!");
    } catch (error) {
      console.error("Failed to delete salary:", error);
      toast.error("Failed to delete salary");
    }
  };

  //edit Salary
  const editSal = async (id, StaffName, department, Paid_Salary) => {
    const url = `${link}/edit-Salary/${id}`;

    if (Array.isArray(StaffName)) {
      StaffName = StaffName[0];
    }
    if (Array.isArray(department)) {
      department = department[0];
    }
    if (Array.isArray(Paid_Salary)) {
      Paid_Salary = Paid_Salary[0];
    }
    try {
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
      toast.success("Salary updated successfully!");
    } catch (error) {
      console.error("Failed to update salary:", error);
      toast.error("Failed to update salary");
    }
  };

  const [Adminlogin, setAdminlogin] = useState({ avatar: { url: "" } });

  //get Admin
  const getAdminProfile = async () => {
    try {
      const url = `${link}/get-user`;

      const response = await fetch(url, {
        headers: {
          token: localStorage.getItem("authToken"),
        },
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();

      // Check if the data is structured as expected
      if (result.data && result.data.avatar) {
        setAdminlogin(result.data);
      } else {
        console.error("Unexpected response structure:", result);
        setAdminlogin({ avatar: { url: "path/to/default/image.jpg" } });
      }
    } catch (error) {
      console.error("Error fetching admin profile:", error);
      // Set a default state if there is an error
      setAdminlogin({ avatar: { url: "path/to/default/image.jpg" } });
    }
  };

  // Inside your context or wherever loginProfile is defined
  const loginProfile = async (email, password, navigate) => {
    const url = `${link}/login`;

    if (Array.isArray(email)) {
      email = email[0];
    }
    if (Array.isArray(password)) {
      password = password[0];
    }

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        email: String(email),
        password: String(password),
      }),
    });

    const data = await response.json();
    if (data.Success) {
      localStorage.setItem("authToken", data.token);
      setAdminlogin(data.adminData);
      toast.success("Login Successfully!!");
      navigate("/dashboard");
    } else {
      toast.error("Invalid Credentials!..Check Again..");
      navigate("/");
      localStorage.removeItem("authToken");
    }
  };

  const updateProfile = async (id, name, password, avatar) => {
    const url = `${link}/updateDetails/${id}`;

    if (Array.isArray(name)) {
      name = name[0];
    }
    if (Array.isArray(password)) {
      password = password[0];
    }
    if (Array.isArray(avatar)) {
      avatar = avatar[0];
    }

    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("authToken"),
        },
        method: "PUT",
        body: JSON.stringify({
          name: String(name),
          password: String(password),
          avatar: String(avatar),
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        console.error("Failed to update profile:", responseData);
        return false;
      }
      // console.log(responseData)
      const data = JSON.parse(JSON.stringify(admin)); // Replace `salary` with `admin` or the appropriate state
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        if (element._id === id) {
          element.name = name;
          element.password = password;
          element.avatar = avatar;
          break;
        }
      }
      setAdmin(data);
      toast.success("Profile Updated..");
      return true;
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(`Error updating profile:${error}`);
      return false;
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
        getAdmin,
        admin,
        deleteAdmin,
        editAdmin,
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
        loginProfile,
        Adminlogin,
        getAdminProfile,
        updateProfile,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export default DataState;
