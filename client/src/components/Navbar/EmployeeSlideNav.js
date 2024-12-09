import React, { useEffect } from "react";
import "./SlideNavBar.css";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function EmployeeSlideNav() {
  useEffect(() => {
    const hamBurger = document.querySelector(".toggle-btn");
    const backdrop = document.querySelector(".backdrop");
    const sidebar = document.querySelector("#sidebar");
    const mainNavigation = document.querySelector(".main-navigation");

    const handleToggle = () => {
      sidebar.classList.toggle("expand");
      backdrop.classList.toggle("show");
      mainNavigation.classList.toggle("visible");
    };

    const handleCloseSidebar = (e) => {
      if (!sidebar.contains(e.target) && sidebar.classList.contains("expand")) {
        sidebar.classList.remove("expand");
        backdrop.classList.remove("show");
        mainNavigation.classList.remove("visible");
      }
    };

    hamBurger.addEventListener("click", handleToggle);
    backdrop.addEventListener("click", handleToggle);
    document.addEventListener("click", handleCloseSidebar);

    return () => {
      hamBurger.removeEventListener("click", handleToggle);
      backdrop.removeEventListener("click", handleToggle);
      document.removeEventListener("click", handleCloseSidebar);
    };
  }, []);
  
  const navigate = useNavigate();

  const logOut = () => {
    try {
      localStorage.removeItem("staff-token");
      toast.success("Logout Successful");
      navigate("/");
    } catch (error) {
      toast.error("Logout Failed");
    }
  };
  
  return (
    <>
      <div className="wrapper">
        <div className="backdrop"></div>

        <aside id="sidebar" className="scroll">
          <div className="d-flex">
            <button className="toggle-btn" type="button">
              <i className="fa-solid fa-compact-disc"></i>
            </button>
            <div className="sidebar-logo">
              <NavLink to="/employee/dashboard" className="NavBody">
                Employee Portal
              </NavLink>
            </div>
          </div>
          <form className="d-flex px-2 pb-4 position-relative" role="search">
            <input
              className="form-control text-white border-0 pl-6"
              style={{ background: "#586682b0" }}
              type="search"
              placeholder=" Search . . . "
              aria-label="Search"
            />
            <button
              className="position-absolute rounded-pill border-0"
              style={{ right: "20px", top: "5px" }}
            >
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
          <div
            className="px-4 py-2 text-capitalize text-white text-opacity-50 main-navigation"
            style={{ background: "#586682b0", whiteSpace: "nowrap" }}
          >
            main navigation
          </div>
          <ul className="sidebar-nav">
            <li className="sidebar-item">
              <NavLink to="/employee/dashboard" className="NavBody pt-2 sidebar-link">
                <i className="fa-solid fa-shop"></i>
                <span>Dashboard</span>
              </NavLink>
            </li>

            <li className="sidebar-item">
              <NavLink
                className="NavBody sidebar-link collapsed has-dropdown"
                data-bs-toggle="collapse"
                data-bs-target="#Salary"
                aria-expanded="false"
                aria-controls="Salary"
              >
                <i className="fa-solid fa-sack-dollar"></i>
                <span>Salary</span>
              </NavLink>
              <ul
                id="Salary"
                className="sidebar-dropdown list-unstyled collapse"
                data-bs-parent="#sidebar"
              >
                <li className="sidebar-item">
                  <NavLink to="/employee/salary" className="NavBody sidebar-link">
                    View Salary
                  </NavLink>
                </li>
              </ul>
            </li>

            <li className="sidebar-item">
              <NavLink
                className="NavBody sidebar-link collapsed has-dropdown"
                data-bs-toggle="collapse"
                data-bs-target="#Leave"
                aria-expanded="false"
                aria-controls="Leave"
              >
                <i className="fa-solid fa-share"></i>
                <span>Leave</span>
              </NavLink>
              <ul
                id="Leave"
                className="sidebar-dropdown list-unstyled collapse"
                data-bs-parent="#sidebar"
              >
                <li className="sidebar-item">
                  <NavLink to="/applyLeave" className="NavBody sidebar-link">
                    Request Leave
                  </NavLink>
                </li>
                <li className="sidebar-item">
                  <NavLink to="/leaveHistory" className="NavBody sidebar-link">
                    Leave History
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
          <hr
            className="border-1 text-white m-0"
            style={{ background: "#586682b0" }}
          />
          <div className="sidebar-footer">
            <NavLink className="NavBody sidebar-link" onClick={logOut}>
              <i className="lni lni-exit"></i>
              <span>Logout</span>
            </NavLink>
          </div>
        </aside>
      </div>
    </>
  );
}