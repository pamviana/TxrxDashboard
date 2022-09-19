import React from "react";
import ReactDOM from "react-dom";
import "./home_page.styles.css";
import backgroundImg from "../../../../public/TxRx_Data_Arrow_Rotated_Blue_Eye_shutterstock_221710816.svg";

function HomePage() {
  return (
    <section className="home-page-section">
      <div className="back-img" />
      <div className="home-page-wrapper">
        <h1>Welcome</h1>
      </div>
    </section>
  );
}

export default HomePage;

if (document.getElementById("home-page")) {
  ReactDOM.render(<HomePage />, document.getElementById("home-page"));
}
