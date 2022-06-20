import React from "react";
import "./section3.css";
import BottomImg from "../../images/section3-bottom-img.svg";
import MainImg from "../../images/section3-main-img.svg";

const Section3 = () => {
  return (
    <div className="section3">
      <div className="section3-top-div">
        <div className="section3-left-div">
          <div className="section3-left-inner-div">
            <p className="section3-header">
              Calories <br /> tracking.
            </p>
            <p className="section3-desc">
              Our Well Balanced goal is the one <br />
              we recommend for most people. <br />
              However, if you have specific <br />
              dietary requirements.
            </p>
            <div className="section3-button">
              <p>App Store</p>
            </div>
          </div>
        </div>
        <div className="section3-right-div">
          <div className="section3-main-img">
            {/* <img className="main-img" src={MainImg} /> */}
          </div>
        </div>
      </div>
      <div className="section3-buttom-div">
        <img className="section3-buttom-img" src={BottomImg} />
      </div>
    </div>
  );
};

export default Section3;
