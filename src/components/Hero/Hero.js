import React from "react";
import "./hero.css";
import HeroBg from "../../images/hero_bg.svg";
import HeroGirl from "../../images/hero-girl.svg";
import NavApp from "../../images/nav-app.svg";

const Hero = () => {
  return (
    <div className="hero-section">
      <div className="hero-section-left-div">
        <div className="hero-section-navbar">
          <p className="hero-section-logo">AfterClick</p>
          <div className="hero-section-app">
            <img style={{ marginRight: "0.5rem" }} src={NavApp} />
            <p>Our App</p>
          </div>
        </div>
        <div className="hero-section-content">
          <div>
            <p className="hero-section-content-header">
              Life <br /> Changing <br /> weight loss.
            </p>
            <p className="hero-section-content-desc">Tracking made easy</p>
            <div className="hero-section-button">
              <p>Start Now</p>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-section-right-div">
        <img
          // style={{ width: "100%", marginRight: "2rem" }}
          className="hero-section-img"
          src={HeroGirl}
        />
      </div>
    </div>
  );
};

export default Hero;
