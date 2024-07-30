import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import DataContext from "../../context/DataContext";

const EditAdmin = () => {
  const { id } = useParams();
  const { editAdmin, admin } = useContext(DataContext);
  const [edit_admin, setEdit_admin] = useState({ id: id, name: "", email: "" });

  const navigate = useNavigate();

  useEffect(() => {
    const adminData = admin.find((data) => data._id === id);
    if (adminData) {
      setEdit_admin({
        id: adminData._id,
        name: adminData.name,
        email: adminData.email,
      });
    }
  }, [id, admin]);

  const handleChange = (e) => {
    setEdit_admin({ ...edit_admin, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    editAdmin(edit_admin.id, edit_admin.name, edit_admin.email);
    setEdit_admin({ id: id, name: "", email: "" });
    navigate("/manageAdmin");
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
                  Add
                </li>
                <li className="breadcrumb-item">
                  <NavLink
                    to="/manageAdmin"
                    className="text-dark fw-semibold text-decoration-none"
                  >
                    ManageAdmin
                  </NavLink>
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </nav>
      <div className="container my-2 pt-3">
        <h2>Admin Management</h2>
      </div>
      <div className="mb-4 pt-3 extra-special">
        <div
          className="row d-flex justify-content-evenly"
          style={{
            background: "white",
            padding: "21px",
            borderTop: "5px solid #004dffe8",
            borderRadius: "5px",
          }}
        >
          <h5 style={{ fontSize: "20px" }} className="px-2">
            Edit Admin
          </h5>
          <hr />
          <form onSubmit={handleSubmit}>
            <div className="col-12">
              <div className="mb-3">
                <b>Admin Name</b>
                <span style={{ color: "red" }}>*</span>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={edit_admin.name}
                  onChange={handleChange}
                  style={{ border: "1px solid" }}
                />
              </div>

              <div className="mb-3">
                <b>Admin Email </b>
                <span style={{ color: "red" }}>*</span>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={edit_admin.email}
                  onChange={handleChange}
                  style={{ border: "1px solid" }}
                />
              </div>
              <div>
                <button
                  type="button"
                  className="btn btn-outline-danger float-end mx-1"
                  id="cancel"
                  onClick={() => navigate("/manageAdmin")}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-success float-end mx-1"
                  id="submit"
                >
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditAdmin;
