import React from "react";
import { useNavigate, useParams } from "react-router-dom"; //useNavigate hook is the new replacement for the useHistory hook in reach v6 update.
import "./app.profile.scss";

const Profile = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const users = ["rasky", "sima", "akankshya", "biswajit", "gurjyot"];
  let user_len = users.length;
  return (
    <div className="profile-page">
      <h1>This is {username}</h1>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Change to home page
      </button>
    </div>
  );
};

export default Profile;
