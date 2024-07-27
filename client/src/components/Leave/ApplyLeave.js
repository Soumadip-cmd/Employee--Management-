import React, { useState } from "react";
import "./ApplyLeave.css";
import { NavLink } from "react-router-dom";

export default function ApplyLeave() {
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
            Leave
          </NavLink>

          <div className=" mt-2 pt-2">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <NavLink to="/" className=" text-dark fw-semibold text-decoration-none">Home</NavLink>
                </li>
                <li className="breadcrumb-item active fw-semibold text-decoration-underline" aria-current="page">
                  Leave
                </li>
                <li className="breadcrumb-item">
                  <NavLink to="/leaveHistory" className=" text-dark fw-semibold text-decoration-none">LeaveHistory</NavLink>
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </nav>
      <div className="container my-2 pt-3">
        <h2>Leave Management</h2>
      </div>
      <div className=" mb-4 pt-3  extra-special">
        <div className="row d-flex justify-content-evenly  " style={boxstyle}>
          <h5 style={{ fontSize: "20px" }} className="px-2">
            Apply Leave
          </h5>
          <hr />
          <div className="col-sm-12 col-md-6 col-lg-6">
            <div className="mb-3">
              <b>Enter Your Employee ID</b>
              <span style={{ color: "red" }}>*</span>
              <input
                type="text"
                className="form-control"
                id="user_id"
                name="user_id"
                placeholder="Employee ID"
                style={{ border: "1px solid" }}
              />
            </div>
            <div className="mb-3">
              <b>Reason</b>
              <span style={{ color: "red" }}>*</span>
              <input
                type="text"
                className="form-control"
                id="reason"
                name="reason"
                placeholder="Reason"
                style={{ border: "1px solid" }}
              />
            </div>
            <div className="mb-3">
              <b>Leave From</b>
              <span style={{ color: "red" }}>*</span>
              <input
                type="date"
                className="form-control"
                id="leave_startdate"
                style={{ border: "1px solid" }}
                name="leave_startdate"
              />
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6">
            <div className="mb-3">
              <b>Leave To</b>
              <span style={{ color: "red" }}>*</span>
              <input
                type="date"
                className="form-control"
                id="leave_enddate"
                name="leave_enddate"
                style={{ border: "1px solid" }}
              />
            </div>
            <div className="mb-3">
              <b>Description(Brief)</b>
              <span style={{ color: "red" }}>*</span>
              <textarea
                className="form-control"
                placeholder="Description"
                id="leave_description"
                name="leave_description"
                style={{ border: "1px solid" }}
              />
            </div>
            <div className="mb-3">
              <b>
                Upload Supporting Documents (Optional, Except for Urgent Cases)
              </b>
              <input
                type="file"
                className="form-control"
                id="leave_docx"
                name="leave_docx"
                accept="png/pdf"
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
