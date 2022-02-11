import React, { useState, useRef, useEffect } from "react";
import "./loadingComp.scss";

const LoadingComp = (props) => {
  useEffect(() => {
    console.log(props.style);
  }, []);
  return (
    <div className={props.style}>
      <div>
        <p>loading...</p>
      </div>
    </div>
  );
};

export default LoadingComp;
