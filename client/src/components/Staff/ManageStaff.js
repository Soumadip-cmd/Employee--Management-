import React, { useState } from "react";
import "../Leave/ApplyLeave.css";
import { NavLink } from "react-router-dom";

export default function ManageStaff() {
  let boxstyle = {
    background: "white",
    padding: "21px",
    borderTop: "5px solid #004dffe8",
    borderRadius: "5px",
    height: "auto",
  };
  const [entries, setEntries] = useState(1);
  const [search, setSearch] = useState("");

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
                  Manage
                </li>
                <li className="breadcrumb-item">
                  <NavLink
                    to="/addStaff"
                    className=" text-dark fw-semibold text-decoration-none"
                  >
                    AddStaff
                  </NavLink>
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </nav>
      <div className=" pt-3  extra-special3  text-dark ">
        <h1 className="fs-2 mb-4">Staff Management</h1>
        <div
          className="bg-white     text-dark p-3 py-4 rounded-top rounded-bottom-1 shadow"
          style={{ borderTop: "5px solid #004dffe8" }}
        >
          <h2 className="fs-4 fw-semibold mb-4 border-bottom pb-2">
            View Staff
          </h2>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="d-flex align-items-center gap-2">
              <label htmlFor="entries" className="  fs-6">
                Show
              </label>
              <select
                id="entries"
                className="form-select border-1  border-black form-select-sm"
                value={entries}
                onChange={(e) => setEntries(e.target.value)}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
              <span className="fs-6">entries</span>
            </div>

            <div className="d-flex align-items-center gap-2">
              <input
                type="text"
                placeholder="Search"
                className="form-control  d-none d-md-flex"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="btn btn-danger btn-sm">Search</button>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table table-bordered tablestyle table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Photo</th>
                  <th>Department</th>
                  <th>Gender</th>

                  <th>Mobile</th>
                  <th>Email</th>
                  <th>DOB</th>
                  <th>Joined On</th>
                  <th>Address</th>
                  <th>City</th>
                  <th>State</th>
                  <th>Country</th>
                  <th>Applied On</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Soumadip santra</td>
                  <td className="text-center">
                    <img
                      className=" rounded-2 "
                      src="https://placehold.co/64x64"
                      alt="img-Profile"
                    />
                  </td>
                  <td>Web Developement</td>
                  <td>Male</td>
                  <td>8965321459</td>
                  <td>souma@mail.com</td>
                  <td>05-02-2004</td>
                  <td>05-07-2024</td>
                  <td>G.T. Road (278/B/4)</td>
                  <td>Kolkata</td>
                  <td>WB</td>
                  <td>India</td>

                  <td>20-12-23</td>
                  <td className="py-2 px-4 ">
                    <span className="badge text-bg-success mx-1 px-2">Edit</span>
                    <span className="badge text-bg-danger mx-1 px-2">Delete</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-4">
            <span className="fs-6">Showing 1 to 2 of 2 entries</span>
            <div className="d-flex gap-2">
              <button className="btn btn-primary btn-sm">&lt;</button>
              <button className="btn btn-primary btn-sm">1</button>
              <button className="btn btn-primary btn-sm">&gt;</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
