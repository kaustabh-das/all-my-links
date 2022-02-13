import React, { useRef, useState, useEffect } from "react";
import "./inputModel.scss";
import { Menu as MenuIcon } from "react-feather";
import { X as XIcon } from "react-feather";
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
import { useSelector, useDispatch } from "react-redux";
import { createUserLink } from "../../actions/index";
// import { Button, Modal, Form } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";

const InputModel = (props) => {
  // const dispatch = useDispatch();
  const { currentUser, logout } = useAuth();
  const titleRef = useRef();
  const linkRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const usersLinkCollectionInfoRef = collection(
    db,
    "users",
    currentUser.email,
    "user-links"
  );

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      await addDoc(usersLinkCollectionInfoRef, {
        title: titleRef.current.value,
        link: linkRef.current.value,
      });
      // props.setModalShow(false);
    } catch {
      setError("Something is went wrong....");
    }
    props.setModalShow(false);
    props.setRefreshPage(!props.refreshPage);
    setLoading(false);
  }

  return (
    <div className="user-model">
      <div className="user-model-body">
        <div className="header-div">
          <h1>Input Model</h1>
          {/* <p>Link ID: {props.linkId}</p> */}
          <button
            className="input-close-btn"
            onClick={() => {
              props.setModalShow(false);
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
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="facebook"
                ref={titleRef}
              />
            </div>
            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Url :
              </label>
              <input
                type="text"
                className="form-control"
                // id="exampleFormControlInput1"
                placeholder="https://www.facebook.com/rasky.bro"
                ref={linkRef}
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
              {loading && <p>loading...</p>}
            </div>
            {/* <input className="input-form-btn" type="submit" value="Submit" /> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default InputModel;
