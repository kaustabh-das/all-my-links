import React, { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { db, app } from "../../firebase";
import "./app.signup.scss";

const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const usernameRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      console.log(emailRef.current.value);
      await signup(emailRef.current.value, passwordRef.current.value);

      await setDoc(
        doc(
          db,
          "users",
          emailRef.current.value,
          "user-info",
          "LO77RLzKIcdhEXNA1oer"
        ),
        {
          name: "Los Angeles2",
          email: emailRef.current.value,
          username: usernameRef.current.value,
        }
      );

      // await setDoc(doc(db, "users", "usernameDB", usernameRef.current.value), {
      //   email: emailRef.current.value,
      // });

      navigate("/admin");
    } catch {
      // setError(err);
      setError("Failed to create an account");
    }

    setLoading(false);
  }
  return (
    <div className="signup-page">
      <h1>Sign Up page</h1>
      <div>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input type="email" ref={emailRef} />
          </label>
          <label>
            Username:
            <input type="text" ref={usernameRef} />
          </label>
          <label>
            Password:
            <input
              type="password"
              ref={passwordRef}
              placeholder="password should be of atleast 6 characters"
            />
          </label>
          <label>
            Password Confermation:
            <input type="password" ref={passwordConfirmRef} />
          </label>
          <input disabled={loading} type="submit" />
        </form>
      </div>
      <div className="">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </div>
  );
};

export default Signup;
