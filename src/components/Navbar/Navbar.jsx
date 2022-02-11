import React, { useState, useRef, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./navbar.scss";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  };

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
        <div className="logout-button" onClick={handleLogout}>
          Log Out
        </div>
      </div>
    </div>
  );
};

export default Navbar;
