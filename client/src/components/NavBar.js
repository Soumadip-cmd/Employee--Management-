import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <nav
        className=" d-flex justify-content-between ps-4 pe-2 align-items-center "
        style={{ background: "#112a47", height: "50px",position:'fixed',zIndex:'20',width:'100%' }}
      >
        <NavLink
        to='/'
          className="float-start fw-bold text-decoration-none"
          style={{ fontFamily: '"Playwrite US Modern", cursive' }}
        >
          <span className=" opacity-80" style={{color:'#f55757'}}>Employee</span>{" "}
          <span className="text-info">Management</span>
        </NavLink>
        {/* <span className="float-end text-white mx-2 px-2 py-1" style={{border:'1px solid white', borderRadius:'50%',cursor:'pointer'}}><i className=" fa-regular fa-user fa"></i></span> */}

        <div className="flex-shrink-0 dropdown mx-2 mx-lg-3">
          <NavLink
            to="/"
            className="d-block link-body-emphasis text-decoration-none dropdown-toggle dropdown-toggle-no-caret"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="https://placehold.co/32x32"
              alt="mdo"
              width="32"
              height="32"
              className="rounded-circle"
            />
          </NavLink>
          <ul className="dropdown-menu text-small shadow">
           
            <li>
              <a className="dropdown-item" href="#">
                Settings
              </a>
            </li>
            <li>
              <NavLink className="dropdown-item" to="/profile">
                Profile
              </NavLink>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <NavLink className="dropdown-item" to="/login">
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
