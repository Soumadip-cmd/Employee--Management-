import React, { useContext, useEffect, useState } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import DataContext from "../../context/DataContext";

const EditDepartment = () => {
  const { id } = useParams();
  const { dept, editDept } = useContext(DataContext);
  const navigate = useNavigate();
  const [editDeptData, setEditDeptData] = useState({ id: id, employeeId: "", deptName: "" });

  let boxStyle = {
    background: "white",
    padding: "21px",
    borderTop: "5px solid #004dffe8",
    borderRadius: "5px",
  };

  useEffect(() => {
    const deptData = dept.find((data) => data._id === id);
    if (deptData) {
      setEditDeptData({ id: deptData._id, employeeId: deptData.employeeId, deptName: deptData.deptName });
    }
  }, [id, dept]);

  const handleSubmit = (e) => {
    e.preventDefault();
    editDept(editDeptData.id, editDeptData.deptName, editDeptData.employeeId);
    setEditDeptData({ id: id, employeeId: "", deptName: "" });
    navigate('/manageDepartment');
  };

  const handleChange = (e) => {
    setEditDeptData({ ...editDeptData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "rgb(0 77 255 / 65%)" }}>
        <div className="container mt-5">
          <NavLink className="navbar-brand" style={{ fontSize: "25px", color: "white", letterSpacing: ".05125em" }} to="/dashboard">
            Dept.
          </NavLink>

          <div className="mt-2 pt-2">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <NavLink to="/dashboard" className="text-dark fw-semibold text-decoration-none">
                    Home
                  </NavLink>
                </li>
                <li className="breadcrumb-item active fw-semibold text-decoration-underline" aria-current="page">
                  Edit
                </li>
                <li className="breadcrumb-item">
                  <NavLink to="/manageDepartment" className="text-dark fw-semibold text-decoration-none">
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
        <div className="row d-flex justify-content-evenly" style={boxStyle}>
          <h5 style={{ fontSize: "20px" }} className="px-2">
            Edit Department
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
                  value={editDeptData.employeeId}
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
                  value={editDeptData.deptName}
                  style={{ border: "1px solid" }}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="">
                <button
                  type="button"
                  className="btn btn-outline-danger float-end mx-1"
                  onClick={() => navigate('/manageDepartment')}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-success float-end mx-1"
                >
                  update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditDepartment;
