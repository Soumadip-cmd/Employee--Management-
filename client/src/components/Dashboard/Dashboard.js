import React, { useContext, useEffect, useState } from "react";
import Card from "./Card";
import './Dashboard.css';
import DataContext from "../../context/DataContext";
import { useNavigate } from "react-router-dom";
import Loading from '../Loading/Loading';

const Dashboard = () => {
  const { getDept, getStaff, getSal, dept, staff, salary } = useContext(DataContext);
  const [loading, setLoading] = useState(true);
  const [leaveCount, setLeaveCount] = useState(0);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getDept();
        await getSal();
        await getStaff();
        
        // Fetch leave requests count

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/admin/leaves`, {
          headers: {
            'token': localStorage.getItem('authToken')
          }
        });
        const data = await response.json();
        setLeaveCount(Array.isArray(data) ? data.length : 0);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!(localStorage.getItem('authToken'))) {
      navigate('/');
    }
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
          <div className="col-sm-12 col-md-6 col-lg-3">
            <Card
              number={dept?.length ?? 0}
              category="Department"
              cardbgcolor="blue"
              pageLink="/manageDepartment"
            />
          </div>
          <div className="col-sm-12 col-md-6 col-lg-3">
            <Card
              number={staff?.length ?? 0}
              category="Staff"
              cardbgcolor="rgb(88 13 51)"
              pageLink="/manageStaff"
            />
          </div>
          <div className="col-sm-12 col-md-6 col-lg-3">
            <Card
              number={leaveCount}
              category="Leave Requests"
              cardbgcolor="#c70d0d"
              pageLink="/Staffleave"
            />
          </div>
          <div className="col-sm-12 col-md-6 col-lg-3">
            <Card
              number={salary?.length ?? 0}
              category="Salary Paid"
              cardbgcolor="green"
              pageLink="/manageSalary"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;