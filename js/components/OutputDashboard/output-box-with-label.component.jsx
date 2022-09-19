import React from "react";
import "./output-dashboard.styles.css";

function OutputBoxWithLabel({label, valueOutput, valueFontSize}) {

 
  return (
    <div className="output-container">
      <div className="output-boxes" >
      <label> {label} </label>
        <p><span> {valueOutput} </span></p>
      </div>
    </div>
  );
}

export default OutputBoxWithLabel;
