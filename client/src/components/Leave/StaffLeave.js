import React, { useEffect, useState } from "react";
import "./ApplyLeave.css";
import { NavLink, useNavigate } from "react-router-dom";

export default function StaffLeave() {
  const [leaves, setLeaves] = useState([]);
  const [entries, setEntries] = useState(5);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('authToken')) {
      navigate('/');
      return;
    }
    fetchLeaves();
  }, [navigate]);

  const fetchLeaves = async () => {
    try {
      const response = await fetch('http://localhost:8800/leaves', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      const data = await response.json();
      setLeaves(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching leaves:', error);
      setLeaves([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (leaveId, status) => {
    try {
      const response = await fetch(`http://localhost:8800/leaves/${leaveId}/review`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({
          status,
          comments: status === 'rejected' ? 'Leave request rejected' : 'Leave approved'
        })
      });
      if (response.ok) {
        fetchLeaves();
        alert(`Leave ${status} successfully`);
      } else {
        alert('Failed to update leave status');
      }
    } catch (error) {
      console.error('Error updating leave status:', error);
      alert('Error updating leave status');
    }
  };

  const filteredLeaves = Array.isArray(leaves) 
    ? leaves.filter(leave =>
        leave?.userId?.name?.toLowerCase().includes(search.toLowerCase()) ||
        leave?.reason?.toLowerCase().includes(search.toLowerCase())
      )
    : [];


  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB');
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "rgb(0 77 255 / 65%)" }}>
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
            Leave
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
                  Staff's Leave
                </li>
                <li className="breadcrumb-item">
                  <NavLink
                    to="/leaveHistory"
                    className="text-dark fw-semibold text-decoration-none"
                  >
                    History
                  </NavLink>
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </nav>
      <div className="pt-3 extra-special3 text-dark">
        <h1 className="fs-2 mb-4">Leave Management</h1>
        <div
          className="bg-white text-dark p-3 py-4 rounded-top rounded-bottom-1 shadow"
          style={{ borderTop: "5px solid #004dffe8" }}
        >
          <h2 className="fs-4 fw-semibold mb-4 border-bottom pb-2">
            Staff's Leave
          </h2>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="d-flex align-items-center gap-2">
              <label htmlFor="entries" className="fs-6">
                Show
              </label>
              <select
                id="entries"
                className="form-select border-1 border-black form-select-sm"
                value={entries}
                onChange={(e) => setEntries(parseInt(e.target.value))}
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
                placeholder="Search"
                className="form-control d-none d-md-flex"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="btn btn-danger btn-sm">Search</button>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table table-bordered tablestyle table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Photo</th>
                  <th>Reason</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Description</th>
                  <th>Applied On</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="10" className="text-center">Loading...</td>
                  </tr>
                ) : filteredLeaves.length === 0 ? (
                  <tr>
                    <td colSpan="10" className="text-center">No leaves found</td>
                  </tr>
                ) : (
                  filteredLeaves.slice(0, entries).map((leave, index) => (
                    <tr key={leave._id || index}>
                      <td>{index + 1}</td>
                      <td>{leave.userId?.name || 'N/A'}</td>
                      <td className="text-center">
                        <img 
                          className="rounded-2" 
                          src={leave.userId?.photo || "https://placehold.co/64x64"} 
                          alt="Profile" 
                          width="64" 
                          height="64"
                        />
                      </td>
                      <td>{leave.reason}</td>
                      <td>{formatDate(leave.start)}</td>
                      <td>{formatDate(leave.end)}</td>
                      <td>{leave.description}</td>
                      <td>{formatDate(leave.created_at)}</td>
                      <td>
                        <span className={`badge ${
                          leave.status === 'approved' ? 'bg-success' : 
                          leave.status === 'rejected' ? 'bg-danger' : 
                          'bg-warning'
                        } text-white`}>
                          {leave.status?.charAt(0).toUpperCase() + leave.status?.slice(1) || 'Pending'}
                        </span>
                      </td>
                      <td>
                        {(!leave.status || leave.status === 'pending') && (
                          <>
                            <span
                              className="badge bg-success text-white mx-1"
                              style={{ cursor: "pointer" }}
                              onClick={() => handleStatusUpdate(leave._id, 'approved')}
                            >
                              Approve
                            </span>
                            <span
                              className="badge bg-danger text-white mx-1"
                              style={{ cursor: "pointer" }}
                              onClick={() => handleStatusUpdate(leave._id, 'rejected')}
                            >
                              Reject
                            </span>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-4">
            <span className="fs-6">
              Showing 1 to {Math.min(entries, filteredLeaves.length)} of {filteredLeaves.length} entries
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