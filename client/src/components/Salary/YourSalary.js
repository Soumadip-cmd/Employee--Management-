import React, { useState } from "react";
import "./managesalary.css";

import { NavLink } from "react-router-dom";
export default function ManageSalary() {
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
              Salary
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
                      to="/addsalary"
                      className=" text-dark fw-semibold text-decoration-none"
                    >
                      AddSalary
                    </NavLink>
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </nav>
        <div className="p-6  text-dark">
          <div className="container max-w-4xl mx-auto  text-dark rounded-lg shadow-md">
            <div className="py-4 border-bottom">
              <h1 className="h3 mb-0">Your Paid Salary</h1>
            </div>
            <div
              className="p-4 bg-white  rounded-top rounded-bottom-1 shadow"
              style={{ borderTop: "5px solid #004dffe8" }}
            >
              <h2 className="h4 mb-4"> Salary</h2>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex align-items-center gap-2">
                  <label htmlFor="entries" className="form-label  fs-6">
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
                <table className="table table-bordered">
                  <thead className="table-secondary">
                    <tr>
                      <th>#</th>
                      <th>Staff Name</th>
                      <th>Department</th>
                      <th>Salary</th>

                      
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Mr. Soumadip Santra</td>
                      <td>Backend Development</td>
                      <td>$2 M</td>
                      
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
        </div>
      </>
    </>
  );
}
