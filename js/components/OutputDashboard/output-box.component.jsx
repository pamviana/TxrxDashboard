import React from "react";
import './output-dashboard.styles.css'

function OutputBox(props) {
  return (
    <>
      <div className="output-no-label-boxes">
        <p>{props.valueOutput} </p>
      </div>
    </>
  );
}

export default OutputBox;