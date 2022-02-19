import React from "react";

const ProfileLinkCard = ({ title, link, sensative, status }) => {
  return (
    <div style={{ margin: "1rem" }}>
      <h3>Title: {title}</h3>
      <a target="_blank" href={link}>
        link: {link}
      </a>
      {/* <a target="_blank" href={link.link} /> */}
      {/* <p>Row_no: {row_no}</p> */}
      {sensative && <p>Sensative Content: {sensative}</p>}
      {/* {console.log("hhioj")} */}
    </div>
  );
};

export default ProfileLinkCard;
