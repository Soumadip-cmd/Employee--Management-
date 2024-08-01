import React, { useState, useEffect, useRef, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import DataContext from "../context/DataContext";
import Img from "./Admin/Img";

const NavBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const { getAdmin, Adminlogin } = useContext(DataContext);

  useEffect(() => {
    getAdmin();
    // eslint-disable-next-line
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const moveRoute=(id)=>{
    setDropdownOpen(false);
    navigate(`/profile/${id}`)
  }

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const logOut = () => {
    setDropdownOpen(false);
    localStorage.removeItem("authToken");
    alert("Logout Successful");
    navigate("/");
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
          to="/dashboard"
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
            to="/dashboard"
            className="d-block link-body-emphasis text-decoration-none dropdown-toggle dropdown-toggle-no-caret"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            onClick={toggleDropdown}
          >
            <Img
              upload_id={Adminlogin.avatar.public_id}
              classN="rounded-circle"
              width="32px"
            />
          </NavLink>
          <ul
            className={`dropdown-menu text-small shadow ${
              dropdownOpen ? "show" : ""
            }`}
          >
            <li>
              <NavLink
                className="dropdown-item"
                to="/dashboard"
                onClick={closeDropdown}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className="dropdown-item"
                to={`/profile/${Adminlogin._id}`}
                onClick={()=>moveRoute(Adminlogin._id)}
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

export default NavBar;
