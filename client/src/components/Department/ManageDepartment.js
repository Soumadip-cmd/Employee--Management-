import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import DataContext from "../../context/DataContext";
import Loading from "../Loading/Loading"; // Import your Loading component

const ManageDepartment = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state
  const { getDept, dept, deleteDept } = useContext(DataContext);

  let history = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('authToken')) {
      history('/');
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getDept().then(() => setLoading(false)); // Set loading to false after data is fetched
    // eslint-disable-next-line
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const delDept = (id) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      deleteDept(id);
    }
  };

  const EditDept = (id) => {
    history(`/editDepartment/${id}`);
  };

  // Filter departments based on the search input
  const filteredDept = dept.filter((item) =>
    item.deptName.toLowerCase().includes(search.toLowerCase())
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
                  Manage
                </li>
                <li className="breadcrumb-item">
                  <NavLink
                    to="/addDepartment"
                    className="text-dark fw-semibold text-decoration-none"
                  >
                    Add Dept.
                  </NavLink>
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </nav>

      <div className="pt-4 extra-special3 text-dark">
        <h1 className="fs-2 mb-4">Manage Department</h1>

        <div
          className="bg-white text-dark p-4 rounded-top rounded-bottom-1 shadow"
          style={{ borderTop: "5px solid #004dffe8" }}
        >
          <h2 className="fs-4 fw-semibold mb-4 border-bottom pb-2">
            View Department
          </h2>
          <div className="d-flex gap-4 justify-content-between align-items-center mb-4">
            <div className="d-flex align-items-center gap-2">
              <label htmlFor="entries" className="fs-6">
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

          {/* Show loading spinner inside the box, only for the table */}
          {loading ? (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "200px" }}>
              <Loading height="auto"/> {/* Centered Loading spinner */}
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-striped table-bordered tablestyle">
                  <thead>
                    <tr>
                      <th className="py-2 px-4">#</th>
                      <th className="py-2 px-4">Department Name</th>
                      <th className="py-2 px-4">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredDept.length === 0 ? (
                      <tr>
                        <td colSpan="3" className="text-center">
                          <p>No department is added.. Please add Your required Department..</p>
                        </td>
                      </tr>
                    ) : (
                      filteredDept.map((item, index) => (
                        <tr key={item._id}>
                          <td className="py-2 px-4">{index + 1}</td>
                          <td className="py-2 px-4">{item.deptName}</td>
                          <td className="py-2 px-4">
                            <span
                              className="badge text-bg-success mx-1 px-2"
                              style={{ cursor: "pointer" }}
                              onClick={() => EditDept(item._id)}
                            >
                              Edit
                            </span>
                            <span
                              className="badge text-bg-danger mx-1 px-2"
                              style={{ cursor: "pointer" }}
                              onClick={() => delDept(item._id)}
                            >
                              Delete
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <div className="d-flex justify-content-between align-items-center mt-4">
                <span className="fs-6">
                  Showing 1 to {filteredDept.length} of {dept.length} entries
                </span>
                <div className="d-flex gap-1">
                  <button className="btn btn-primary btn-sm">&lt;</button>
                  <button className="btn btn-primary btn-sm">1</button>
                  <button className="btn btn-primary btn-sm">&gt;</button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ManageDepartment;
