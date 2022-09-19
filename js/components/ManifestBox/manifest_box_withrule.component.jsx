import React, { useEffect, useState } from "react";
import "./manifest_box.styles.css";

function ManifestBoxWithRule({ valueOutput, label, issueColor }) {  

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     console.log("inside component: ", manifestArray)
  //     setManifestValue((currValue) => {
  //       return [...currValue.slice(1, 6), valueOutput];
  //     });
  //     console.log("manifest value: ", manifestValue);
  //     checkManifestValue();
  //   }, 5000); /* The graph is rendered every 5 seconds */
  //   return () => clearInterval(interval);
  // }, [issueColor]);

  return (
    <div className="manifest__wrapper">
      <div className={`manifest_test output-boxes ${issueColor}`}>
        <label>{label}</label>
        <p>{valueOutput}</p>
      </div>
    </div>
  );
}

export default ManifestBoxWithRule;
