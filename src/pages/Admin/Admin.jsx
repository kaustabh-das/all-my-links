import React, { useState, useEffect } from "react";
import InputModel from "../../components/InputModel/InputModel";
import Layout from "../../components/Layout/Layout";
import MobileModel from "../../components/MobileModel/MobileModel";
// import Preview from "../../components/Preview/Preview";
import "./app.adminpage.scss";
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
import { getLinks, getUserInfo, deleteUserLink } from "../../actions/index";
import { MoreVertical as MoreVerticalIcon } from "react-feather";
import { ToggleLeft as ToggleLeftIcon } from "react-feather";
import { Trash as TrashIcon } from "react-feather";
import { Edit2 as Edit2Icon } from "react-feather";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Button, Modal } from "react-bootstrap";

const Admin = () => {
  const { currentUser, logout } = useAuth();
  const dispatch = useDispatch();
  const links = useSelector((state) => state.userLinkReducer.links);
  const info = useSelector((state) => state.userInfoReducer.info);

  const [modalShow, setModalShow] = useState(false);
  const [previewShow, setPreviewShow] = useState(false);
  const [refreshPage, setRefreshPage] = useState(false);

  // const updateUser = async (id, age) => {
  //   const userDoc = doc(db, "users", currentUser.email, "user-links", id);
  //   const newFields = { age: age + 1 };
  //   await updateDoc(userDoc, newFields);
  // };

  const deleteLink = async (id) => {
    const userEmail = currentUser.email;
    dispatch(deleteUserLink(id, userEmail));
    setRefreshPage(!refreshPage);

    // const userDoc = doc(db, "users", currentUser.email, "user-links", id);
    // console.log(id);
  };

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  // let display_val=""

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    windowDimensions.width < 600 && setPreviewShow(false);
  }, [windowDimensions.width]);

  useEffect(() => {
    // setPage(useSelector((state) => state.changeThePage))
    dispatch(getLinks(currentUser.email));
    dispatch(getUserInfo(currentUser.email));

    // firebaseLinkData.push(...links);

    // setUsersLink(
    //   firebaseLinkData.sort((a, b) => {
    //     return a.row_no - b.row_no;
    //   })
    // );
    // console.log(links[0]);
  }, [refreshPage]);

  return (
    <Layout>
      {modalShow && (
        <InputModel
          onRequestClose={() => setModalShow(false)}
          setModalShow={setModalShow}
        />
      )}
      {previewShow && (
        <MobileModel
          onRequestClose={() => setPreviewShow(false)}
          setPreviewShow={setPreviewShow}
        />
      )}
      <div className="admin_page">
        <div className="admin-body">
          <div className="create-btn" onClick={() => setModalShow(true)}>
            Add New Link
          </div>

          <h1>Admin Page</h1>
          <div className="info-parent-div">
            {links &&
              links.map((link, index) => {
                return (
                  <div className="info-div">
                    <div className="info-left-div">
                      <MoreVerticalIcon />
                    </div>
                    <div className="info-right-div">
                      <div className="info-top-div">
                        <p>
                          <span>{link.title}</span>
                          <span>
                            <Edit2Icon className="edit-icon" />
                          </span>
                        </p>
                        {/* <p>{link.id}</p> */}
                        <ToggleLeftIcon />
                      </div>
                      <div className="info-bottom-div">
                        <div>
                          {" "}
                          <a>{link.link}</a>
                          <span>
                            <Edit2Icon className="edit-icon" />
                          </span>
                        </div>
                        <TrashIcon
                          className="trash-btn"
                          onClick={() => deleteLink(link.id)}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}

            {/* <div className="info-div">
              <div className="info-left-div"></div>
              <div className="info-right-div">
                <div className="info-top-div"></div>
                <div className="info-bottom-div"></div>
              </div>
            </div>
            <div className="info-div">
              <div className="info-left-div"></div>
              <div className="info-right-div">
                <div className="info-top-div"></div>
                <div className="info-bottom-div"></div>
              </div>
            </div>
            <div className="info-div">
              <div className="info-left-div"></div>
              <div className="info-right-div">
                <div className="info-top-div"></div>
                <div className="info-bottom-div"></div>
              </div>
            </div>
            <div className="info-div">
              <div className="info-left-div"></div>
              <div className="info-right-div">
                <div className="info-top-div"></div>
                <div className="info-bottom-div"></div>
              </div>
            </div> */}
          </div>
        </div>
        {windowDimensions.width < 600 && (
          <div onClick={() => setPreviewShow(true)} className="mobile-preview">
            <h2>Preview</h2>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Admin;
