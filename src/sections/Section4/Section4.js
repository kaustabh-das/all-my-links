import React from "react";
import "./section4.css";
import SectionImg from "../../images/section4-img.svg";

export const Section4 = () => {
  return (
    <div className="section4">
      <div className="section4-left-div">
        <div className="section4-inner-div">
          <p className="section4-left-div-header">
            Join free <br /> for 7 days
          </p>
          <div className="section4-buttom">App Store</div>
        </div>
      </div>
      <div className="section4-right-div">
        <img
          //   style={{ width: "50%" }}
          className="section4-right-div-img"
          src={SectionImg}
        />
      </div>
    </div>
  );
};
