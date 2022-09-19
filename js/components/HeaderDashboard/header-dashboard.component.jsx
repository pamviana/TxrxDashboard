import React from "react";
import "./header.styles.css";

function HeaderDashboard() {
  return (
    <header className="header-dashboard">
      <div className="logo-dashboard">
      <a href="https://www.txrxdata.com/">
        <img
          src="https://www.txrxdata.com/wp-content/uploads/2021/09/TxRxdata_draft_logo_5.svg"
          alt="Website logo to txrxdata.com"
          loading="logo"
        ></img></a>
      </div>
      <div className="title-dashboard">
        <h1>
          OTT Monitor
          <br /> Demo Dashboard
        </h1>
      </div>
    </header>
  );
}

export default HeaderDashboard;
