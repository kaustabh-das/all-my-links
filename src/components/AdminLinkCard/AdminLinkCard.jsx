import React, { useState, useRef, useEffect } from "react";
import "./adminlinkcard.scss";

import { MoreVertical as MoreVerticalIcon } from "react-feather";
import { ToggleLeft as ToggleLeftIcon } from "react-feather";
import { Trash as TrashIcon } from "react-feather";
import { Edit2 as Edit2Icon } from "react-feather";

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

const AdminLinkCard = ({
  title,
  link,
  sensative,
  status,
  id,
  index,
  refreshPage,
  setRefreshPage,
  setLoading,
  setLinkId,
  setTitle,
  setDeleteCard,
  setupdateModalShow,
}) => {
  const { currentUser } = useAuth();

  const [userTitle, setUserTitle] = useState();

  const toggleBtnFun = async (userId, status) => {
    // try {
    setLoading(true);
    // setToggleBtn(!toggleBtn);
    if (status) {
      const userDoc = doc(db, "users", currentUser.email, "user-links", userId);
      const newDBStatus = { status: false };
      await updateDoc(userDoc, newDBStatus);
      setRefreshPage(!refreshPage);
    } else {
      const userDoc = doc(db, "users", currentUser.email, "user-links", userId);
      const newDBStatus = { status: true };
      await updateDoc(userDoc, newDBStatus);
      setRefreshPage(!refreshPage);
    }
    // }
    // catch {
    //   setError("Something is went wrong....");
    // }
    setLoading(false);
  };

  const sensitiveBtnFun = async (userId, sensative) => {
    // try {
    setLoading(true);
    // setToggleBtn(!toggleBtn);
    if (sensative) {
      const userDoc = doc(db, "users", currentUser.email, "user-links", userId);
      const newDBSensative = { sensative: false };
      await updateDoc(userDoc, newDBSensative);
      setRefreshPage(!refreshPage);
    } else {
      const userDoc = doc(db, "users", currentUser.email, "user-links", userId);
      const newDBSensative = { sensative: true };
      await updateDoc(userDoc, newDBSensative);
      setRefreshPage(!refreshPage);
    }
    // }
    // catch {
    //   setError("Something is went wrong....");
    // }
    setLoading(false);
  };

  const updateLink = (userId) => {
    setLinkId(userId);
    setupdateModalShow(true);
  };

  const handelDelete = (id, title) => {
    setLinkId(id);
    setTitle(title);
    setDeleteCard(true);
  };

  useEffect(() => {
    setUserTitle(title);
  }, []);

  return (
    <div className="link-card">
      <div key={index} className="info-div">
        <div className="info-left-div">
          <MoreVerticalIcon />
        </div>
        <div className="info-right-div">
          <form>
            <div className="info-top-div">
              <p>
                {/* <input
                              type="text"
                              value={link.title}
                              // ref={titleRef}
                              onChange={(e) =>
                                // console.log("jjo");
                                updateLink(index, e)
                              }
                            /> */}
                <span>{title}</span>
                <span>
                  <Edit2Icon
                    className="edit-icon"
                    onClick={() => updateLink(id)}
                  />
                </span>
                <span>{index}</span>
                <span>{sensative}</span>
              </p>

              {/* <p>{link.id}</p> */}
              <div className={`toggle-btn-${status}`}>
                <ToggleLeftIcon onClick={() => toggleBtnFun(id, status)} />
              </div>
            </div>
            <div className="info-bottom-div">
              <div>
                {" "}
                <a>{link}</a>
                <span> </span>
                {/* <span>{link.id}</span> */}
                {/* <span>
                              <Edit2Icon className="edit-icon" />
                            </span> */}
              </div>
              <div
                style={{
                  border: "2px solid black",
                  width: "1.2rem",
                  height: "1.2rem",
                }}
                onClick={() => sensitiveBtnFun(id, sensative)}
                className={`sensative-content-${sensative}`}
              >
                {/* Checkbox: <input type="checkbox" id="myCheck" /> */}
              </div>
              <TrashIcon
                // onClick={() => setDeleteCard(!deleteCard)}
                onClick={() => handelDelete(id, title)}
                className="trash-btn"
              />
            </div>
          </form>
        </div>
      </div>
      {/* <div className="delete-card"> */}
      {/* {deleteCard && (

                    )} */}
      {/* </div> */}
    </div>
  );
};

export default AdminLinkCard;
