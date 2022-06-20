import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; //useNavigate hook is the new replacement for the useHistory hook in reach v6 update.
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
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import ProfileComp from "../../components/Profile/Profile";
import Error from "../Error/Error";
import LoadingComp from "../../components/LoadingComp/LoadingComp";
import "./app.profile.scss";

const Profile = () => {
  const { username } = useParams();
  const [allUsername, setAllUsername] = useState([]);
  const [usernameData, setUsernameData] = useState();
  const [loading, setLoading] = useState();
  let lowercase_username = username.toLowerCase();

  // const users = [
  //   "rasky",
  //   "sima",
  //   "akankshya",
  //   "biswajit",
  //   "gurjyot",
  //   "abc@gmail.com",
  // ];
  const userNameRef = collection(db, "usernameDB");

  // let find_user;
  // let searchresult;

  // const showData = () => {
  //   console.log(items);
  //   console.log(usernameData);
  // };

  useEffect(() => {
    let items = [];

    const getUserNames = async () => {
      setLoading(true);
      const data = await getDocs(userNameRef);
      items = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setAllUsername(items);
      // console.log(lowercase_username);
      console.log(items);
      const searchresult = items.find((x) => x.username === lowercase_username);
      // console.log(searchresult);
      setUsernameData(searchresult);
      // console.log(usernameData);
      if (searchresult) {
        console.log(searchresult.username, searchresult.email);
      } else {
        console.log("error page");
      }
      setLoading(false);
    };
    getUserNames();
    // showData();
  }, []);

  // useEffect(() => {
  //   console.log(lowercase_username);
  //   console.log(allUsername);
  //   find_user = allUsername.includes(lowercase_username); // includes() method always return a boolean value.
  //   console.log(find_user);
  // }, []);

  return (
    <div className="profile-page">
      {loading && <LoadingComp style={"loading-comp-profile"} />}
      {usernameData ? (
        <ProfileComp
          email={usernameData.email}
          username={usernameData.username}
        />
      ) : (
        <Error />
      )}
    </div>
  );
};

export default Profile;
