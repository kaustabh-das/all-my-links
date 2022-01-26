import React, { useState, useRef, useEffect } from "react";
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
import { debounce } from "lodash";

const Admin = () => {
  let firebaseLinkData = [];
  const { currentUser, logout } = useAuth();
  const dispatch = useDispatch();
  const [firebaseLinkArr, setFirebaseLinkArr] = useState();
  // const links = useSelector((state) => state.userLinkReducer.links);
  firebaseLinkData = useSelector((state) => state.userLinkReducer.links);
  // const info = useSelector((state) => state.userInfoReducer.info);

  // const titleRef = useRef();
  // const linkRef = useRef();

  const [modalShow, setModalShow] = useState(false);
  const [previewShow, setPreviewShow] = useState(false);
  const [refreshPage, setRefreshPage] = useState(false);

  const updateLink = (index, e) => {
    let newTitle = e.target.value;
    let linkId = firebaseLinkArr[index].id;
    // firebaseLinkArr[index].title = title;
    const id = firebaseLinkData[index].id;
    // setFirebaseLinkArr({
    //   ...firebaseLinkArr,
    //   index: { ...firebaseLinkArr[index], title: newTitle },
    // });
    // setFirebaseLinkArr( [...firebaseLinkArr, firebaseLinkArr[index]{title: newTitle}] );
    firebaseLinkArr &&
      firebaseLinkArr.map(async (arrLinks) => {
        if (arrLinks.id === linkId) {
          // firebaseLinkArr[index].title = newTitle;
          // {
          //   ...firebaseLinkArr,
          //   index: { ...firebaseLinkArr[index], title: newTitle },
          // }
          console.log(firebaseLinkArr[index]);
          const userDoc = doc(db, "users", currentUser.email, "user-links", id);
          const newDBTitle = { title: newTitle };
          await updateDoc(userDoc, newDBTitle);

          setRefreshPage(!refreshPage);
          console.log(arrLinks.title);
        } else {
          console.log("no");
        }
        // ? { ...arrLinks, title: newTitle }
        // : console.log("no");
        console.log(arrLinks.id);
        console.log(linkId);
      });
    // console.log(firebaseLinkArr[index].title);
    console.log(firebaseLinkArr);
    // const id = firebaseLinkData[index].id;
    // const userDoc = doc(db, "users", currentUser.email, "user-links", id);
    // const newTitle = { title: title };
    // await updateDoc(userDoc, newTitle);
    // setRefreshPage(!refreshPage);
  };

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

    // setUsersLink(
    //   firebaseLinkData.sort((a, b) => {
    //     return a.row_no - b.row_no;
    //   })
    // );
  }, [refreshPage]);

  useEffect(() => {
    // setFirebaseLinkData(links);
    // firebaseLinkData.push(...links);
    // console.log(firebaseLinkData[0]);
    // firebaseLinkData[0].title = "hjhj";
    console.log(firebaseLinkData[0]);
    setFirebaseLinkArr(firebaseLinkData);
    console.log(firebaseLinkArr);
  }, [firebaseLinkData]);

  return (
    <Layout>
      {modalShow && (
        <InputModel
          onRequestClose={() => setModalShow(false)}
          setModalShow={setModalShow}
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

          <h1>Admin Page</h1>
          <div className="info-parent-div">
            {firebaseLinkArr &&
              firebaseLinkArr.map((link, index) => {
                return (
                  <div key={index} className="info-div">
                    <div className="info-left-div">
                      <MoreVerticalIcon />
                    </div>
                    <div className="info-right-div">
                      <form>
                        <div className="info-top-div">
                          <p>
                            <input
                              type="text"
                              value={link.title}
                              // ref={titleRef}
                              onChange={(e) =>
                                // console.log("jjo");
                                updateLink(index, e)
                              }
                            />
                            <span>
                              <Edit2Icon className="edit-icon" />
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
                            <span>
                              <Edit2Icon className="edit-icon" />
                            </span>
                          </div>
                          <TrashIcon
                            className="trash-btn"
                            onClick={() => deleteLink(link.id)}
                          />
                        </div>
                      </form>
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
