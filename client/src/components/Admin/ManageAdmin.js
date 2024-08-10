import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import DataContext from "../../context/DataContext";
import Img from "./Img";
import Loading from "../Loading/Loading";

const ManageAdmin = () => {
  const [search, setSearch] = useState("");
  const { getAdmin, admin, deleteAdmin } = useContext(DataContext);
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdmins = async () => {
      await getAdmin();
      setLoading(false);
    };
    fetchAdmins();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      navigate("/");
    }
  }, [navigate]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const delAdmin = (id) => {
    if (window.confirm("Are you sure you want to delete this admin?")) {
      deleteAdmin(id);
    }
  };

  const editAdmin = (id) => {
    navigate(`/editAdmin/${id}`);
  };

  const filteredAdmins = admin.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
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
            Admin
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
                    to="/addAdmin"
                    className="text-dark fw-semibold text-decoration-none"
                  >
                    Add Admin
                  </NavLink>
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </nav>
      <div className="pt-4 extra-special3 text-dark">
        <h1 className="fs-2 mb-4">Manage Admin</h1>

        <div
          className="bg-white text-dark p-4 rounded-top rounded-bottom-1 shadow"
          style={{ borderTop: "5px solid #004dffe8" }}
        >
          <h2 className="fs-4 fw-semibold mb-4 border-bottom pb-2">
            View Admin
          </h2>
          <div className="d-flex justify-content-between align-items-center gap-4 mb-4">
            <div className="d-flex align-items-center gap-2">
              <label htmlFor="entries" className="fs-6">
                Show
              </label>
              <select
                id="entries"
                className="border-1 border-black rounded-2"
                onChange={(e) => {}}
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
            <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
              <Loading />
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-bordered tablestyle">
                <thead>
                  <tr>
                    <th className="py-2 px-4">#</th>
                    <th className="py-2 px-4">Admin Name</th>
                    <th className="py-2 px-4">Admin Photo</th>
                    <th className="py-2 px-4">Admin Email</th>
                    <th className="py-2 px-4">Actions</th>
                  </tr>
                </thead>
                {filteredAdmins.length > 0 ? (
                  <tbody>
                    {filteredAdmins.map((item, index) => (
                      <tr key={item._id}>
                        <td className="py-2 px-4">{index + 1}</td>
                        <td className="py-2 px-4">{item.name}</td>
                        <td className="text-center">
                          <Img
                            upload_id={item.avatar.public_id}
                            classN="rounded-2"
                            width="130px"
                          />
                        </td>
                        <td className="py-2 px-4">{item.email}</td>
                        <td className="py-2 px-4">
                          <span
                            className="badge text-bg-success mx-1 px-2"
                            onClick={() => editAdmin(item._id)}
                            style={{ cursor: "pointer" }}
                          >
                            Edit
                          </span>
                          <span
                            className="badge text-bg-danger mx-1 px-2"
                            onClick={() => delAdmin(item._id)}
                            style={{ cursor: "pointer" }}
                          >
                            Delete
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                ) : (
                  <tbody>
                    <tr>
                      <td colSpan="5" className="text-center">
                        No Admins added yet!
                      </td>
                    </tr>
                  </tbody>
                )}
              </table>
            </div>
          )}
          <div className="d-flex justify-content-between align-items-center mt-4">
            <span className="fs-6">
              Showing 1 to {filteredAdmins.length} of {filteredAdmins.length} entries
            </span>
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
