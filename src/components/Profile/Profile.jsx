import React from "react";
import { useNavigate, useParams } from "react-router-dom"; //useNavigate hook is the new replacement for the useHistory hook in reach v6 update.
import "./comp.profile.scss";

const Profile = (props) => {
  const navigate = useNavigate();
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
    </div>
  );
};

export default Profile;
