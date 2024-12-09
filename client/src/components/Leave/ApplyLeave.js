import React, { useState, useEffect } from "react";
import "./ApplyLeave.css";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function ApplyLeave() {
  const [staffData, setStaffData] = useState(null);
  const [leaveData, setLeaveData] = useState({
    reason: "",
    start: "",
    end: "",
    description: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/get-staff`, {
          headers: {
            'staff-token': localStorage.getItem('staff-token')
          }
        });
        const data = await response.json();
        if (data.success) {
          setStaffData(data.staff);
        }
      } catch (error) {
        console.error('Error fetching staff data:', error);
      }
    };
    fetchStaffData();
  }, []);

  const handleChange = (e) => {
    setLeaveData({
      ...leaveData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/staff/addleave`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'staff-token': localStorage.getItem('staff-token')
        },
        body: JSON.stringify({
          reason: leaveData.reason,
          start: leaveData.start,
          end: leaveData.end,
          description: leaveData.description
        })
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Leave request submitted successfully');
        navigate('/leaveHistory');
      } else {
        toast.error(data.msg || 'Failed to submit leave request');
      }
    } catch (error) {
      console.error('Error submitting leave:', error);
      toast.error('Error submitting leave request');
    } finally {
      setIsSubmitting(false);
    }
  };

  let boxstyle = {
    background: "white",
    padding: "21px",
    borderTop: "5px solid #004dffe8",
    borderRadius: "5px",
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
            to="/employee/dashboard"
          >
            Leave
          </NavLink>

          <div className="mt-2 pt-2">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <NavLink to="/employee/dashboard" className="text-dark fw-semibold text-decoration-none">Home</NavLink>
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
                  value={leaveData.reason}
                  onChange={handleChange}
                  placeholder="Reason"
                  required
                  style={{ border: "1px solid" }}
                />
              </div>
              <div className="mb-3">
                <b>Leave From</b>
                <span style={{ color: "red" }}>*</span>
                <input
                  type="date"
                  className="form-control"
                  name="start"
                  value={leaveData.start}
                  onChange={handleChange}
                  required
                  style={{ border: "1px solid" }}
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
                  value={leaveData.end}
                  onChange={handleChange}
                  required
                  style={{ border: "1px solid" }}
                />
              </div>
              <div className="mb-3">
                <b>Description(Brief)</b>
                <span style={{ color: "red" }}>*</span>
                <textarea
                  className="form-control"
                  placeholder="Description"
                  name="description"
                  value={leaveData.description}
                  onChange={handleChange}
                  required
                  style={{ border: "1px solid" }}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary float-end"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}