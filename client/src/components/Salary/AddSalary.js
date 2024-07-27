import React, { useEffect } from "react";

import { NavLink } from "react-router-dom";

export default function AddSalary() {
  let boxstyle = {
    background: "white",
    padding: "21px",
    borderTop: "5px solid #004dffe8",
    borderRadius: "5px",
  };
  function calculate() {
    let n1 = parseInt(document.getElementById("num1").value);
    let n2 = parseInt(document.getElementById("num2").value);
    let sum = n1 + n2;
    //  console.log(sum
    document.getElementById("total").value = sum;
  }

  return (
    <>
      {/* <div class="alert alert-success m-3" role="alert"  >
        A simple success alert—check it out!
      </div> */}
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
                  Add
                </li>
                <li className="breadcrumb-item">
                  <NavLink
                    to="/manageSalary"
                    className=" text-dark fw-semibold text-decoration-none"
                  >
                    ManageSalary
                  </NavLink>
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </nav>
      <div className="bg-muted pt-2   extra-special2 min-h-screen d-flex justify-content-center align-items-center">
        <div className="bg-card p-6 w-100 max-w-4xl">
          <h1 className="text-2xl font-bold text-foreground mb-4">Salary</h1>
          <div
            className="bg-white p-4 rounded-lg shadow-md rounded-top rounded-bottom-1  "
            style={{ borderTop: "5px solid #004dffe8" }}
          >
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Add Salary
            </h2>
            <div className="mb-4">
              <label
                htmlFor="department"
                className="form-label text-muted-foreground mb-2"
              >
                <b>Department Name</b>
              </label>

              <select className="form-control" style={{ border: "1px solid" }}>
                <option disabled selected default Value={"--Department Name--"}>
                  --Department Name--
                </option>
                <option>Backend developement</option>
                <option>Designing</option>
                <option>Front-end developement</option>
                <option>Marketing</option>
                <option>Finance</option>
              </select>
            </div>
            <div className="table-responsive">
              <table className="table table-bordered bg-white rounded-lg table-striped tablestyle">
                <thead className="tablestyle">
                  <tr>
                    <th className=" px-4 py-2 text-start">Staff</th>
                    <th className=" px-4 py-2 text-start">Basic Salary($)</th>
                    <th className=" px-4 py-2 text-start">Allowance($)</th>
                    <th className=" px-4 py-2 text-start">Total($)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className=" p-1 px-2 tablestyle">Soumadip santra</td>
                    <td className=" p-1 px-2 tablestyle">
                      <input
                        type="number"
                        id="num1"
                        className=" rounded-2 w-100 px-2 "
                        style={{ border: "1px solid black" }}
                        onChange={calculate}
                      />
                    </td>
                    <td className=" p-1 px-2 tablestyle">
                      <input
                        type="number"
                        id="num2"
                        className=" rounded-2 w-100 px-2 "
                        style={{ border: "1px solid black" }}
                        onChange={calculate}
                      />
                    </td>
                    <td className=" p-1 px-2 tablestyle">
                      <input
                        type="number"
                        id="total"
                        className=" rounded-2  w-100 px-2"
                        style={{ border: "1px solid black" }}
                        readOnly
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 d-flex justify-content-end">
              <button className="btn btn-primary text-primary-foreground hover:bg-primary/80 px-4 py-2 rounded-lg">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>{" "}
    </>
  );
}
