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
          <div>{props.children}</div>
        </div>
        <div className="layout-body-right">
          <Preview />
        </div>
      </div>
    </div>
  );
};

export default Layout;
