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
import Navbar from "../../components/Navbar/Navbar";
import "./settings.scss";
import LoadingComp from "../../components/LoadingComp/LoadingComp";

const Settings = () => {
  const { currentUser, logout } = useAuth();
  const docId = "LO77RLzKIcdhEXNA1oer";

  const nameRef = useRef();
  const emailRef = useRef();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [dbUsername, setDBUsername] = useState();
  const [dbBio, setDBBio] = useState();
  const [dbName, setDBName] = useState();
  const [dbEmail, setDBEmail] = useState();
  // const [dbPhoneno, setDBPhoneno] = useState();

  const [username, setUsername] = useState();
  const [bio, setBio] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  // const [phoneno, setPhoneno] = useState();

  useEffect(() => {
    const getUsersInfo = () => {
      onSnapshot(
        collection(db, "users", currentUser.email, "user-info"),
        (querySnapshot) => {
          const items = [];
          querySnapshot.forEach((doc) => {
            items.push(doc.data());
          });
          setUsername(items[0].username);
          setBio(items[0].bio);
          setName(items[0].name);
          setEmail(items[0].email);
          // setPhoneno(items[0].phoneno);
          // console.log(items[0].phoneno);
          setDBUsername(items[0].username);
          setDBBio(items[0].bio);
          setDBName(items[0].name);
          setDBEmail(items[0].email);
          // setDBPhoneno(items[0].phoneno);
        }
        // (error) => {
        //   // ...
        // }
      );
    };

    getUsersInfo();
  }, []);

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
      const newUserInfoDB = { name: name, email: email };
      await updateDoc(userDoc, newUserInfoDB);
    } catch {
      setError("Something is went wrong....");
      console.log("Something is went wrong....");
    }
    setDBName(name);
    setDBEmail(email);
    setLoading(false);
  };

  const cancelUpdate = () => {
    setName(dbName);
    setEmail(dbEmail);
  };

  return (
    // <Layout>
    //   <div className="settings_page">
    //     <h1>Settings Page</h1>
    //   </div>
    // </Layout>
    <div className="setting-page">
      <Navbar />
      <div className="setting-main-page">
        <h3>Setting</h3>
        <div className="setting-info-body">
          <form onSubmit={handleSubmit}>
            {/* <div className="mb-3">
              <label
                for="exampleFormControlInput1"
                className="form-label setting-title"
              >
                Username :
              </label>
              <input
                type="text"
                className="form-control input-width"
                id="exampleFormControlInput1"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div> */}
            {/* <div className="mb-3">
              <label
                for="exampleFormControlInput1"
                className="form-label setting-title"
              >
                Bio :
              </label>
              <textarea
                class="form-control"
                placeholder="Leave a comment here"
                id="floatingTextarea2"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                ref={bioRef}
                style={{ height: "8rem" }}
              ></textarea>
            </div> */}
            <div className="mb-3">
              <label
                for="exampleFormControlInput1"
                className="form-label setting-title"
              >
                Name :
              </label>
              <input
                type="text"
                className="form-control input-width"
                id="exampleFormControlInput1"
                // placeholder="Kaustabh Das"
                value={name}
                onChange={(e) => setName(e.target.value)}
                ref={nameRef}
              />
            </div>
            <div className="mb-3">
              <label
                for="exampleFormControlInput1"
                className="form-label setting-title"
              >
                Email :
              </label>
              <input
                type="email"
                className="form-control input-width"
                id="exampleFormControlInput1"
                // placeholder="jone@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                ref={emailRef}
              />
            </div>
            {/* <div className="mb-3">
            <label
              for="exampleFormControlInput1"
              className="form-label setting-title"
            >
              Phone no:
            </label>
            <input
              type="number"
              className="form-control input-width"
              id="exampleFormControlInput1"
              // placeholder="Enter your phone no..."
              value={phoneno}
              onChange={(e) => setPhoneno(e.target.value)}
            />
          </div> */}
            {(name !== dbName || email !== dbEmail) && (
              <div class="col-12 ">
                <button className="btn btn-primary setting-btn" type="submit">
                  Save
                </button>
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
      </div>
    </div>
  );
};

export default Settings;
