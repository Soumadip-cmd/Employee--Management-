import React, { useState } from "react";
import "./ApplyLeave.css";
import { NavLink, useNavigate } from "react-router-dom";

export default function ApplyLeave() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    reason: "",
    start: "",
    end: "",
    description: "",
    document: null
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "leave_docx") {
      setFormData({ ...formData, document: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8800/add-leave', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({
          reason: formData.reason,
          start: formData.start,
          end: formData.end,
          description: formData.description
        })
      });

      const data = await response.json();
      if (data.success) {
        alert('Leave application submitted successfully!');
        navigate('/leaveHistory');
      } else {
        alert(data.errors || 'Failed to submit leave application');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while submitting the leave application');
    }
    setLoading(false);
  };


  let boxstyle = {
    background: "white",
    padding: "21px",
    borderTop: "5px solid #004dffe8",
    borderRadius: "5px",
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "rgb(0 77 255 / 65%)" }}>
        <div className="container mt-5">
          <NavLink className="navbar-brand" style={{ fontSize: "25px", color: "white", letterSpacing: ".05125em" }} to="/applyLeave">
            Leave
          </NavLink>
          <div className="mt-2 pt-2">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <NavLink to="/applyLeave" className="text-dark fw-semibold text-decoration-none">Home</NavLink>
                </li>
                <li className="breadcrumb-item active fw-semibold text-decoration-underline" aria-current="page">
                  Leave
                </li>
                <li className="breadcrumb-item">
                  <NavLink to="/leaveHistory" className="text-dark fw-semibold text-decoration-none">LeaveHistory</NavLink>
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </nav>
      <div className="container my-2 pt-3">
        <h2>Leave Management</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 pt-3 extra-special">
          <div className="row d-flex justify-content-evenly" style={boxstyle}>
            <h5 style={{ fontSize: "20px" }} className="px-2">
              Apply Leave
            </h5>
            <hr />
            <div className="col-sm-12 col-md-6 col-lg-6">
              <div className="mb-3">
                <b>Reason</b>
                <span style={{ color: "red" }}>*</span>
                <input
                  type="text"
                  className="form-control"
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  placeholder="Reason"
                  style={{ border: "1px solid" }}
                  required
                />
              </div>
              <div className="mb-3">
                <b>Leave From</b>
                <span style={{ color: "red" }}>*</span>
                <input
                  type="date"
                  className="form-control"
                  name="start"
                  value={formData.start}
                  onChange={handleInputChange}
                  style={{ border: "1px solid" }}
                  required
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6">
              <div className="mb-3">
                <b>Leave To</b>
                <span style={{ color: "red" }}>*</span>
                <input
                  type="date"
                  className="form-control"
                  name="end"
                  value={formData.end}
                  onChange={handleInputChange}
                  style={{ border: "1px solid" }}
                  required
                />
              </div>
              <div className="mb-3">
                <b>Description(Brief)</b>
                <span style={{ color: "red" }}>*</span>
                <textarea
                  className="form-control"
                  placeholder="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  style={{ border: "1px solid" }}
                  required
                />
              </div>
              <div className="mb-3">
                <b>Upload Supporting Documents (Optional, Except for Urgent Cases)</b>
                <input
                  type="file"
                  className="form-control"
                  name="leave_docx"
                  onChange={handleInputChange}
                  accept="application/pdf,image/png"
                  style={{ border: "1px solid" }}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary float-end"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}