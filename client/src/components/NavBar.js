import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
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
        style={{ background: "#112a47", height: "50px", position: 'fixed', zIndex: '20', width: '100%' }}
      >
        <NavLink
          to='/'
          className="float-start fw-bold text-decoration-none"
          style={{ fontFamily: '"Playwrite US Modern", cursive' }}
        >
          <span className="opacity-80" style={{ color: '#f55757' }}>Employee</span>{" "}
          <span className="text-info">Management</span>
        </NavLink>

        <div className="flex-shrink-0 dropdown mx-2 mx-lg-3" ref={dropdownRef}>
          <NavLink
            to="/"
            className="d-block link-body-emphasis text-decoration-none dropdown-toggle dropdown-toggle-no-caret"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            onClick={toggleDropdown}
          >
            <img
              src="https://placehold.co/32x32"
              alt="profile"
              width="32"
              height="32"
              className="rounded-circle"
            />
          </NavLink>
          <ul className={`dropdown-menu text-small shadow ${dropdownOpen ? 'show' : ''}`}>
            <li>
              <NavLink className="dropdown-item" to="/" onClick={closeDropdown}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink className="dropdown-item" to="/profile" onClick={closeDropdown}>
                Profile
              </NavLink>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <NavLink className="dropdown-item" to="/login" onClick={closeDropdown}>
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