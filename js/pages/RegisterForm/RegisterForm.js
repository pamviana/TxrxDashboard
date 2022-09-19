import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./register_form.styles.css";
import '../Login/LoginForm/login_form.styles.css';
import '../Login/login.styles.css';

function RegisterForm() {
  const [emailRegister, setEmailRegister] = useState("");
  const [nameRegister, setNameRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");
  const [confirmPasswordRegister, setConfirmPasswordRegister] = useState("");

  return (
    <main className="login-page">
      <div className="login-box">
        <img
          id="logo"
          alt="logo"
          src="https://www.txrxdata.com/wp-content/uploads/2021/09/TxRxdata_draft_logo_5.svg"
        ></img>
        <form className="login-form">
          <h1>Register</h1>
          <div className="inputs-container" id="inputs-container-register">
            <label htmlFor="name-register">
              Name
            </label>
            <input
              name="name-register"
              id="name-input"
              type="text"
              placeholder="Name"
              value={nameRegister}
              required
              onChange={(e) => setNameRegister(e.target.value)}
            />
            <label htmlFor="email-register">
              Email
            </label>
            <input
              name="email-register"
              id="email-input-register"
              type="email"
              placeholder="Email"
              value={emailRegister}
              required
              onChange={(e) => setEmailRegister(e.target.value)}
            />
            <label htmlFor="password-register">
              Password
            </label>
            <input
              name="password-register"
              id="password-register"
              type="password"
              placeholder="Password"
              value={passwordRegister}
              required
              onChange={(e) => setPasswordRegister(e.target.value)}
            />

            <label htmlFor="confirm-password-register">
              Confirm Password
            </label>
            <input
              name="confirm-password-register"
              id="password"
              type="password"
              placeholder="Confirm Password"
              value={confirmPasswordRegister}
              required
              onChange={(e) => setConfirmPasswordRegister(e.target.value)}
            />
          </div>

          <button id="button-login">
            Register
          </button>
        </form>
      </div>
    </main>
  );
}

export default RegisterForm;
if (document.getElementById("register")) {
  ReactDOM.render(<RegisterForm />, document.getElementById("register"));
}