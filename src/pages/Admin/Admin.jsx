import React, { useState, useRef, useEffect } from "react";
import InputModel from "../../components/InputModel/InputModel";
import UpdateModel from "../../components/UpdateModel/UpdateModel";
import Layout from "../../components/Layout/Layout";
import MobileModel from "../../components/MobileModel/MobileModel";
// import Preview from "../../components/Preview/Preview";
import LoadingComp from "../../components/LoadingComp/LoadingComp";
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
import { MoreVertical as MoreVerticalIcon } from "react-feather";
import { ToggleLeft as ToggleLeftIcon } from "react-feather";
import { Trash as TrashIcon } from "react-feather";
import { Edit2 as Edit2Icon } from "react-feather";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Button, Modal } from "react-bootstrap";
import { debounce } from "lodash";

const Admin = () => {
  const { currentUser } = useAuth();

  const usersCollectionLinkRef = collection(
    db,
    "users",
    currentUser.email,
    "user-links"
  );
  const usersCollectionInfoRef = collection(
    db,
    "users",
    currentUser.email,
    "user-info"
  );

  const [modalShow, setModalShow] = useState(false);
  const [updateModalShow, setupdateModalShow] = useState(false);
  const [linkId, setLinkId] = useState();
  const [previewShow, setPreviewShow] = useState(false);
  const [refreshPage, setRefreshPage] = useState(false);
  const [usersLink, setUsersLink] = useState([]);
  // const [usersInfo, setUsersInfo] = useState([]);
  const [loading, setLoading] = useState(false);

  const updateLink = (userId) => {
    // console.log(userId);
    setLinkId(userId);
    setupdateModalShow(true);
    // console.log(updateModalShow);
  };

  const deleteLink = async (id) => {
    const userEmail = currentUser.email;
    const userDoc = doc(db, "users", userEmail, "user-links", id);
    // console.log("delete me");
    await deleteDoc(userDoc);
    setRefreshPage(!refreshPage);
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
    const getUsersLink = async () => {
      setLoading(true);
      const data = await getDocs(usersCollectionLinkRef);
      // console.log(data.docs);
      // setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      let firebaseLinkData = [];
      firebaseLinkData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setLoading(false);
      setUsersLink(
        firebaseLinkData.sort((a, b) => {
          return a.row_no - b.row_no;
        })
      );
    };

    getUsersLink();
  }, [refreshPage]);

  return (
    <Layout>
      {loading && <LoadingComp style={"loading-comp"} />}
      {modalShow && (
        <InputModel
          onRequestClose={() => setModalShow(false)}
          setModalShow={setModalShow}
          refreshPage={refreshPage}
          setRefreshPage={setRefreshPage}
        />
      )}
      {updateModalShow && (
        <UpdateModel
          onRequestClose={() => setupdateModalShow(false)}
          setupdateModalShow={setupdateModalShow}
          linkId={linkId}
          refreshPage={refreshPage}
          setRefreshPage={setRefreshPage}
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
          <div className="create-btn" onClick={(e) => setModalShow(true)}>
            Add New Link
          </div>
          <div className="info-parent-div">
            {usersLink &&
              usersLink.map((link, index) => {
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
                              <span>{link.title}</span>
                              <span>
                                <Edit2Icon
                                  className="edit-icon"
                                  onClick={() => updateLink(link.id)}
                                />
                              </span>
                              <span>{index}</span>
                            </p>
                            {/* <p>{link.id}</p> */}
                            <ToggleLeftIcon />
                          </div>
                          <div className="info-bottom-div">
                            <div>
                              {" "}
                              <a>{link.link}</a>
                              {/* <span>
                              <Edit2Icon className="edit-icon" />
                            </span> */}
                            </div>
                            <TrashIcon
                              className="trash-btn"
                              onClick={() => deleteLink(link.id)}
                            />
                          </div>
                        </form>
                      </div>
                    </div>
                    <div className="delete-notification">
                      <div className="delete-content">
                        <p>Delete Notification</p>
                        <div className="delete-button">
                          <button>Delete</button>
                          <button>Cancel</button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
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
