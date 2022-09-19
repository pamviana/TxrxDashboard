import React, { useEffect, useState } from "react";
import "./audioLevels.styles.css";

function AudioLevelsDashboard(props) {
  const [colorR, setColorR] = useState(white)
  const [colorL, setColorL] = useState(white)
  const green = "#7ed834";
  const red= "#ff4141";
  const yellow="#d8c734";
  const white='#f8f8f8';

  useEffect(()=> {
    let valueR= props.valueOutputR;
    let valueL= props.valueOutputL;

    function valueOutputColorR() {
      if ( valueR => 0 && valueR <= 0.2) {
        setColorR(yellow);      
      }
      if (valueR > 0.2 && valueR <= 0.8) {
        setColorR(green);
      }
      if (valueR > 0.8 && valueR <= 1) {
        setColorR(red);
      }
    } 

    function valueOutputColorL() {
      if ( valueL => 0 && valueL <= 0.2) {
        setColorL(yellow);      
      }
      if (valueL > 0.2 && valueL <= 0.8) {
        setColorL(green);
      }
      if (valueL > 0.8 && valueL <= 1) {
        setColorL(red);
      }
    } 

    valueOutputColorR();
    valueOutputColorL();
    

  }, [props.valueOutputL, props.valueOutputR])


  return (
    <div className="audio-levels-container output-container">
      <div className="audio-levels-output output-boxes">
        <div className="audio-labels">
          <label>L</label>
          <label>Audio Levels</label>
          <label>R</label>
        </div>
        <div className="audio-values">
          <p>{props.valueOutputL}</p>
          <p>{props.valueOutputR}</p>
        </div>
      </div>
    </div>
  );
}


export default AudioLevelsDashboard;
