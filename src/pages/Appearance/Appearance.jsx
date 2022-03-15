import React, { useRef, useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  setDoc,
  onSnapshot,
} from "firebase/firestore";
import "./app.appearancepage.scss";
import LoadingComp from "../../components/LoadingComp/LoadingComp";

const Appearance = () => {
  const { currentUser, logout } = useAuth();
  const docId = "LO77RLzKIcdhEXNA1oer";

  const usernameRef = useRef();
  const bioRef = useRef();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [dbUsername, setDBUsername] = useState();
  const [dbBio, setDBBio] = useState();

  const [username, setUsername] = useState();
  const [bio, setBio] = useState();

  // let dbUsername = "";

  useEffect(() => {
    const getUsersInfo = () => {
      onSnapshot(
        collection(db, "users", currentUser.email, "user-info"),
        (querySnapshot) => {
          const items = [];
          querySnapshot.forEach((doc) => {
            items.push(doc.data());
          });
          // setUsersInfo(
          //   items.sort((a, b) => {
          //     return a.row_no - b.row_no;
          //   })
          // );
          setUsername(items[0].username);
          setBio(items[0].bio);
          // console.log(items);
          setDBUsername(items[0].username);
          setDBBio(items[0].bio);
          // console.log(dbUsername);
        }
        // (error) => {
        //   // ...
        // }
      );
    };

    getUsersInfo();
  }, []);

  // useEffect(() => {
  //   console.log(dbUsername);
  // }, [username]);

  const cancelUpdate = () => {
    setUsername(dbUsername);
    setBio(dbBio);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userInfoDoc = "LO77RLzKIcdhEXNA1oer";
    try {
      setLoading(true);
      const userDoc = doc(
        db,
        "users",
        currentUser.email,
        "user-info",
        userInfoDoc
      );
      const newUserInfoDB = { username: username, bio: bio };
      await updateDoc(userDoc, newUserInfoDB);

      const userDBDoc = doc(db, "usernameDB", currentUser.email);
      const newUserDB = { username: username };
      await updateDoc(userDBDoc, newUserDB);
    } catch {
      setError("Something is went wrong....");
      console.log("Something is went wrong....");
    }
    setDBUsername(username);
    setDBBio(bio);
    setLoading(false);
  };

  const changeTheme = async (themeval) => {
    setLoading(true);
    try {
      const userDoc = doc(db, "users", currentUser.email, "user-info", docId);
      const newUserTheme = { theme: themeval };
      await updateDoc(userDoc, newUserTheme);
    } catch {
      setError("Something is went wrong....");
      console.log("Something is went wrong....");
    }

    setLoading(false);
  };

  return (
    <Layout>
      {loading && <LoadingComp />}
      <div className="appearance_page">
        <div className="profile-section">
          <div className="profile-header">
            <h1>Profile</h1>
          </div>
          <div className="profile-inputs">
            {/* <div className="profile-image">
              <img />
            </div> */}
            {/* {usersInfo &&
              usersInfo.map((user, index) => {
                return ( */}
            <div className="profile-data">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label for="exampleFormControlInput1" className="form-label">
                    Username :
                  </label>
                  <input
                    type="text"
                    value={username}
                    className="form-control"
                    id="exampleFormControlInput1"
                    // placeholder="facebook"
                    onChange={(e) => setUsername(e.target.value)}
                    ref={usernameRef}
                  />
                </div>

                <label for="floatingTextarea2">Bio:</label>
                <div class="form-floating">
                  <textarea
                    class="form-control"
                    placeholder="Leave a comment here"
                    id="floatingTextarea2"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    ref={bioRef}
                    style={{ height: "8rem" }}
                  ></textarea>
                </div>
                {/* <p>{dbUsername}</p> */}
                {(username !== dbUsername || bio !== dbBio) && (
                  <div>
                    <button type="submit">Save</button>
                    <button
                      onClick={() => {
                        cancelUpdate();
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </form>
            </div>
            {/* );
              })} */}
          </div>
        </div>
        <div className="theme-section">
          <h1>Theme</h1>
          <div className="theme-cards">
            <div
              className="default"
              onClick={() => changeTheme("default")}
            ></div>
            <div className="pink" onClick={() => changeTheme("pink")}></div>
            <div className="green"></div>
            <div className="blue"></div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Appearance;
