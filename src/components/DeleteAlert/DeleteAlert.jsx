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
import { useAuth } from "../../contexts/AuthContext";
import "./deleteAlert.scss";

const DeleteAlert = (props) => {
  const { currentUser } = useAuth();

  const [loading, setLoading] = useState(false);

  const deleteLink = async (id) => {
    setLoading(true);
    const userEmail = currentUser.email;
    const userDoc = doc(db, "users", userEmail, "user-links", id);
    // console.log("delete me");
    await deleteDoc(userDoc);
    props.setRefreshPage(!props.refreshPage);
    props.setDeleteCard(false);
    setLoading(false);
  };

  return (
    <div className="delete-notification">
      <div className="delete-content">
        <p>{props.title} will be deleted</p>
        <div className="delete-button">
          <button onClick={() => deleteLink(props.linkId)}>Delete</button>
          <button onClick={() => props.setDeleteCard(false)}>Cancel</button>
        </div>
        {loading && <p>loading...</p>}
      </div>
    </div>
  );
};

export default DeleteAlert;
