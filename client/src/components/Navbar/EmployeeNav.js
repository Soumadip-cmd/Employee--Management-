import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const EmployeeNav = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [staffProfile, setStaffProfile] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/get-staff`, {
          headers: {
            'staff-token': localStorage.getItem('staff-token')
          }
        });
        const { success, data } = await response.json();
        if (success && data) {
          setStaffProfile(data); // Store the data directly
        }
      } catch (error) {
        console.error('Error fetching staff data:', error);
      }
    };

    fetchStaffData();
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const moveRoute = (id) => {
    if (id) {
      setDropdownOpen(false);
      navigate(`/employee/profile/${id}`);
    }
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const logOut = () => {
    try {
      setDropdownOpen(false);
      localStorage.removeItem("staff-token");
      setStaffProfile(null);
      toast.success("Logout Successful");
      navigate("/");
    } catch (error) {
      toast.error("Logout Failed");
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <>
      <nav
        className="d-flex justify-content-between ps-4 pe-2 align-items-center"
        style={{
          background: "#112a47",
          height: "50px",
          position: "fixed",
          zIndex: "20",
          width: "100%",
        }}
      >
        <NavLink
          to="/employee/dashboard"
          className="float-start fw-bold text-decoration-none"
          style={{ fontFamily: '"Playwrite US Modern", cursive' }}
        >
          <span className="opacity-80" style={{ color: "#f55757" }}>
            Employee
          </span>{" "}
          <span className="text-info">Management</span>
        </NavLink>

        <div className="flex-shrink-0 dropdown mx-2 mx-lg-3" ref={dropdownRef}>
          <NavLink
            to="/employee/dashboard"
            className="d-block link-body-emphasis text-decoration-none dropdown-toggle dropdown-toggle-no-caret"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            onClick={toggleDropdown}
          >
            {staffProfile?.photo?.public_id ? (
              <img
                src={staffProfile.photo.url}
                alt={staffProfile.name || "Profile"}
                className="rounded-circle"
                width="32"
                height="32"
                style={{ objectFit: "cover" }}
              />
            ) : (
              <img
                src="https://placehold.co/32x32"
                alt="Profile"
                className="rounded-circle"
                width="32"
                height="32"
              />
            )}
          </NavLink>
          <ul
            className={`dropdown-menu text-small shadow ${
              dropdownOpen ? "show" : ""
            }`}
          >
            <li>
              <NavLink
                className="dropdown-item"
                to="/employee/dashboard"
                onClick={closeDropdown}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className="dropdown-item"
                to={`/employee/profile/${staffProfile?._id}`}
                onClick={() => moveRoute(staffProfile?._id)}
              >
                Profile
              </NavLink>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <NavLink className="dropdown-item" to="/" onClick={logOut}>
                Sign out
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default EmployeeNav;