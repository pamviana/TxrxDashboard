import React, { useEffect } from "react";
import "./thumbnail-dashboard.styles.css";

function ThumbnailDashboard(props) {


  return (
    <div className="thumbnail-dashboard-container">
      <label> {props.label} </label>
      <div className="thumbnail-picture">
        <img
          id="thumb-img"
          src={props.thumbValue}
          alt="live thumb3"
        />
      </div>
    </div>
  );
}

export default ThumbnailDashboard;
