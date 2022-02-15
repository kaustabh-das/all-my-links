import React, { useState, useRef, useEffect } from "react";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import "./app.homepage.scss";

const Home = () => {
  const userInputRef = useRef();
  const [loading, setLoading] = useState(false);
  const [usersInfo, setUsersInfo] = useState([]);

  const usersCollectionInfoRef = collection(
    db,
    "users"
    // currentUser.email,
    // "user-info"
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);
    // const data = await getDocs(usersCollectionInfoRef);
    // // console.log(data.docs);
    // setUsersInfo(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    // // usersInfo.map((user, index) => {
    // //   console.log(user);
    // // });
    // console.log(usersInfo);
    // setLoading(false);
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
    </div>
  );
};

export default Home;
