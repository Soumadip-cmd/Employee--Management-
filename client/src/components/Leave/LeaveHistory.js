import React, { useState, useEffect } from "react";
import "./ApplyLeave.css";
import { NavLink, useNavigate } from "react-router-dom";

export default function LeaveHistory() {
  const [leaves, setLeaves] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [entries, setEntries] = useState(5);
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
      const response = await fetch('http://localhost:8800/get-leaves', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      const data = await response.json();
      setLeaves(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching leaves:', error);
      setLeaves([]);
    }
    setLoading(false);
  };

  // Add the getStatusBadgeClass function
  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return 'bg-success';
      case 'rejected':
        return 'bg-danger';
      case 'pending':
        return 'bg-warning';
      default:
        return 'bg-warning'; // Default to warning for unknown status
    }
  };

  const filteredLeaves = Array.isArray(leaves) 
    ? leaves.filter(leave =>
        leave?.reason?.toLowerCase().includes(search.toLowerCase()) ||
        leave?.description?.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB');
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "rgb(0 77 255 / 65%)" }}>
        <div className="container mt-5">
          <NavLink className="navbar-brand" style={{ fontSize: "25px", color: "white", letterSpacing: ".05125em" }} to="/leaveHistory">
            Leave
          </NavLink>
          <div className="mt-2 pt-2">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <NavLink to="/leaveHistory" className="text-dark fw-semibold text-decoration-none">Home</NavLink>
                </li>
                <li className="breadcrumb-item active fw-semibold text-decoration-underline" aria-current="page">
                  History
                </li>
                <li className="breadcrumb-item">
                  <NavLink to="/applyLeave" className="text-dark fw-semibold text-decoration-none">ApplyLeave</NavLink>
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </nav>
      <div className="pt-3 extra-special3 text-dark">
        <h1 className="fs-2 mb-4">Leave Management</h1>
        <div className="bg-white text-dark p-3 py-4 rounded-top rounded-bottom-1 shadow" style={{borderTop:'5px solid #004dffe8'}}>
          <h2 className="fs-4 fw-semibold mb-4 border-bottom pb-2">View Leave</h2>
          <div className="d-flex justify-content-between align-items-center gap-4 mb-4">
            <div className="d-flex align-items-center gap-2">
              <label htmlFor="entries" className="fs-6">Show</label>
              <select
                id="entries"
                className="border-1 border-black rounded-2"
                value={entries}
                onChange={(e) => setEntries(Number(e.target.value))}
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
                className="form-control"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="table-responsive">
            <table className="table table-bordered tablestyle table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Reason</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Status</th>
                  <th>Description</th>
                  <th>Applied On</th>
                  <th>Review Comments</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="8" className="text-center">Loading...</td>
                  </tr>
                ) : filteredLeaves.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center">No leaves found</td>
                  </tr>
                ) : (
                  filteredLeaves.slice(0, entries).map((leave, index) => (
                    <tr key={leave._id || index}>
                      <td>{index + 1}</td>
                      <td>{leave.reason}</td>
                      <td>{formatDate(leave.start)}</td>
                      <td>{formatDate(leave.end)}</td>
                      <td>
                        <span className={`badge ${getStatusBadgeClass(leave.status)} text-white`}>
                          {leave.status ? leave.status.charAt(0).toUpperCase() + leave.status.slice(1) : 'Pending'}
                        </span>
                      </td>
                      <td>{leave.description}</td>
                      <td>{formatDate(leave.created_at)}</td>
                      <td>{leave.reviewComments || '-'}</td>
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
          </div>
        </div>
      </div>
    </>
  );
}