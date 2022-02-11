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
import mypic from "../../assets/kd.jpeg";

const Preview = (props) => {
  const { currentUser } = useAuth();
  const [usersLink, setUsersLink] = useState([]);

  const usersCollectionLinkRef = collection(
    db,
    "users",
    currentUser.email,
    "user-links"
  );

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
    getUsersLink();
  }, []);

  return (
    <div className="preview-items">
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

      <img className="preview-user-img" src={mypic} alt="user image" />
      <p className="user-name">@username</p>
      <p className="user-bio">This is my bio.</p>
      {/* <div> */}
      {usersLink &&
        usersLink.map((link, index) => {
          return (
            <div key={index} className="user-links">
              <a href={link.link} target="_blank">
                {link.title}
              </a>
            </div>
          );
        })}
      {/* </div> */}
      {/* <div className="user-links">
        <p>Instagram2</p>
      </div>
      <div className="user-links">
        <p>Instagram3</p>
      </div>
      <div className="user-links">
        <p>Instagram4</p>
      </div>
      <div className="user-links">
        <p>Instagram5</p>
      </div>
      <div className="user-links">
        <p>Instagram6</p>
      </div>
      <div className="user-links">
        <p>Instagram7</p>
      </div>
      <div className="user-links">
        <p>Instagram8</p>
      </div> */}
    </div>
  );
};

export default Preview;
