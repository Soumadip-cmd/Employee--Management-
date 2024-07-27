import React from "react";
import { NavLink } from "react-router-dom";
const AddDepartment = () => {
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
            Dept.
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
                    to="/manageDepartment"
                    className=" text-dark fw-semibold text-decoration-none"
                  >
                    ManageDept.
                  </NavLink>
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </nav>
      <div className="container my-2 pt-3">
        <h2>Department Management</h2>
      </div>
      <div className=" mb-4 pt-3  extra-special">
        <div className="row d-flex justify-content-evenly  " style={boxstyle}>
          <h5 style={{ fontSize: "20px" }} className="px-2">
            Add Department
          </h5>
          <hr />
          <div className="col-12">
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
              <b>Department Name </b>
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
            <div className="">
              <button
                type="submit"
                className="btn btn-outline-danger float-end mx-1"
                id="applyleave"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary float-end mx-1"
                id="applyleave"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddDepartment;
