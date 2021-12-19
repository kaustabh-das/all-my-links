import React from "react";
import Layout from "../../components/Layout/Layout";
import Navbar from "../../components/Navbar/Navbar";
import "./settings.scss";

const Settings = () => {
  return (
    // <Layout>
    //   <div className="settings_page">
    //     <h1>Settings Page</h1>
    //   </div>
    // </Layout>
    <div className="setting-page">
      <Navbar />
      <div className="setting-main-page">
        <h3>Setting</h3>
        <div className="setting-info-body">
          <div className="mb-3">
            <label
              for="exampleFormControlInput1"
              className="form-label setting-title"
            >
              Username :
            </label>
            <input
              type="text"
              className="form-control input-width"
              id="exampleFormControlInput1"
              placeholder="rasky"
            />
          </div>
          <div className="mb-3">
            <label
              for="exampleFormControlInput1"
              className="form-label setting-title"
            >
              Bio :
            </label>
            <input
              type="text"
              className="form-control input-width"
              id="exampleFormControlInput1"
              placeholder="Enter your bio.."
            />
          </div>
          <div className="mb-3">
            <label
              for="exampleFormControlInput1"
              className="form-label setting-title"
            >
              Name :
            </label>
            <input
              type="text"
              className="form-control input-width"
              id="exampleFormControlInput1"
              placeholder="Kaustabh Das"
            />
          </div>
          <div className="mb-3">
            <label
              for="exampleFormControlInput1"
              className="form-label setting-title"
            >
              Email :
            </label>
            <input
              type="email"
              className="form-control input-width"
              id="exampleFormControlInput1"
              placeholder="jone@email.com"
            />
          </div>
          <div className="mb-3">
            <label
              for="exampleFormControlInput1"
              className="form-label setting-title"
            >
              Phone no:
            </label>
            <input
              type="number"
              className="form-control input-width"
              id="exampleFormControlInput1"
              placeholder="Enter your phone no..."
            />
          </div>
          <div class="col-12 ">
            <button className="btn btn-primary setting-btn" type="submit">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
