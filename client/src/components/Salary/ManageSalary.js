import React, { useContext, useEffect, useState } from "react";
import "./managesalary.css";
import { NavLink, useNavigate } from "react-router-dom";
import DataContext from "../../context/DataContext";

export default function ManageSalary() {
  const [search, setSearch] = useState("");
  const { getSal, salary, deleteSal } = useContext(DataContext);
  const navigate=useNavigate()

  useEffect(() => {
    getSal();
    // eslint-disable-next-line
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    // Filter department logic here
  };

  const delSalary = (id) => {
    deleteSal(id);
  };

  const edSalary=(id)=>{
    navigate(`/editSalary/${id}`)
  }

  const filteredSalary = salary.filter(
    (item) =>
      item.StaffName.toLowerCase().includes(search.toLowerCase()) ||
      item.department.toLowerCase().includes(search.toLowerCase())
  );

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
            Salary
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
                  Manage
                </li>
                <li className="breadcrumb-item">
                  <NavLink
                    to="/addsalary"
                    className="text-dark fw-semibold text-decoration-none"
                  >
                    Add Salary
                  </NavLink>
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </nav>
      <div className="p-6 text-dark">
        <div className="container max-w-4xl mx-auto text-dark rounded-lg shadow-md">
          <div className="py-4 border-bottom">
            <h1 className="h3 mb-0">Salary Management</h1>
          </div>
          <div
            className="p-4 bg-white rounded-top rounded-bottom-1 shadow"
            style={{ borderTop: "5px solid #004dffe8" }}
          >
            <h2 className="h4 mb-4">View Salary</h2>
            <div className="d-flex justify-content-between align-items-center gap-4 mb-4">
              <div className="d-flex align-items-center gap-2">
                <label htmlFor="entries" className="form-label fs-6">
                  Show
                </label>
                <select
                  id="entries"
                  className="border-1 border-black rounded-2"
                  onChange={(e) => {
                    // Handle entries change
                  }}
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                </select>
                <span className="fs-6">entries</span>
              </div>

              <div className="d-flex align-items-center gap-2">
                <input
                  type="text"
                  placeholder="Search..."
                  className="form-control d-block d-md-none"
                  value={search}
                  onChange={handleSearch}
                />
                <input
                  type="text"
                  placeholder="Search"
                  className="form-control d-none d-md-flex"
                  value={search}
                  onChange={handleSearch}
                />
                <button className="btn btn-danger btn-sm d-none d-md-flex">
                  Search
                </button>
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
                    <th>Action</th>
                  </tr>
                </thead>
                {filteredSalary.length > 0 ? (
                  filteredSalary.map((item, index) => (
                <tbody>
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.StaffName}</td>
                      <td>{item.department}</td>
                      <td>{item.Paid_Salary}</td>
                      <td className="py-2 px-4">
                        <span
                          className="badge text-bg-success mx-1 px-2"
                          style={{ cursor: "pointer" }}
                          onClick={() => edSalary(item._id)}
                        >
                          Edit
                        </span>
                        <span
                          className="badge text-bg-danger mx-1 px-2"
                          style={{ cursor: "pointer" }}
                          onClick={() => delSalary(item._id)}
                        >
                          Delete
                        </span>
                      </td>
                    </tr>
                  
                </tbody>
              ))
            ) : (
                <tbody>
                  <tr>
                    <td colSpan="5" className="text-center py-2">
                      You Don't add any Staff's Paid Salary...
                    </td>
                  </tr>
                </tbody>
              )}
              </table>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-4">
              <span className="fs-6">
                Showing 1 to {filteredSalary.length} of {salary.length} entries
              </span>
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
  );
}
