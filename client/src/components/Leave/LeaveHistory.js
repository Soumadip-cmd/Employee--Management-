import React, { useState, useEffect } from "react";
import "./ApplyLeave.css";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";

export default function LeaveHistory() {
  const [search, setSearch] = useState("");
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/staff/leaves`,
        {
          headers: {
            "staff-token": localStorage.getItem("staff-token"),
          },
        }
      );
      const data = await response.json();
      if (Array.isArray(data)) {
        setLeaves(data);
      } else {
        toast.error("Failed to fetch leave data");
      }
    } catch (error) {
      console.error("Error fetching leaves:", error);
      toast.error("Error loading leave history");
    } finally {
      setLoading(false);
    }
  };

  // Filter leaves based on search
  const filteredLeaves = leaves.filter(
    (leave) =>
      leave.reason.toLowerCase().includes(search.toLowerCase()) ||
      leave.description.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentLeaves = filteredLeaves.slice(
    indexOfFirstEntry,
    indexOfLastEntry
  );
  const totalPages = Math.ceil(filteredLeaves.length / entriesPerPage);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB");
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "approved":
        return "text-bg-success";
      case "rejected":
        return "text-bg-danger";
      default:
        return "text-bg-warning";
    }
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
                  <NavLink
                    to="/employee/dashboard"
                    className="text-dark fw-semibold text-decoration-none"
                  >
                    Home
                  </NavLink>
                </li>
                <li
                  className="breadcrumb-item active fw-semibold text-decoration-underline"
                  aria-current="page"
                >
                  History
                </li>
                <li className="breadcrumb-item">
                  <NavLink
                    to="/applyLeave"
                    className="text-dark fw-semibold text-decoration-none"
                  >
                    ApplyLeave
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
            View Leave
          </h2>
          <div className="d-flex justify-content-between align-items-center gap-4 mb-4">
            <div className="d-flex align-items-center gap-2">
              <label htmlFor="entries" className="fs-6">
                Show
              </label>
              <select
                id="entries"
                className="border-1 border-black rounded-2"
                value={entriesPerPage}
                onChange={(e) => setEntriesPerPage(Number(e.target.value))}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
              </select>
              <span className="fs-6">entries</span>
            </div>

            <div className="d-flex align-items-center gap-2">
              <input
                type="text"
                placeholder="Search..."
                className="form-control d-block d-md-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <input
                type="text"
                placeholder="Search"
                className="form-control d-none d-md-flex"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="btn btn-danger btn-sm d-none d-md-flex">
                Search
              </button>
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
                  <th>Action</th> {/* New column */}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="8" className="text-center">
                      Loading...
                    </td>
                  </tr>
                ) : currentLeaves.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center">
                      No leaves found
                    </td>
                  </tr>
                ) : (
                  currentLeaves.map((leave, index) => (
                    <tr key={leave._id}>
                      <td>{indexOfFirstEntry + index + 1}</td>
                      <td>{leave.reason}</td>
                      <td>{formatDate(leave.start)}</td>
                      <td>{formatDate(leave.end)}</td>
                      <td>
                        <span
                          className={`badge ${getStatusBadgeColor(
                            leave.status
                          )}`}
                        >
                          {leave.status.charAt(0).toUpperCase() +
                            leave.status.slice(1)}
                        </span>
                      </td>
                      <td>{leave.description}</td>
                      <td>{formatDate(leave.created_at)}</td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          disabled={leave.status !== "pending"}
                          onClick={async () => {
                            try {
                              const response = await fetch(
                                `http://localhost:8800/staff/delleave/${leave._id}`,
                                {
                                  method: "DELETE",
                                  headers: {
                                    "staff-token":
                                      localStorage.getItem("staff-token"),
                                  },
                                }
                              );
                              const data = await response.json();
                              if (data.success) {
                                toast.success(
                                  "Leave request deleted successfully"
                                );
                                fetchLeaves();
                              } else {
                                toast.error(
                                  data.msg || "Failed to delete leave request"
                                );
                              }
                            } catch (error) {
                              toast.error("Error deleting leave request");
                            }
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-4">
            <span className="fs-6">
              Showing {indexOfFirstEntry + 1} to{" "}
              {Math.min(indexOfLastEntry, filteredLeaves.length)} of{" "}
              {filteredLeaves.length} entries
            </span>
            <div className="d-flex gap-2">
              <button
                className="btn btn-primary btn-sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                &lt;
              </button>
              <button className="btn btn-primary btn-sm">{currentPage}</button>
              <button
                className="btn btn-primary btn-sm"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
