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
} from "firebase/firestore";
import "./app.appearancepage.scss";
import LoadingComp from "../../components/LoadingComp/LoadingComp";

const Appearance = () => {
  const { currentUser, logout } = useAuth();
  const docId = "LO77RLzKIcdhEXNA1oer";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
        <h1>Appearance Page</h1>
        <div className="theme-section">
          <div className="default" onClick={() => changeTheme("default")}></div>
          <div className="pink" onClick={() => changeTheme("pink")}></div>
          <div className="green"></div>
          <div className="blue"></div>
        </div>
      </div>
    </Layout>
  );
};

export default Appearance;
