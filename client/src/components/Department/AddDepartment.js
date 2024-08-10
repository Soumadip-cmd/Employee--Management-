import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import DataContext from "../../context/DataContext";
import LoadingSub from "../Loading/LoadingSub"; // Import your LoadingSub component

const AddDepartment = () => {
  const [add_dept, setAdd_dept] = useState({ employeeId: "", deptName: "" });
  const [loading, setLoading] = useState(false); // State to manage loading
  const { addDept } = useContext(DataContext);

  let boxstyle = {
    background: "white",
    padding: "21px",
    borderTop: "5px solid #004dffe8",
    borderRadius: "5px",
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('authToken')) {
      navigate('/');
    }
    // eslint-disable-next-line
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the form is submitted

    // Simulating an async operation (e.g., network request)
    setTimeout(() => {
      addDept(add_dept.deptName, add_dept.employeeId);
      setAdd_dept({ employeeId: "", deptName: "" });
      setLoading(false); // Set loading to false when the operation is complete
    }, 2000);
  };

  const handleChange = (e) => {
    setAdd_dept({ ...add_dept, [e.target.name]: e.target.value });
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
            to="/dashboard"
          >
            Dept.
          </NavLink>

          <div className="mt-2 pt-2">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <NavLink
                    to="/dashboard"
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
                    to="/manageDepartment"
                    className="text-dark fw-semibold text-decoration-none"
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
      <div className="mb-4 pt-3 extra-special">
        <div className="row d-flex justify-content-evenly" style={boxstyle}>
          <h5 style={{ fontSize: "20px" }} className="px-2">
            Add Department
          </h5>
          <hr />
          <div className="col-12">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <b>Enter Your Employee ID</b>
                <span style={{ color: "red" }}>*</span>
                <input
                  type="text"
                  className="form-control"
                  id="employeeId"
                  name="employeeId"
                  value={add_dept.employeeId}
                  style={{ border: "1px solid" }}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <b>Department Name </b>
                <span style={{ color: "red" }}>*</span>
                <input
                  type="text"
                  className="form-control"
                  id="deptName"
                  name="deptName"
                  value={add_dept.deptName}
                  style={{ border: "1px solid" }}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="float-end mx-1">
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  id="cancel"
                  onClick={() => navigate('/manageDepartment')}
                >
                  Cancel
                </button>
              </div>
              <div className="float-end mx-1">
                {loading ? (
                  <LoadingSub btnName="Submit" color="primary" />
                ) : (
                  <button
                    type="submit"
                    className="btn btn-primary"
                    id="applyleave"
                  >
                    Submit
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddDepartment;
