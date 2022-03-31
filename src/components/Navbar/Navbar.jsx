import React, { useState, useRef, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./navbar.scss";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import Bell from "../../assets/bell.svg";
import Message from "../../assets/message.svg";

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  // const handleLogout = async () => {
  //   try {
  //     await logout();
  //     navigate("/login");
  //   } catch {
  //     setError("Failed to log out");
  //   }
  // };

  return (
    <div className="navbar">
      <div className="navbar-items">
        <div className="logo">
          <Link
            to="/admin"
            style={{ textDecoration: "none", color: "#ffedc8" }}
          >
            {" "}
            AfterClick{" "}
          </Link>
        </div>
        <div className="items">
          <Link
            to="/admin"
            className="items-value"
            style={{ textDecoration: "none" }}
          >
            Admin
          </Link>
          <Link
            to="/admin/appearance"
            className="items-value"
            style={{ textDecoration: "none" }}
          >
            Appearance
          </Link>
          <Link
            to="/admin/settings"
            className="items-value"
            style={{ textDecoration: "none" }}
          >
            Settings
          </Link>
        </div>
        {/* <div className="logout-button" onClick={handleLogout}>
          Log Out
        </div> */}
        <div>
          <img className="nav-bell" src={Bell} />
        </div>
        <div>
          <img className="nav-message" src={Message} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
