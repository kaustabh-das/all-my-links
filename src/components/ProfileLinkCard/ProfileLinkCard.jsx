import React from "react";
import "./comp.profilelinkcard.scss";

const ProfileLinkCard = ({
  title,
  link,
  id,
  sensative,
  status,
  theme,
  setSensitiveContent,
  setProfileLinkCardId,
}) => {
  // console.log(title);
  const openInNewTab = (url) => {
    if (sensative) {
      setSensitiveContent(true);
      setProfileLinkCardId(id);
    } else {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="profile-link-card-container">
      <div
        className={`profile-link-card-${theme}`}
        onClick={() => openInNewTab(link)}
      >
        <p className="profile-link-card-title">{title}</p>
        {/* {sensative && <p>Warning</p>} */}
      </div>
    </div>
  );
};

export default ProfileLinkCard;
