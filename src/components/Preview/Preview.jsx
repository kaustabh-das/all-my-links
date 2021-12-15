import React from "react";
import "./preview.scss";
import mypic from "../../assets/kd.jpeg";

const Preview = (props) => {
  return (
    <div className="preview-items">
      {/* <h1>Preview</h1> */}
      {props.display && (
        <div
          className="close-btn"
          onClick={() => {
            props.setPreviewShow(false);
          }}
        >
          <h2>Close</h2>
        </div>
      )}

      <img className="preview-user-img" src={mypic} alt="user image" />
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
  );
};

export default Preview;
