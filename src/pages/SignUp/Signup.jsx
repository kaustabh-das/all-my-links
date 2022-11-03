import React, { useRef, useState, useEffect } from "react";
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
  onSnapshot,
} from "firebase/firestore";
import { db, app } from "../../firebase";
import "./app.signup.scss";
import SignUpSvg from "../../assets/signup.svg";

const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const usernameRef = useRef();
  const fullnameRef = useRef();
  const { signup } = useAuth();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchUsername, setSearchUsername] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    onSnapshot(collection(db, "usernameDB"), (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
        setSearchUsername(items);
      });
      console.log(items);
    });
    // console.log(searchUsername);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    // setError("");

    const searchresult = searchUsername.find(
      (x) => x.username === usernameRef.current.value
    );
    console.log(searchresult);

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    if (searchresult) {
      setError("This username is not avaliable");
    } else {
      try {
        setError("");
        setLoading(true);
        console.log(emailRef.current.value);

        const storeUsername = usernameRef.current.value;

        await setDoc(
          doc(
            db,
            "users",
            emailRef.current.value,
            "user-info",
            "LO77RLzKIcdhEXNA1oer"
          ),
          {
            name: fullnameRef.current.value,
            theme: "default",
            email: emailRef.current.value,
            username: storeUsername.toLowerCase(),
            bio: "",
            profilePicLink: "",
          }
        );

        await setDoc(doc(db, "usernameDB", emailRef.current.value), {
          email: emailRef.current.value,
          username: storeUsername.toLowerCase(),
        });

        await signup(emailRef.current.value, passwordRef.current.value);

        navigate("/admin");
      } catch (err) {
        // setError(err);
        setError("Failed to create an account");
        // setError(true);
      }
    }

    setLoading(false);
  }
  return (
    <div className="signup-page">
      <div className="signup-left-side">
        <div className="signup-logo">
          <p>AfterClick</p>
        </div>
        <div className="signup-content">
          <div className="signup-header">
            <p id="signup-header">Sign Up</p>
            <p>If you already have an account register</p>
            <span>You can </span>
            <Link to="/login" style={{ textDecoration: "none" }}>
              Login here !
            </Link>
          </div>
          <div className="signup-form">
            {error && (
              <div className={`error-message`}>
                {/* <p>"Sorry, failed to create an account"</p> */}
                <p>{error}</p>
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="input-box">
                <label className="details">Full Name:</label>
                <input type="text" ref={fullnameRef} required />
              </div>
              <div className="input-box">
                <label className="details">Email:</label>
                <input type="email" ref={emailRef} required />
              </div>
              <div className="input-box">
                <label className="details">Username:</label>
                <input type="text" ref={usernameRef} required />
              </div>
              <div className="input-box">
                <label className="details">Password:</label>
                <input
                  type="password"
                  ref={passwordRef}
                  placeholder="password should be of atleast 6 characters"
                  required
                />
              </div>
              <div className="input-box">
                <label className="details">Password Confermation:</label>
                <input type="password" ref={passwordConfirmRef} required />
              </div>
              <div>
                {/* <input
                    disabled={loading}
                    type="submit"
                    // placeholder="Register"
                  /> */}
                <button className="signup-btn" disabled={loading} type="submit">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="signup-right-side">
        <img style={{ width: "100%" }} src={SignUpSvg} />
      </div>
    </div>
  );
};

export default Signup;
