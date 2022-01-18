import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; //useNavigate hook is the new replacement for the useHistory hook in reach v6 update.
import "./comp.profile.scss";
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
import { getLinks, getUserInfo } from "../../actions/index";

const Profile = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const docId = "C44xAIt6sliUonB9Sh9R";
  const docId = props.username;
  const links = useSelector((state) => state.userLinkReducer.links);
  const info = useSelector((state) => state.userInfoReducer.info);

  const [usersLink, setUsersLink] = useState([]);
  // const [users, setUsers] = useState([]);
  // const [usersInfo, setUsersInfo] = useState([]);

  // const usersCollectionLinkRef = collection(db, "users", docId, "user-links");
  // const usersCollectionInfoRef = collection(db, "users", docId, "user-info");

  // const usersCollectionRef = db
  //   .collection("users")
  //   .doc("C44xAIt6sliUonB9Sh9R")
  //   .collection("user-info")
  //   .get();

  const createUser = async () => {
    await setDoc(
      doc(db, "users", "iam@gmail.com", "user-info", "LO77RLzKIcdhEXNA1oer"), // creating "iam@gmail.com" document_id manually.
      {
        name: "Los Angeles2",
        state: "CA",
        country: "USA",
      }
    );
  };

  // useEffect(() => {
  //   const getUsersLink = async () => {
  //     const data = await getDocs(usersCollectionLinkRef);
  //     // console.log(data.docs);
  //     // setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //     let firebaseLinkData = [];
  //     firebaseLinkData = data.docs.map((doc) => ({
  //       ...doc.data(),
  //       id: doc.id,
  //     }));
  //     // console.log(firebaseLinkData);
  //     setUsers(
  //       firebaseLinkData.sort((a, b) => {
  //         return a.row_no - b.row_no;
  //       })
  //     );
  //   };

  //   const getUsersInfo = async () => {
  //     const data = await getDocs(usersCollectionInfoRef);
  //     setUsersInfo(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //   };

  //   getUsersLink();

  //   getUsersInfo();
  // }, []);

  // let firebaseLinkData = [];
  useEffect(() => {
    // setPage(useSelector((state) => state.changeThePage))
    dispatch(getLinks(docId));
    dispatch(getUserInfo(docId));

    // firebaseLinkData.push(...links);

    // setUsersLink(
    //   firebaseLinkData.sort((a, b) => {
    //     return a.row_no - b.row_no;
    //   })
    // );
    // console.log(links[0]);
  }, []);

  return (
    <div className="profile">
      <h1>This is {props.username}</h1>
      <button
        onClick={() => {
          //   navigate("/"); // Redirecting to home page.
          //   navigate(1); // Redirecting to next page.
          navigate(-1); // Redirecting to previous page.
        }}
      >
        Change to home page
      </button>
      {info &&
        info.map((user, index) => {
          return (
            <div>
              <h3 key={index}>Username: {user.username}</h3>
              <p key={index}>Email: {user.email}</p>
            </div>
          );
        })}
      {links &&
        links.map((user, index) => {
          return (
            // {for (let i = 1; i<){
            <div style={{ margin: "1rem" }}>
              <h3 key={index}>Title: {user.title}</h3>
              <p key={index}>link: {user.link}</p>
              <p key={index}>Row_no: {user.row_no}</p>
            </div>
            // }}
          );
        })}
      {/* <button onClick={createUser}> Create User</button> */}
    </div>
  );
};

export default Profile;
