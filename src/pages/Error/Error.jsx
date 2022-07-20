import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./app.error.scss";

const Error = () => {
  const navigate = useNavigate();
  return (
    <div className="error-page">
      <div className="error-page-404">
        <p>404</p>
      </div>
      <div className="error-page-header">
        <p>Oops, This Page Could Not Be Found </p>
      </div>
      <div className="error-page-desc">
        <p>
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
      </div>
      <div className="error-page-btn" onClick={() => navigate("/")}>
        {/* <Link to="/signup">HOMEPAGE</Link> */}
        <p>HOMEPAGE</p>
      </div>
    </div>
  );
};

export default Error;
