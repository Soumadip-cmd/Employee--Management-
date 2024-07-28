import React, { useState } from "react";
import Select, { components } from "react-select";
import { NavLink } from "react-router-dom";

export default function AddSalary() {
  const [isFocused, setIsFocused] = useState(false);

  function calculate() {
    let n1 = parseInt(document.getElementById("num1").value);
    let n2 = parseInt(document.getElementById("num2").value);
    let sum = n1 + n2;
    document.getElementById("total").value = sum;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const options = [
    { value: "1", label: "Soumadip Stark" },
    { value: "2", label: "Ram Swal" },
    { value: "3", label: "Sam Well" },
    { value: "4", label: "Jon Snow" },
  ];

  const handleChange = (selectedOption) => {
    console.log(selectedOption);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  // Custom styles
  const customStyles = {
    container: (provided) => ({
      ...provided,
      width: "100%",
    }),
    control: (provided) => ({
      ...provided,
      borderColor: "#ced4da",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#ced4da",
      },
    }),
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
    option: (provided) => ({
      ...provided,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    }),
    clearIndicator: (base) => ({
      ...base,
      display: isFocused ? "block" : "none",
    }),
  };

  // Custom DropdownIndicator (always hidden)
  const DropdownIndicator = () => null;

  // Custom ClearIndicator (conditionally shown on focus)
  const ClearIndicator = (props) => {
    return isFocused ? <components.ClearIndicator {...props} /> : null;
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg"
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
          <div className="mt-2 pt-2">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <NavLink
                    to="/"
                    className="text-dark fw-semibold text-decoration-none"
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
                    className="text-dark fw-semibold text-decoration-none"
                  >
                    ManageSalary
                  </NavLink>
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </nav>
      <div className="bg-muted pt-2 extra-special2 min-h-screen d-flex justify-content-center align-items-center">
        <div className="bg-card p-6 w-100 max-w-4xl">
          <h1 className="text-2xl font-bold text-foreground mb-4">Salary</h1>
          <div
            className="bg-white p-4 rounded-lg shadow-md rounded-top rounded-bottom-1"
            style={{ borderTop: "5px solid #004dffe8" }}
          >
            <form action="" onSubmit={handleSubmit}>
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

                <select
                  className="form-control"
                  style={{ border: "1px solid" }}
                  required
                  defaultValue=""
                >
                  <option value="" disabled>
                    --Department Name--
                  </option>
                  <option value="Backend development">
                    Backend development
                  </option>
                  <option value="Designing">Designing</option>
                  <option value="Front-end development">
                    Front-end development
                  </option>
                  <option value="Marketing">Marketing</option>
                  <option value="Finance">Finance</option>
                </select>
              </div>
              <div className="table-responsive">
                <table className="table table-bordered bg-white rounded-lg table-striped tablestyle">
                  <thead className="tablestyle">
                    <tr>
                      <th className="px-4 py-2 text-start">Staff</th>
                      <th className="px-4 py-2 text-start">Basic Salary($)</th>
                      <th className="px-4 py-2 text-start">Allowance($)</th>
                      <th className="px-4 py-2 text-start">Total($)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-1 px-2 tablestyle">
                        <Select
                          options={options}
                          onChange={handleChange}
                          placeholder="Select an option..."
                          isClearable
                          menuPortalTarget={document.body}
                          styles={customStyles}
                          menuPosition="fixed"
                          components={{ DropdownIndicator, ClearIndicator }}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                          required
                        />
                      </td>
                      <td className="p-1 px-2 tablestyle">
                        <input
                          type="number"
                          id="num1"
                          className="rounded-2 w-100 px-2"
                          style={{ border: "1px solid black" }}
                          onChange={calculate}
                          required
                        />
                      </td>
                      <td className="p-1 px-2 tablestyle">
                        <input
                          type="number"
                          id="num2"
                          className="rounded-2 w-100 px-2"
                          style={{ border: "1px solid black" }}
                          onChange={calculate}
                          required
                        />
                      </td>
                      <td className="p-1 px-2 tablestyle">
                        <input
                          type="number"
                          id="total"
                          className="rounded-2 w-100 px-2"
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
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
