import React from "react";
import "./login.styles.css";
import ReactDOM from "react-dom";
import LoginForm from "./LoginForm/login_form.component";

function Login() {
    
  return (
    <div className="login-page">
      <LoginForm />
    </div>
  );
}

export default Login;

if (document.getElementById("login")) {
  ReactDOM.render(<Login />, document.getElementById("login"));
}




