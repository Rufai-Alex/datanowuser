import React from "react";
import LoadingSVG from "./loading.svg";
import "./Loading.css";
function Loading() {
  return (
    <div id="loading-component">
      <img src={LoadingSVG} alt="loading.." />
    </div>
  );
}

export default Loading;
