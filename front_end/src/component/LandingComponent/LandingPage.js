import React from "react";
import "./LandingPage.css";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="landing_container">
      <div className="landing_content">
        <div className="landing_info">
          <h1>See what's next</h1>
          <p>WATCH ANYWHERE. CANCEL ANYTIME</p>
          <Link to="/category" className="btn btn-lg landingbutton">
            WATCH FREE FOR 30 DAYS &rang;
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
