import React from "react";
import "./mobilemodel.scss";
import Preview from "../Preview/Preview";

const MobileModel = (props) => {
  return (
    <div className="mobile-model">
      {/* <button
        onClick={() => {
          props.setPreviewShow(false);
        }}
      >
        Close
      </button> */}
      <Preview setPreviewShow={props.setPreviewShow} display={true} />
    </div>
  );
};

export default MobileModel;
