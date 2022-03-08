import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  setDoc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import "./app.homepage.scss";
import { constant } from "lodash";

const Home = () => {
  const { currentUser, logout } = useAuth();
  const userInputRef = useRef();
  const [loading, setLoading] = useState(false);
  const [usernameStatus, setUsernameStatus] = useState();
  const [userInputStatus, setUserInputStatus] = useState();
  const [statusMessage, setStatusMessage] = useState("message-hide");
  const [searchUsername, setSearchUsername] = useState([]);
  const [checkName, setCheckName] = useState();

  // const usersCollectionInfoRef = collection(
  //   db,
  //   "users",
  //   currentUser.email,
  //   "user-info"
  // );

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(searchUsername, userInputRef.current.value);
    if (userInputRef.current.value) {
      const searchresult = searchUsername.find(
        (x) => x.username === userInputRef.current.value
      );
      if (searchresult) {
        console.log(`${userInputRef.current.value} username is not avaliable`);
        setUsernameStatus(false);
        setCheckName(userInputRef.current.value);
        setStatusMessage("message-dislpay");
      } else {
        console.log(`${userInputRef.current.value} username is avaliable`);
        setUsernameStatus(true);
        setCheckName(userInputRef.current.value);
        setStatusMessage("message-dislpay");
      }
      setUserInputStatus(true);
    } else {
      setUserInputStatus(false);
      setStatusMessage("message-dislpay");
      console.log("Please enter a username");
    }
  };

  return (
    <div className="homepage">
      <h1>Home page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            placeholder="search your username"
            ref={userInputRef}
          />
        </label>
        <button
          // className="btn btn-primary"
          // disabled={loading}
          type="submit"
        >
          Search
        </button>
      </form>
      <div className={statusMessage}>
        {userInputStatus ? (
          usernameStatus ? (
            <p>"{checkName}" username is avaliable</p>
          ) : (
            <p>"{checkName}" username is not avaliable</p>
          )
        ) : (
          <p>Please enter a username</p>
        )}
      </div>
      <div className="">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </div>
  );
};

export default Home;
