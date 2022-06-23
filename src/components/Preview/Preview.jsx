import React, { useState, useRef, useEffect } from "react";
import { getLinks, getUserInfo } from "../../actions/index";
import { useSelector, useDispatch } from "react-redux";
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
  onSnapshot,
} from "firebase/firestore";
import "./preview.scss";
import Mypic from "../../assets/kd.jpeg";
import Avatar from "../../assets/avatar.png";

const Preview = (props) => {
  const { currentUser } = useAuth();
  const [usersLink, setUsersLink] = useState([]);
  const [usersInfo, setUsersInfo] = useState([]);
  const [getTheme, setGetTheme] = useState();
  // const [profilePic, setProfilePic] = useState(Mypic);

  // const usersCollectionLinkRef = collection(
  //   db,
  //   "users",
  //   currentUser.email,
  //   "user-links"
  // );

  // const usersCollectionInfoRef = collection(
  //   db,
  //   "users",
  //   currentUser.email,
  //   "user-info"
  // );

  useEffect(() => {
    const getUsersLink = () => {
      onSnapshot(
        collection(db, "users", currentUser.email, "user-links"),
        (querySnapshot) => {
          const items = [];
          querySnapshot.forEach((doc) => {
            items.push(doc.data());
          });
          setUsersLink(
            items.sort((a, b) => {
              return a.row_no - b.row_no;
            })
          );
        }
        // (error) => {
        //   // ...
        // }
      );
    };

    const getUsersInfo = () => {
      onSnapshot(
        collection(db, "users", currentUser.email, "user-info"),
        (querySnapshot) => {
          const items = [];
          querySnapshot.forEach((doc) => {
            items.push(doc.data());
          });
          setUsersInfo(
            items.sort((a, b) => {
              return a.row_no - b.row_no;
            })
          );
          setGetTheme(items[0].theme);
          // console.log(items[0].theme);
        }
        // (error) => {
        //   // ...
        // }
      );
    };

    getUsersLink();
    getUsersInfo();
  }, []);

  useEffect(() => {
    // console.log(usersInfo[0].theme);
  }, []);

  return (
    <div className={`preview-items-${getTheme}`}>
      {/* <h1>Preview</h1> */}
      {props.display && (
        <div
          className="close-btn"
          onClick={() => {
            props.setPreviewShow(false);
          }}
        >
          <h2>Close</h2>
        </div>
      )}
      {usersInfo &&
        usersInfo.map((user, index) => {
          return (
            <div key={index}>
              {/* <img className="preview-user-img" src={mypic} alt="user image" /> */}
              {user.profilePicLink ? (
                <img className="preview-user-img" src={user.profilePicLink} />
              ) : (
                <img className="preview-user-img" src={Avatar} />
              )}
              <p className="user-name">{user.username}</p>
              <p className="user-bio">{user.bio}</p>
            </div>
          );
        })}
      {/* <div> */}
      {usersLink &&
        usersLink.map((link, index) => {
          if (link.status) {
            return (
              <div key={index} className="user-links">
                <a href={link.link} target="_blank">
                  {link.title}
                </a>
              </div>
            );
          }
        })}
    </div>
  );
};

export default Preview;
