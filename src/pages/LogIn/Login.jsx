import React, { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import app from "../../firebase";
import "./app.loginpage.scss";
import LoginSvg from "../../assets/login.svg";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // async function handleSubmit(e) {
  //   e.preventDefault();

  //   try {
  //     setError("");
  //     setLoading(true);
  //     await login(emailRef.current.value, passwordRef.current.value);
  //     // localStorage.setItem(
  //     //   "userDetails",
  //     //   JSON.stringify(emailRef.current.value, passwordRef.current.value)
  //     // );
  //     navigate("/admin");
  //   } catch {
  //     setError("Failed to log in");
  //   }

  //   setLoading(false);
  // }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/admin");
    } catch (err) {
      // setError("Failed to log in");
      // setError(err.message);
      setError(true);
    }

    setLoading(false);
  }

  return (
    <div className="login-page">
      <div className="login-left-side">
        <div className="login-logo">
          <p>AfterClick</p>
        </div>
        <div className="login-content">
          <div className="login-header">
            <p id="login-header">Log In</p>
            <p>If you don't have an account register</p>
            <span>You can </span>
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <span>Register here !</span>
            </Link>
          </div>
          <div className="login-form">
            <div className={`error-message-${error}`}>
              {error && (
                <p>
                  The email and password you entered did not match our record.
                  please check and try again.
                </p>
              )}
            </div>
            <form onSubmit={handleSubmit}>
              <div className="input-box">
                <label className="details">Email:</label>
                <input
                  type="email"
                  ref={emailRef}
                  placeholder="Enter your Email Id"
                  required
                />
              </div>
              <div className="input-box">
                <label className="details">Password:</label>
                <input
                  type="password"
                  ref={passwordRef}
                  placeholder="Enter your password"
                  required
                />
              </div>
              {/* <input disabled={loading} type="submit" /> */}
              <button className="login-btn" disabled={loading} type="submit">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="login-right-side">
        <img style={{ width: "100%" }} src={LoginSvg} />
      </div>
    </div>
  );
};

export default Login;
