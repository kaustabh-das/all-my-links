import React, { useRef, useState, useEffect } from "react";
import "./updateModel.scss";
import { Menu as MenuIcon } from "react-feather";
import { X as XIcon } from "react-feather";
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
import { useSelector, useDispatch } from "react-redux";
import { createUserLink } from "../../actions/index";
// import { Button, Modal, Form } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";

const UpdateModel = (props) => {
  const dispatch = useDispatch();
  const { currentUser, logout } = useAuth();
  const titleRef = useRef();
  const linkRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [links, setLinks] = useState("");

  const usersLinkCollectionInfoRef = doc(
    db,
    "users",
    currentUser.email,
    "user-links",
    props.linkId
  );

  async function getUserLinks() {
    const data = await getDoc(usersLinkCollectionInfoRef);
    console.log(data.data());
    console.log(data.data().title);
    setTitle(data.data().title);
    setLinks(data.data().link);
  }

  useEffect(() => {
    console.log("this inputmodel is for update");
    getUserLinks();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    // try {
    // setLoading(true);
    const userDoc = doc(
      db,
      "users",
      currentUser.email,
      "user-links",
      props.linkId
    );
    const newDBTitle = { title: title, link: links };
    await updateDoc(userDoc, newDBTitle);
    props.setupdateModalShow(false);
    props.setRefreshPage(!props.refreshPage);
    // } catch {
    //   setError("Something is went wrong....");
    // }
    // setLoading(false);
  }

  const updateLinkId = props.linkId;

  return (
    <div className="user-model">
      <div className="user-model-body">
        <div className="header-div">
          <h1>Update Model</h1>
          <p>Link ID: {props.linkId}</p>
          <button
            className="input-close-btn"
            onClick={() => {
              props.setupdateModalShow(false);
              //   closeWindow();
            }}
          >
            <XIcon />
          </button>
        </div>
        <div className="body-div">
          {error && <p>{error}</p>}
          <form className="body-div-form" onSubmit={handleSubmit}>
            {/* <label>
              Title:
              <input type="text" name="title" />
            </label> */}
            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Title :
              </label>
              <input
                type="text"
                value={title}
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="facebook"
                onChange={(e) => setTitle(e.target.value)}
                // ref={titleRef}
              />
            </div>
            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Url :
              </label>
              <input
                type="text"
                value={links}
                className="form-control"
                // id="exampleFormControlInput1"
                placeholder="https://www.facebook.com/rasky.bro"
                onChange={(e) => setLinks(e.target.value)}
                // ref={linkRef}
              />
            </div>
            {/* <label>
              Url:
              <input type="text" name="url" />
            </label> */}
            <div className="col-12">
              <button
                className="btn btn-primary"
                // disabled={loading}
                type="submit"
              >
                Save
              </button>
            </div>
            {/* <input className="input-form-btn" type="submit" value="Submit" /> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateModel;
