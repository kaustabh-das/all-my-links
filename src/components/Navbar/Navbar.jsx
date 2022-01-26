import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./navbar.scss";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-items">
        <div className="logo">
          <Link to="/admin"> Logo </Link>
        </div>
        <div className="items">
          <Link to="/admin" className="items-value">
            Admin
          </Link>
          <Link to="/admin/appearance" className="items-value">
            Appearance
          </Link>
          <Link to="/admin/settings" className="items-value">
            Settings
          </Link>
        </div>
        <div className="logout-button">Log Out</div>
      </div>
    </div>
  );
};

export default Navbar;
