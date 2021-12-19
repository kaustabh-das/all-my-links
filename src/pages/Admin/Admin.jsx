import React, { useState, useEffect } from "react";
import InputModel from "../../components/InputModel/InputModel";
import Layout from "../../components/Layout/Layout";
import MobileModel from "../../components/MobileModel/MobileModel";
// import Preview from "../../components/Preview/Preview";
import "./app.adminpage.scss";

import { MoreVertical as MoreVerticalIcon } from "react-feather";
import { ToggleLeft as ToggleLeftIcon } from "react-feather";
import { Trash as TrashIcon } from "react-feather";
import { Edit2 as Edit2Icon } from "react-feather";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Button, Modal } from "react-bootstrap";

const Admin = () => {
  const [modalShow, setModalShow] = useState(false);
  const [previewShow, setPreviewShow] = useState(false);

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  // let display_val=""

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    windowDimensions.width < 600 && setPreviewShow(false);
  }, [windowDimensions.width]);

  return (
    <Layout>
      {modalShow && (
        <InputModel
          onRequestClose={() => setModalShow(false)}
          setModalShow={setModalShow}
        />
      )}
      {previewShow && (
        <MobileModel
          onRequestClose={() => setPreviewShow(false)}
          setPreviewShow={setPreviewShow}
        />
      )}
      <div className="admin_page">
        <div className="admin-body">
          <div className="create-btn" onClick={() => setModalShow(true)}>
            Add New Link
          </div>

          <h1>Admin Page</h1>
          <div className="info-parent-div">
            <div className="info-div">
              <div className="info-left-div">
                <MoreVerticalIcon />
              </div>
              <div className="info-right-div">
                <div className="info-top-div">
                  <p>
                    <span>Facebook</span>
                    <span>
                      <Edit2Icon className="edit-icon" />
                    </span>
                  </p>
                  <ToggleLeftIcon />
                </div>
                <div className="info-bottom-div">
                  <p>
                    {" "}
                    <span>https://www.facebook.com/rasky.bro</span>
                    <span>
                      <Edit2Icon className="edit-icon" />
                    </span>
                  </p>
                  <TrashIcon className="trash-btn" />
                </div>
              </div>
            </div>
            {/* <div className="info-div">
              <div className="info-left-div"></div>
              <div className="info-right-div">
                <div className="info-top-div"></div>
                <div className="info-bottom-div"></div>
              </div>
            </div>
            <div className="info-div">
              <div className="info-left-div"></div>
              <div className="info-right-div">
                <div className="info-top-div"></div>
                <div className="info-bottom-div"></div>
              </div>
            </div>
            <div className="info-div">
              <div className="info-left-div"></div>
              <div className="info-right-div">
                <div className="info-top-div"></div>
                <div className="info-bottom-div"></div>
              </div>
            </div>
            <div className="info-div">
              <div className="info-left-div"></div>
              <div className="info-right-div">
                <div className="info-top-div"></div>
                <div className="info-bottom-div"></div>
              </div>
            </div> */}
          </div>
        </div>
        {windowDimensions.width < 600 && (
          <div onClick={() => setPreviewShow(true)} className="mobile-preview">
            <h2>Preview</h2>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Admin;
