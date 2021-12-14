import React from "react";
import "./inputModel.scss";
// import { Button, Modal, Form } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";

const InputModel = (props) => {
  return (
    <div className="user-model">
      <div className="user-model-body">
        <h1>Usermodel</h1>
        <button
          onClick={() => {
            props.setModalShow(false);
          }}
        >
          close
        </button>
      </div>
    </div>
  );
};

export default InputModel;
