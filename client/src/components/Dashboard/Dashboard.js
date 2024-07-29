import React, { useContext, useEffect } from "react";
import Card from "./Card";
import './Dashboard.css';
import DataContext from "../../context/DataContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { getDept, getStaff, getSal, dept, staff, salary } = useContext(DataContext);

  useEffect(() => {
    getDept();
    getSal();
    getStaff();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigate=useNavigate()
  useEffect(() => {
    if(!(localStorage.getItem('authToken')))
    {
      navigate('/')
    }
    // eslint-disable-next-line
  }, []);

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
              number="5"
              category="Leave Requests"
              cardbgcolor="#c70d0d"
              pageLink="/leaveHistory"
            />
          </div>
          <div className="col-sm-12 col-md-6 col-lg-3">
            <Card
              number={`${salary?.length ?? 0}`}
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
