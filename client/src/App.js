import React, { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Test from "./components/Test";
import SlideNavbar from "./components/SlideNavbar";
import NavBar from "./components/NavBar";
import Dashboard from "./components/Dashboard/Dashboard";
import ApplyLeave from "./components/Leave/ApplyLeave";
import LeaveHistory from "./components/Leave/LeaveHistory";
import ManageSalary from "./components/Salary/ManageSalary";
import YourSalary from "./components/Salary/YourSalary";
import AddSalary from "./components/Salary/AddSalary";
import AddDepartment from "./components/Department/AddDepartment";
import ManageDepartment from "./components/Department/ManageDepartment";
import AddStaff from "./components/Staff/Add Staff";
import ManageStaff from "./components/Staff/ManageStaff";
import Login from "./components/Authentication/Login";
import StaffLeave from "./components/Leave/StaffLeave";
import AddAdmin from "./components/Admin/AddAdmin";
import ManageAdmin from "./components/Admin/ManageAdmin";
import Profile from "./components/Profile/Profile";
import DataState from "./context/DataState";
import EditDepartment from "./components/Department/EditDepartment";
import EditAdmin from "./components/Admin/EditAdmin";
import EditStaff from "./components/Staff/EditStaff";
import EditSalary from "./components/Salary/EditSalary";
import  { Toaster } from 'react-hot-toast';
import ForgetPass from "./components/Authentication/ForgetPass";



function App() {
  const [isLargeDevice, setIsLargeDevice] = useState(window.innerWidth >= 1300);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeDevice(window.innerWidth >= 1300);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const router = createBrowserRouter([
    {
      path: "/dashboard",
      element: (
        <>
          {<SlideNavbar />}
          <NavBar />
          <Dashboard />
        </>
      ),
    },
    {
      path: "/",
      element: <Login />,
    },
    
    {
      path: "/addDepartment",
      element: (
        <>
          {isLargeDevice && <SlideNavbar />}
          <NavBar />
          <AddDepartment />
        </>
      ),
    },
    {
      path: "/addAdmin",
      element: (
        <>
          {isLargeDevice && <SlideNavbar />}
          <NavBar />
          <AddAdmin />
        </>
      ),
    },
    {
      path: "/editAdmin/:id",
      element: (
        <>
          {isLargeDevice && <SlideNavbar />}
          <NavBar />
          <EditAdmin/>
        </>
      ),
    },
    {
      path: "/manageAdmin",
      element: (
        <>
          {isLargeDevice && <SlideNavbar />}
          <NavBar />
          <ManageAdmin />
        </>
      ),
    },
    {
      path: "/Staffleave",
      element: (
        <>
          {isLargeDevice && <SlideNavbar />}
          <NavBar />
          <StaffLeave />
        </>
      ),
    },
    {
      path: "/profile/:id",
      element: (
        <>
          {isLargeDevice && <SlideNavbar />}
          <NavBar />
          <Profile />
        </>
      ),
    },
    {
      path: "/manageDepartment",
      element: (
        <>
          {isLargeDevice && <SlideNavbar />}
          <NavBar />
          <ManageDepartment />
        </>
      ),
    },
    {
      path: "/editDepartment/:id",
      element: (
        <>
          {isLargeDevice && <SlideNavbar />}
          <NavBar />
          <EditDepartment/>
        </>
      ),
    },
    {
      path: "/addStaff",
      element: (
        <>
          {isLargeDevice && <SlideNavbar />}
          <NavBar />
          <AddStaff />
        </>
      ),
    },
    {
      path: "/editStaff/:id",
      element: (
        <>
          {isLargeDevice && <SlideNavbar />}
          <NavBar />
          <EditStaff/>
        </>
      ),
    },
    {
      path: "/manageStaff",
      element: (
        <>
          {isLargeDevice && <SlideNavbar />}
          <NavBar />
          <ManageStaff />
        </>
      ),
    },
    {
      path: "/addSalary",
      element: (
        <>
          {isLargeDevice && <SlideNavbar />}
          <NavBar />
          <AddSalary />
        </>
      ),
    },
    {
      path: "/editSalary/:id",
      element: (
        <>
          {isLargeDevice && <SlideNavbar />}
          <NavBar />
          <EditSalary/>
        </>
      ),
    },
    {
      path: "/manageSalary",
      element: (
        <>
          {isLargeDevice && <SlideNavbar />}
          <NavBar />
          <ManageSalary />
        </>
      ),
    },
    {
      path: "/yoursalary",
      element: (
        <>
          {isLargeDevice && <SlideNavbar />}
          <NavBar />
          <YourSalary />
        </>
      ),
    },
    {
      path: "/applyLeave",
      element: (
        <>
          
          <ApplyLeave />
        </>
      ),
    },
    {
      path: "/forgetPass",
      element: (
        <>
          
          <ForgetPass/>
        </>
      ),
    },
   
    {
      path: "/leaveHistory",
      element: (
        <>
          {isLargeDevice && <SlideNavbar />}
          <NavBar />
          <LeaveHistory />
        </>
      ),
    },
    {
      path: "/test",
      element: <Test />,
    },
   
  ]);

  return (
    <>
      <DataState>
      <Toaster/>
        <RouterProvider router={router} />
      </DataState>
    </>
  );
}

export default App;
