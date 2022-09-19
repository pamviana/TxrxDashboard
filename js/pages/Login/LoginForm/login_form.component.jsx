import React, { useEffect, useState} from "react";
import "./login_form.styles.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [tokenLogin, setTokenLogin] = useState(
    document.querySelector('meta[name="csrf-token"]').content
  );
  const [errorLogin, setErrorLogin] = useState("");
    const navigate = useNavigate();


  useEffect(() => {
  }, [tokenLogin, errorLogin]);

  const handleSubmit = async (e) => { //AUTHENTICATION POST
    e.preventDefault();

    const loginInfo = JSON.stringify({ 
      email: `${emailLogin}`,
      password: `${passwordLogin}`      
    });

    let loginHeaders = {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        "Content-Type": "application/json",
        'X-CSRF-TOKEN': `${tokenLogin}`
      },
    };
    axios
      .post("https://assistir.cloud/login", loginInfo, loginHeaders)
      .then((resp) => {
        console.log("response: ", resp.message);
        setErrorLogin("");
        navigate('/mon');
      })
      .catch((error) => {
        console.log("ERROR: ", error.response)
        setErrorLogin(error.response.data.errors.email[0])        
      });

      

    setEmailLogin(""); //Clearing input on submission
    setPasswordLogin(""); //Clearing input on submission
  };

  return (
    <div className="login-box">
      <img
        id="logo"
        alt="logo"
        src="https://www.txrxdata.com/wp-content/uploads/2021/09/TxRxdata_draft_logo_5.svg"
      ></img>
      <h1>Log In</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="inputs-container">
          <label htmlFor="email">
            Email
          </label>
          <input
            name="email"
            id="email-input"
            type="email"
            value={emailLogin}
            onChange={(e) => setEmailLogin(e.target.value)}
          />
          <label htmlFor="password">
            Password
          </label>
          <input
            name="password"
            id="password"
            type="password"
            value={passwordLogin}
            onChange={(e) => setPasswordLogin(e.target.value)}
          />
          <p className="login-error">{errorLogin}</p>
        </div>

        <button id="button-login">Log In</button>
        <div className="bottom-login-box">
          <a href="https://assistir.cloud/login"> Create an account</a>
          <a href="https://assistir.cloud/login"> Forgot your password?</a>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
