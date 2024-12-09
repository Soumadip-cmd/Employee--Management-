import React, { useContext, useEffect, useState } from "react";
import Card from "./Card";
import "./Dashboard.css";
import DataContext from "../../context/DataContext";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";

const EmployeeDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [leaveCount, setLeaveCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('staff-token')) {
      navigate('/');
      return;
    }

    const fetchLeaves = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/staff/leaves`, {
          headers: {
            'staff-token': localStorage.getItem('staff-token')
          }
        });
        const data = await response.json();
        setLeaveCount(Array.isArray(data) ? data.length : 0);
      } catch (error) {
        console.error('Error fetching leaves:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaves();
  }, [navigate]);

  if (loading) {
    return <Loading height="100vh" />;
  }

  return (
    <div className="special mt-5 ms-2">
      <div className="container p-3">
        <span style={{ fontSize: "2em", fontWeight: "600" }}>Dashboard </span>
        <span style={{ fontSize: "1em" }}> Control panel</span>
      </div>
      <hr style={{ position: "relative", bottom: "29px" }} />
      <div className="container my-2">
        <div className="row" style={{ transform: "translateY(-19px)" }}>
          <div className="col-sm-12 col-md-6 col-lg-6">
            <Card
              number={leaveCount}
              category="Leave Requests"
              cardbgcolor="#c70d0d"
              pageLink="/leaveHistory"
            />
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6">
            <Card
              number="2"
              category="Salary Paid"
              cardbgcolor="green"
              pageLink="/employee/salary"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;