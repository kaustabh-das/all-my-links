import React, { useState, useRef, useEffect } from "react";
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
} from "firebase/firestore";
import "./layout.scss";
import Navbar from "../Navbar/Navbar";
import Preview from "../Preview/Preview";
import Mypic from "../../assets/kd.jpeg";

const Layout = (props) => {
  const { currentUser, logout } = useAuth();

  // const titleRef = useRef();
  // const linkRef = useRef();

  const [usersInfo, setUsersInfo] = useState([]);
  const usersCollectionInfoRef = collection(
    db,
    "users",
    currentUser.email,
    "user-info"
  );

  // const usersLinkCollectionInfoRef = collection(
  //   db,
  //   "users",
  //   currentUser.email,
  //   "user-links"
  // );

  // const clickMe = async (e) => {
  //   e.preventDefault();
  //   console.log("hello");
  //   await addDoc(usersLinkCollectionInfoRef, {
  //     title: "title",
  //     link: "link",
  //   });
  // };

  useEffect(() => {
    const getUsersInfo = async () => {
      const data = await getDocs(usersCollectionInfoRef);
      // console.log(data.docs);
      setUsersInfo(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsersInfo();
  }, []);
  return (
    <div className="layout">
      <Navbar />
      <div className="layout-body">
        <div className="layout-body-left">
          <div className="body-header">
            {usersInfo.map((user, index) => {
              return (
                <div className="user-details">
                  <img className="user-img" src={Mypic} />
                  <p className="user-name">@username: {user.email}</p>
                  {/* <button onClick={clickMe}>click me</button> */}
                </div>
              );
            })}
          </div>
          <div className="body-main">{props.children}</div>
        </div>
        <div className="layout-body-right">
          <div className="preview-body">
            <div className="my-link">
              <p>
                My Link:<span> </span>
                <a href="http://localhost:3000/rasky" target="_blank">
                  http://localhost:3000/rasky
                </a>
              </p>
            </div>
            <div className="preview-body">
              <Preview />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
