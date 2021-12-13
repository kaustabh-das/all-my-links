import React from "react";
import "./preview.scss";
import mypic from "../../assets/kd.jpeg";

const Preview = () => {
  return (
    <div className="preview">
      <div className="my-link">
        <p>
          My Link:<span> </span>
          <a href="http://localhost:3000/rasky" target="_blank">
            http://localhost:3000/rasky
          </a>
        </p>
      </div>
      <div className="preview-body">
        <div className="preview-items">
          {/* <h1>Preview</h1> */}
          <img className="user-img" src={mypic} alt="user image" />
          <p className="user-name">@username</p>
          <p className="user-bio">This is my bio.</p>
          <div className="user-links">
            <p>Instagram</p>
          </div>
          <div className="user-links">
            <p>Instagram2</p>
          </div>
          <div className="user-links">
            <p>Instagram3</p>
          </div>
          <div className="user-links">
            <p>Instagram4</p>
          </div>
          <div className="user-links">
            <p>Instagram5</p>
          </div>
          <div className="user-links">
            <p>Instagram6</p>
          </div>
          <div className="user-links">
            <p>Instagram7</p>
          </div>
          <div className="user-links">
            <p>Instagram8</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
