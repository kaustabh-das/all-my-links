import React, { useState, useRef, useEffect } from "react";
import InputModel from "../../components/InputModel/InputModel";
import UpdateModel from "../../components/UpdateModel/UpdateModel";
import Layout from "../../components/Layout/Layout";
import MobileModel from "../../components/MobileModel/MobileModel";
import AdminLinkCard from "../../components/AdminLinkCard/AdminLinkCard";
// import Preview from "../../components/Preview/Preview";
import LoadingComp from "../../components/LoadingComp/LoadingComp";
import DeleteAlert from "../../components/DeleteAlert/DeleteAlert";
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
  onSnapshot,
} from "firebase/firestore";
// import { MoreVertical as MoreVerticalIcon } from "react-feather";
// import { ToggleLeft as ToggleLeftIcon } from "react-feather";
// import { Trash as TrashIcon } from "react-feather";
// import { Edit2 as Edit2Icon } from "react-feather";

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
  const [title, setTitle] = useState();
  const [previewShow, setPreviewShow] = useState(false);
  const [refreshPage, setRefreshPage] = useState(false);
  const [usersLink, setUsersLink] = useState([]);
  // const [usersInfo, setUsersInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteCard, setDeleteCard] = useState(false);
  // const [toggleBtn, setToggleBtn] = useState(false);

  // const toggleBtnFun = async (userId, status) => {
  //   // try {
  //   setLoading(true);
  //   // setToggleBtn(!toggleBtn);
  //   if (status) {
  //     const userDoc = doc(db, "users", currentUser.email, "user-links", userId);
  //     const newDBStatus = { status: false };
  //     await updateDoc(userDoc, newDBStatus);
  //     setRefreshPage(!refreshPage);
  //   } else {
  //     const userDoc = doc(db, "users", currentUser.email, "user-links", userId);
  //     const newDBStatus = { status: true };
  //     await updateDoc(userDoc, newDBStatus);
  //     setRefreshPage(!refreshPage);
  //   }
  //   // }
  //   // catch {
  //   //   setError("Something is went wrong....");
  //   // }
  //   setLoading(false);
  // };

  // const sensitiveBtnFun = async (userId, sensative) => {
  //   // try {
  //   setLoading(true);
  //   // setToggleBtn(!toggleBtn);
  //   if (sensative) {
  //     const userDoc = doc(db, "users", currentUser.email, "user-links", userId);
  //     const newDBSensative = { sensative: false };
  //     await updateDoc(userDoc, newDBSensative);
  //     setRefreshPage(!refreshPage);
  //   } else {
  //     const userDoc = doc(db, "users", currentUser.email, "user-links", userId);
  //     const newDBSensative = { sensative: true };
  //     await updateDoc(userDoc, newDBSensative);
  //     setRefreshPage(!refreshPage);
  //   }
  //   // }
  //   // catch {
  //   //   setError("Something is went wrong....");
  //   // }
  //   setLoading(false);
  // };

  // const updateLink = (userId) => {
  //   // console.log(userId);
  //   setLinkId(userId);
  //   setupdateModalShow(true);
  //   // console.log(updateModalShow);
  // };

  // const handelDelete = (id, title) => {
  //   setLinkId(id);
  //   setTitle(title);
  //   setDeleteCard(true);
  // };

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

  let firebaseLinkData = [];
  useEffect(() => {
    const getUsersLink = async () => {
      setLoading(true);
      const data = await getDocs(usersCollectionLinkRef);
      // console.log(data.docs);
      // setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
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

  // useEffect(() => {
  //   const getUsersLink = () => {
  //     setLoading(true);
  //     onSnapshot(
  //       collection(db, "users", currentUser.email, "user-links"),
  //       (querySnapshot) => {
  //         const items = [];
  //         querySnapshot.forEach((doc) => {
  //           items.push(doc.data());
  //         });
  //         setUsersLink(
  //           items.sort((a, b) => {
  //             return a.row_no - b.row_no;
  //           })
  //         );
  //       }
  //       // (error) => {
  //       //   // ...
  //       // }
  //     );
  //     setLoading(false);
  //   };
  //   getUsersLink();
  // }, []);

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
      {deleteCard && (
        <DeleteAlert
          onRequestClose={() => setDeleteCard(false)}
          setDeleteCard={setDeleteCard}
          refreshPage={refreshPage}
          setRefreshPage={setRefreshPage}
          linkId={linkId}
          title={title}
        />
      )}
      <div className="admin_page">
        <div className="admin-body">
          <div className="create-btn" onClick={(e) => setModalShow(true)}>
            Add New Link
          </div>
          <div className="info-parent-div">
            {usersLink &&
              usersLink.map((links, index) => {
                const { title, link, id } = links;
                return (
                  <>
                    {/* {console.log(id)} */}
                    <AdminLinkCard
                      key={id}
                      {...links}
                      refreshPage={refreshPage}
                      setRefreshPage={setRefreshPage}
                      setLoading={setLoading}
                      setLinkId={setLinkId}
                      setTitle={setTitle}
                      setDeleteCard={setDeleteCard}
                      setupdateModalShow={setupdateModalShow}
                    />
                  </>
                  // <div className="link-card">
                  //   <div key={index} className="info-div">
                  //     <div className="info-left-div">
                  //       <MoreVerticalIcon />
                  //     </div>
                  //     <div className="info-right-div">
                  //       <form>
                  //         <div className="info-top-div">
                  //           <p>
                  //             {/* <input
                  //             type="text"
                  //             value={link.title}
                  //             // ref={titleRef}
                  //             onChange={(e) =>
                  //               // console.log("jjo");
                  //               updateLink(index, e)
                  //             }
                  //           /> */}
                  //             <span>{link.title}</span>
                  //             <span>
                  //               <Edit2Icon
                  //                 className="edit-icon"
                  //                 onClick={() => updateLink(link.id)}
                  //               />
                  //             </span>
                  //             <span>{index}</span>
                  //             <span>{link.sensative}</span>
                  //           </p>

                  //           {/* <p>{link.id}</p> */}
                  //           <div className={`toggle-btn-${link.status}`}>
                  //             <ToggleLeftIcon
                  //               onClick={() =>
                  //                 toggleBtnFun(link.id, link.status)
                  //               }
                  //             />
                  //           </div>
                  //         </div>
                  //         <div className="info-bottom-div">
                  //           <div>
                  //             {" "}
                  //             <a>{link.link}</a>
                  //             <span> </span>
                  //             {/* <span>{link.id}</span> */}
                  //             {/* <span>
                  //             <Edit2Icon className="edit-icon" />
                  //           </span> */}
                  //           </div>
                  //           <div
                  //             style={{
                  //               border: "2px solid black",
                  //               width: "1.2rem",
                  //               height: "1.2rem",
                  //             }}
                  //             onClick={() =>
                  //               sensitiveBtnFun(link.id, link.sensative)
                  //             }
                  //             className={`sensative-content-${link.sensative}`}
                  //           >
                  //             {/* Checkbox: <input type="checkbox" id="myCheck" /> */}
                  //           </div>
                  //           <TrashIcon
                  //             // onClick={() => setDeleteCard(!deleteCard)}
                  //             onClick={() => handelDelete(link.id, link.title)}
                  //             className="trash-btn"
                  //           />
                  //         </div>
                  //       </form>
                  //     </div>
                  //   </div>
                  //   {/* <div className="delete-card"> */}
                  //   {/* {deleteCard && (

                  //   )} */}
                  //   {/* </div> */}
                  // </div>
                );
              })}
          </div>
          {/* <div className="admin_page-footer">
            <footer>AfterClick</footer>
          </div> */}
        </div>
        <div className="admin_page-footer">
          <footer>AfterClick</footer>
        </div>
        {windowDimensions.width < 700 && (
          <div onClick={() => setPreviewShow(true)} className="mobile-preview">
            <p>Preview</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Admin;
