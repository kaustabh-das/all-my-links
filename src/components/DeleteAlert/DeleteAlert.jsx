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
        <div className="delete-title">
          <p>
            Do you want to delete
            <snap> "</snap>
            {props.title}
            <snap>"</snap> ?
          </p>
        </div>
        <div className="delete-button">
          <button id="delete-btn" onClick={() => deleteLink(props.linkId)}>
            Delete
          </button>
          <button id="cancel-btn" onClick={() => props.setDeleteCard(false)}>
            Cancel
          </button>
        </div>
        {loading && <p>loading...</p>}
      </div>
    </div>
  );
};

export default DeleteAlert;
