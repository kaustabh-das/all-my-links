import React from "react";
import "./inputModel.scss";
// import { Button, Modal, Form } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";

const InputModel = (props) => {
  return (
    <div className="user-model">
      <div className="user-model-body">
        <div className="header-div">
          <h1>Usermodel</h1>
          <button
            onClick={() => {
              props.setModalShow(false);
            }}
          >
            close
          </button>
        </div>
        <div className="body-div">
          <form>
            <label>
              Title:
              <input type="text" name="title" />
            </label>
            <label>
              Url:
              <input type="text" name="url" />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default InputModel;
