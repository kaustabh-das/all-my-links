import React from "react";
import { useNavigate, useParams } from "react-router-dom"; //useNavigate hook is the new replacement for the useHistory hook in reach v6 update.
import ProfileComp from "../../components/Profile/Profile";
import Error from "../Error/Error";
import "./app.profile.scss";

const Profile = () => {
  const { username } = useParams();
  let lowercase_username = username.toLowerCase();
  const users = ["rasky", "sima", "akankshya", "biswajit", "gurjyot"];
  let find_user = users.includes(lowercase_username); // includes() method always return a boolean value.
  console.log(find_user);
  return (
    <div className="profile-page">
      {/* {find_user ? <ProfileComp username={lowercase_username} /> : <Error />} */}
      {lowercase_username ? (
        <ProfileComp username={lowercase_username} />
      ) : (
        <Error />
      )}
    </div>
  );
};

export default Profile;
