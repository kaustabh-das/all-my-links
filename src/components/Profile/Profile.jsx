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
import LoadingComp from "../LoadingComp/LoadingComp";

const Profile = (props) => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const docId = "C44xAIt6sliUonB9Sh9R";
  const docId = props.username;
  // const links = useSelector((state) => state.userLinkReducer.links);
  // const info = useSelector((state) => state.userInfoReducer.info);

  const [usersLink, setUsersLink] = useState([]);
  // const [users, setUsers] = useState([]);
  const [usersInfo, setUsersInfo] = useState([]);
  const [loading, setLoading] = useState(false);

  const usersCollectionLinkRef = collection(db, "users", docId, "user-links");
  const usersCollectionInfoRef = collection(db, "users", docId, "user-info");

  // const createUser = async () => {
  //   await setDoc(
  //     doc(db, "users", "iam@gmail.com", "user-info", "LO77RLzKIcdhEXNA1oer"), // creating "iam@gmail.com" document_id manually.
  //     {
  //       name: "Los Angeles2",
  //       state: "CA",
  //       country: "USA",
  //     }
  //   );
  // };

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
      // console.log(firebaseLinkData);
      setUsersLink(
        firebaseLinkData.sort((a, b) => {
          return a.row_no - b.row_no;
        })
      );
      setLoading(false);
    };

    const getUsersInfo = async () => {
      setLoading(true);
      const data = await getDocs(usersCollectionInfoRef);
      setUsersInfo(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoading(false);
    };

    getUsersLink();

    getUsersInfo();
    // console.log(usersLink[0].status);
  }, []);

  return (
    <div className="profile">
      {loading && <LoadingComp style={"loading-comp-profile"} />}
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
      {usersInfo &&
        usersInfo.map((user, index) => {
          return (
            <div key={index}>
              <h3>Username: {user.username}</h3>
              <p>Email: {user.email}</p>
            </div>
          );
        })}
      {usersLink &&
        usersLink.map((link, index) => {
          // <p>Sensative Content: {link.sensative}</p>;
          if (link.status) {
            return (
              // {for (let i = 1; i<){
              <div key={index} style={{ margin: "1rem" }}>
                <h3>Title: {link.title}</h3>
                <a target="_blank" href={link.link}>
                  link: {link.link}
                </a>
                {/* <a target="_blank" href={link.link} /> */}
                <p>Row_no: {link.row_no}</p>
                {link.sensative && <p>Sensative Content: {link.sensative}</p>}
                {/* {console.log("hhioj")} */}
              </div>
              // }}
            );
          }
        })}
      {/* <button onClick={createUser}> Create User</button> */}
    </div>
  );
};

export default Profile;
