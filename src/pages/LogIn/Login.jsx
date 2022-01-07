import React, { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "./app.loginpage.scss";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/admin");
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  }
  return (
    <div className="login-page">
      <h1>Login Page</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" ref={emailRef} />
        </label>
        <label>
          Password:
          <input
            type="password"
            ref={passwordRef}
            placeholder="Enter your password"
          />
        </label>
        <input disabled={loading} type="submit" />
      </form>
    </div>
  );
};

export default Login;
