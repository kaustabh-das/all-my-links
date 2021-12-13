import React from "react";
import "./layout.scss";
import Navbar from "../Navbar/Navbar";
import Preview from "../Preview/Preview";

const Layout = (props) => {
  return (
    <div className="layout">
      <Navbar />
      <div className="layout-body">
        <div className="layout-body-left">{props.children}</div>
        <div className="layout-body-right">
          <Preview />
        </div>
      </div>
    </div>
  );
};

export default Layout;
