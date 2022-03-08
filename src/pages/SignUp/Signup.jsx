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

    const searchresult = searchUsername.find(
      (x) => x.username === usernameRef.current.value
    );

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
          }
        );

        await setDoc(doc(db, "usernameDB", emailRef.current.value), {
          email: emailRef.current.value,
          username: storeUsername.toLowerCase(),
        });

        await signup(emailRef.current.value, passwordRef.current.value);

        navigate("/admin");
      } catch {
        // setError(err);
        setError("Failed to create an account");
      }
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
            Full Name:
            <input type="text" ref={fullnameRef} required />
          </label>
          <label>
            Email:
            <input type="email" ref={emailRef} required />
          </label>
          <label>
            Username:
            <input type="text" ref={usernameRef} required />
          </label>
          <label>
            Password:
            <input
              type="password"
              ref={passwordRef}
              placeholder="password should be of atleast 6 characters"
              required
            />
          </label>
          <label>
            Password Confermation:
            <input type="password" ref={passwordConfirmRef} required />
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
