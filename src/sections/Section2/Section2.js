import React from "react";
import "./section2.css";
import BananaImg from "../../images/banana.svg";
import File1 from "../../images/file1.svg";
import File2 from "../../images/file2.svg";
import File3 from "../../images/file3.svg";
import File4 from "../../images/file4.svg";
import Percentage from "../../images/percentage.svg";
import Scanner from "../../images/scanner.svg";

const Section2 = () => {
  return (
    <div className="section2">
      <div className="section2-body">
        <div className="section2-left">
          <div className="section2-left-header">
            <p>
              Track <br />
              anywhere, <br />
              anytime.
            </p>
          </div>
          <div className="section2-upperimg-div">
            <div className="section2-upperimg-img1">
              <img className="banana-img" src={File1} />
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#0B0736",
                }}
              >
                Bannana
              </p>
              <p
                style={{
                  fontSize: "12px",
                  marginTop: "0.3rem",
                }}
              >
                Without skin
              </p>
            </div>
            <div className="section2-upperimg-img2">
              <img className="banana-img" src={File2} />
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#0B0736",
                }}
              >
                Bannana
              </p>
              <p
                style={{
                  fontSize: "12px",
                  marginTop: "0.3rem",
                }}
              >
                Without skin
              </p>
            </div>
          </div>
          <div className="section2-lowerimg-div">
            <div className="section2-upperimg-img1">
              <img className="banana-img" src={File3} />
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#0B0736",
                }}
              >
                Bannana
              </p>
              <p
                style={{
                  fontSize: "12px",
                  marginTop: "0.3rem",
                }}
              >
                Without skin
              </p>
            </div>
            <div className="section2-upperimg-img2">
              <img className="banana-img" src={File4} />
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#0B0736",
                }}
              >
                Bannana
              </p>
              <p
                style={{
                  fontSize: "12px",
                  marginTop: "0.3rem",
                }}
              >
                Without skin
              </p>
            </div>
          </div>
        </div>
        <div className="section2-right">
          <p className="section2-header">
            Over 250000 foods with photos.
            <br /> Plus barcode scanning App.
          </p>
          <div className="section2-right-div1">
            <div className="section2-right-img1">
              <img src={Percentage} />
            </div>
            <div className="section2-right-desc">
              <p className="section2-right-desc-header">Our Well Balanced</p>
              <p className="section2-right-desc-p">
                Goal is the one we recommend for most people.
                <br /> However, if you have specific dietary requirements.
              </p>
            </div>
          </div>
          <div className="section2-right-div2">
            <div className="section2-right-img2">
              <img src={Scanner} />
            </div>
            <div className="section2-right-desc">
              <p className="section2-right-desc-header">Barcode Scanner</p>
              <p className="section2-right-desc-p">
                App on your phone or tablet. Or keep a food diary online <br />{" "}
                via the website - whichever suits you best.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section2;
