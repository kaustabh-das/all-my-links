import React from "react";
import "./navbar.scss";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-items">
        <div className="logo"> Logo </div>
        <div className="items">
          <p className="items-value">Links</p>
          <p className="items-value">Appearance</p>
          <p className="items-value">Settings</p>
        </div>
        <div className="logout-button">Log Out</div>
      </div>
    </div>
  );
};

export default Navbar;
