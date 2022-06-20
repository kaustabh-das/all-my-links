import React from "react";
import "./section1.css";
import Section1Img from "../../images/section1-img.svg";

const Section1 = () => {
  return (
    <div className="section1">
      <div className="section1-left">
        <div className="section1-left-circle">
          {/* <img className="section1-img" src={Section1Img} /> */}
        </div>
      </div>
      <div className="section1-right">
        <p className="section1-header">
          Set your <br /> own targets.
        </p>
        <p className="section1-desc">
          Our Well Balanced goal is the one <br />
          we recommend for most people. <br />
          However,if you have specific <br />
          dietary requirements
        </p>
        <div className="section1-buttom">
          <p>App Store</p>
        </div>
      </div>
    </div>
  );
};

export default Section1;
