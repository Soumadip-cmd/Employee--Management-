import React, { useState } from "react";
import "../Leave/ApplyLeave.css";
import { NavLink } from "react-router-dom";

export default function AddStaff() {
  let boxstyle = {
    background: "white",
    padding: "21px",
    borderTop: "5px solid #004dffe8",
    borderRadius: "5px",
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg "
        style={{ backgroundColor: "rgb(0 77 255 / 65%)" }}
      >
        <div className="container mt-5">
          <NavLink
            className="navbar-brand"
            style={{
              fontSize: "25px",
              color: "white",
              letterSpacing: ".05125em",
            }}
            to="/"
          >
            Staff
          </NavLink>

          <div className=" mt-2 pt-2">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <NavLink
                    to="/"
                    className=" text-dark fw-semibold text-decoration-none"
                  >
                    Home
                  </NavLink>
                </li>
                <li
                  className="breadcrumb-item active fw-semibold text-decoration-underline"
                  aria-current="page"
                >
                  Add
                </li>
                <li className="breadcrumb-item">
                  <NavLink
                    to="/manageStaff"
                    className=" text-dark fw-semibold text-decoration-none"
                  >
                    ManageStaff
                  </NavLink>
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </nav>
      <div className="container my-2 pt-3">
        <h2>Staff Management</h2>
      </div>
      <div className=" mb-4 pt-3  extra-special">
        <div className="row d-flex justify-content-evenly  " style={boxstyle}>
          <h5 style={{ fontSize: "20px" }} className="px-2">
            Add Staff
          </h5>
          <hr />
          <div className="col-sm-12 col-md-6 col-lg-6">
            <div className="mb-3">
              <b className="">Full Name</b>
              <span style={{ color: "red" }}>*</span>
              <input
                type="text"
                className="form-control"
                placeholder="William Smith"
                style={{ border: "1px solid" }}
              />
            </div>

            <div className="mb-3">
              <b className="">Gender</b>
              <span style={{ color: "red" }}>*</span>
              <select className="form-control" style={{ border: "1px solid" }}>
                <option disabled default selected Value={"--Select--"}>
                  --Select--
                </option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>

            <div className="mb-3">
              <b>Mobile</b>
              <span style={{ color: "red" }}>*</span>
              <input
                type="tel"
                max={10}
                className="form-control"
                style={{ border: "1px solid" }}
              />
            </div>

            <div className="mb-3">
              <b>Date of Birth</b>
              <span style={{ color: "red" }}>*</span>
              <input
                type="date"
                className="form-control"
                style={{ border: "1px solid" }}
              />
            </div>

            <div className="mb-3">
              <b>City</b>
              <span style={{ color: "red" }}>*</span>
              <input
                type="text"
                className="form-control"
                style={{ border: "1px solid" }}
              />
            </div>

            <div className="mb-3">
              <b>Country</b>
              <span style={{ color: "red" }}>*</span>
              <input
                type="text"
                className="form-control"
                style={{ border: "1px solid" }}
              />
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6">
            <div className="mb-3">
              <b className="">Department</b>
              <span style={{ color: "red" }}>*</span>
              <select className="form-control" style={{ border: "1px solid" }}>
                <option disabled default selected Value={"--Department Name--"}>
                  --Department Name--
                </option>
                <option>Backend developement</option>
                <option>Designing</option>
                <option>Front-end developement</option>
                <option>Marketing</option>
                <option>Finance</option>
              </select>
            </div>
            <div className="mb-3">
              <b>Email</b>
              <span style={{ color: "red" }}>*</span>
              <input
                type="email"
                className="form-control"
                style={{ border: "1px solid" }}
              />
            </div>
            <div className="mb-3">
              <b>Your Photo</b>
              <span style={{ color: "red" }}>*</span>
              <input
                type="file"
                className="form-control"
                style={{ border: "1px solid" }}
              />
            </div>
            <div className="mb-3">
              <b>Date of Joining</b>
              <span style={{ color: "red" }}>*</span>
              <input
                type="date"
                className="form-control"
                style={{ border: "1px solid" }}
              />
            </div>
            <div className="mb-3">
              <b>State</b>
              <span style={{ color: "red" }}>*</span>
              <input
                type="text"
                className="form-control"
                style={{ border: "1px solid" }}
              />
            </div>
            <div className="mb-3">
              <b>Address</b>
              <span style={{ color: "red" }}>*</span>
              <textarea
                className="form-control"
                placeholder="Description"
                id="leave_description"
                name="leave_description"
                style={{ border: "1px solid" }}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary float-end"
              id="applyleave"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
