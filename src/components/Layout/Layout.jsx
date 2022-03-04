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
import LoadingComp from "../LoadingComp/LoadingComp";
import Mypic from "../../assets/kd.jpeg";

const Layout = (props) => {
  const { currentUser, logout } = useAuth();
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    const getUsersInfo = async () => {
      setLoading(true);
      const data = await getDocs(usersCollectionInfoRef);
      // console.log(data.docs);
      setUsersInfo(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoading(false);
      // console.log(items[0]);
    };
    getUsersInfo();
  }, []);
  return (
    <div className="layout">
      <Navbar />
      {loading && <LoadingComp style={"loading-comp-layout"} />}
      <div className="layout-body">
        <div className="layout-body-left">
          <div className="body-header">
            {usersInfo.map((user, index) => {
              return (
                <div key={index} className="user-details">
                  <img className="user-img" src={Mypic} />
                  <p className="user-name">@username: {user.username}</p>
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
              {usersInfo.map((user, index) => {
                return (
                  <p key={index}>
                    My Link:<span> </span>
                    <a
                      href={`http://localhost:3000/${user.username}`}
                      target="_blank"
                    >
                      http://localhost:3000/{user.username}
                    </a>
                    {/* {console.log(usersInfo.username)} */}
                  </p>
                );
              })}
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
