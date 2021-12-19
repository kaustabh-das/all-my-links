import React from "react";
import "./inputModel.scss";
import { Menu as MenuIcon } from "react-feather";
import { X as XIcon } from "react-feather";
// import { Button, Modal, Form } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";

const InputModel = (props) => {
  return (
    <div className="user-model">
      <div className="user-model-body">
        <div className="header-div">
          <h1>Usermodel</h1>
          <button
            className="input-close-btn"
            onClick={() => {
              props.setModalShow(false);
            }}
          >
            <XIcon />
          </button>
        </div>
        <div className="body-div">
          <form className="body-div-form">
            {/* <label>
              Title:
              <input type="text" name="title" />
            </label> */}
            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Title :
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="facebook"
              />
            </div>
            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Url :
              </label>
              <input
                type="text"
                className="form-control"
                // id="exampleFormControlInput1"
                placeholder="https://www.facebook.com/rasky.bro"
              />
            </div>
            {/* <label>
              Url:
              <input type="text" name="url" />
            </label> */}
            <div class="col-12">
              <button className="btn btn-primary" type="submit">
                Save
              </button>
            </div>
            {/* <input className="input-form-btn" type="submit" value="Submit" /> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default InputModel;
