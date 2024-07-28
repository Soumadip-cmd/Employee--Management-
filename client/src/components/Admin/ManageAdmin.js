import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import DataContext from "../../context/DataContext";

const ManageAdmin = () => {
  const [search, setSearch] = useState("");
  const { getAdmin, admin } = useContext(DataContext);

  useEffect(() => {
    getAdmin();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    // Filter department logic here
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
            Admin
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
                    to="/addAdmin"
                    className=" text-dark fw-semibold text-decoration-none"
                  >
                    AddAdmin
                  </NavLink>
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </nav>
      <div className=" pt-4  extra-special3  text-dark ">
        <h1 className="fs-2 mb-4">Manage Admin</h1>

        <div
          className="bg-white    text-dark p-4  rounded-top rounded-bottom-1 shadow"
          style={{ borderTop: "5px solid #004dffe8" }}
        >
          <h2 className="fs-4 fw-semibold mb-4 border-bottom pb-2">
            View Admin
          </h2>
          <div className="d-flex justify-content-between align-items-center gap-4 mb-4">
            <div className="d-flex align-items-center gap-2">
              <label htmlFor="entries" className=" fs-6">
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
                className=" form-control d-none d-md-flex"
                value={search}
                onChange={handleSearch}
              />
              <button className="btn btn-danger btn-sm d-none d-md-flex">
                Search
              </button>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table table-striped table-bordered tablestyle">
              <thead className="">
                <tr>
                  <th className="py-2 px-4 ">#</th>
                  <th className="py-2 px-4 ">Admin Name</th>
                  <th className="py-2 px-4 ">Admin Photo</th>
                  <th className="py-2 px-4 ">Admin Email</th>
                  <th className="py-2 px-4 ">Actions</th>
                </tr>
              </thead>
              {admin.map((item, index) => (
                <tbody className="" key={index}>
                  <tr>
                    <td className="py-2 px-4 ">{index + 1}</td>
                    <td className="py-2 px-4 ">{item.name}</td>
                    <td className="text-center">
                      <img
                        className=" rounded-2 "
                        src={item.photo.url}
                        alt="img-Profile"
                      />
                    </td>
                    <td className="py-2 px-4 ">{item.email}</td>
                    <td className="py-2 px-4 ">
                      <span className="badge text-bg-success mx-1 px-2">
                        Edit
                      </span>
                      <span className="badge text-bg-danger mx-1 px-2">
                        Delete
                      </span>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-4">
            <span className="fs-6">Showing 1 to 2 of 2 entries</span>
            <div className="d-flex gap-1">
              <button className="btn btn-primary btn-sm">&lt;</button>
              <button className="btn btn-primary btn-sm">1</button>
              <button className="btn btn-primary btn-sm">&gt;</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageAdmin;
