import React, { useContext, useEffect, useState } from "react";
import "../Leave/ApplyLeave.css";
import { NavLink, useNavigate } from "react-router-dom";
import DataContext from "../../context/DataContext";
import Img from "../Admin/Img";
import Loading from "../Loading/Loading"; // Make sure you have this component

export default function ManageStaff() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state
  const { getStaff, staff, deleteStaff } = useContext(DataContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStaff = async () => {
      await getStaff();
      setLoading(false); // Set loading to false after fetching
    };

    fetchStaff();

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    // Filter staff logic here
  };

  const delStaff = (id) => {
    deleteStaff(id);
  };

  const editSTAFF = (id) => {
    navigate(`/editStaff/${id}`);
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
            to="/dashboard"
          >
            Staff
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
                    to="/addStaff"
                    className="text-dark fw-semibold text-decoration-none"
                  >
                    Add Staff
                  </NavLink>
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </nav>
      <div className="pt-3 extra-special3 text-dark">
        <h1 className="fs-2 mb-4">Staff Management</h1>
        <div
          className="bg-white text-dark p-3 py-4 rounded-top rounded-bottom-1 shadow"
          style={{ borderTop: "5px solid #004dffe8" }}
        >
          <h2 className="fs-4 fw-semibold mb-4 border-bottom pb-2">
            View Staff
          </h2>
          <div className="d-flex justify-content-between align-items-center gap-4 mb-4">
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
          
          {loading ? (
            <Loading height="auto" /> // Show loading indicator
          ) : (
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
                {staff.length > 0 ? (
                  staff.map((item, index) => (
                    <tbody key={index}>
                      <tr>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td className="text-center">
                          <Img
                            upload_id={item.photo.public_id}
                            classN="rounded-2"
                            width="130px"
                          />
                        </td>
                        <td>{item.department}</td>
                        <td>{item.gender}</td>
                        <td>{item.phone}</td>
                        <td>{item.email}</td>
                        <td>{item.dob}</td>
                        <td>{item.date_of_join}</td>
                        <td>{item.address}</td>
                        <td>{item.city}</td>
                        <td>{item.state}</td>
                        <td>{item.country}</td>
                        <td>{new Date(item.created_at).toLocaleDateString()}</td>
                        <td className="py-2 px-4">
                          <span
                            className="badge text-bg-success mx-1 px-2"
                            onClick={() => editSTAFF(item._id)}
                            style={{ cursor: "pointer" }}
                          >
                            Edit
                          </span>
                          <span
                            className="badge text-bg-danger mx-1 px-2"
                            onClick={() => delStaff(item._id)}
                            style={{ cursor: "pointer" }}
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
                      <td colSpan="15" className="text-center py-3">
                        You Don't add any Staff..!
                      </td>
                    </tr>
                  </tbody>
                )}
              </table>
            </div>
          )}

          <div className="d-flex justify-content-between align-items-center mt-4">
            <span className="fs-6">
              Showing 1 to {staff.length} of {staff.length} entries
            </span>
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
