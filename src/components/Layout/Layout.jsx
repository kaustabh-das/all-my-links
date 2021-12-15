import React from "react";
import "./layout.scss";
import Navbar from "../Navbar/Navbar";
import Preview from "../Preview/Preview";
import Mypic from "../../assets/kd.jpeg";

const Layout = (props) => {
  return (
    <div className="layout">
      <Navbar />
      <div className="layout-body">
        <div className="layout-body-left">
          <div className="body-header">
            <div className="user-details">
              <img className="user-img" src={Mypic} />
              <p className="user-name">@username</p>
            </div>
          </div>
          <div className="body-main">{props.children}</div>
        </div>
        <div className="layout-body-right">
          <div className="preview-body">
            <div className="my-link">
              <p>
                My Link:<span> </span>
                <a href="http://localhost:3000/rasky" target="_blank">
                  http://localhost:3000/rasky
                </a>
              </p>
            </div>
            <div className="preview-body">
              <Preview />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
