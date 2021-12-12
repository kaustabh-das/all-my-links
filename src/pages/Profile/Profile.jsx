import React from "react";
import { useNavigate, useParams } from "react-router-dom"; //useNavigate hook is the new replacement for the useHistory hook in reach v6 update.
import ProfileComp from "../../components/Profile/Profile";
import Error from "../Error/Error";
import "./app.profile.scss";

const Profile = () => {
  const { username } = useParams();
  const users = ["rasky", "sima", "akankshya", "biswajit", "gurjyot"];
  let user_len = users.length;
  for (let i = 0; i < user_len; i++) {
    console.log(users[i]);
  }
  let find_user = users.includes(username);
  console.log(find_user);
  return (
    <div className="profile-page">
      {find_user ? <ProfileComp username={username} /> : <Error />}
    </div>
  );
};

export default Profile;
