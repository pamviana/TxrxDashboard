import React from "react";
import ReactDOM from "react-dom";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "../Login/Login";
import "./welcome_page.styles.css";

function WelcomePage() {
  return (
    <section className="welcome-page-section">
      <div className="back-img" />
      <div className="welcome-page-wrapper">
        <h1>Welcome to Assistir</h1>
        <p> This is page is under construction</p>
      </div>
    </section>
  );
}

export default WelcomePage;

if (document.getElementById("welcome-page")) {
  ReactDOM.render(<WelcomePage />, document.getElementById("welcome-page"));
}
