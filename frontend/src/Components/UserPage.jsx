/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import "./Userpage.css";

const UserPage = () => {
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  // for error when connect to backend
  //const [loginError, setLoginError] = useState("");

  const onChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setLoginData({ ...loginData, [name]: value });
    setUsernameError("");
    setPasswordError("");
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (loginData.username.length < 5 || loginData.password.length < 6) {
      if (loginData.username.length < 5) {
        setUsernameError("username length mustbe al least 5 character");
      }

      if (loginData.password.length < 6) {
        setPasswordError("password length mustbe al least 6 character");
      }

      return;
    }

    console.log(loginData);
    alert("Login Success");
    // TODO:
    // create login logic and cennect to backend
  };
  return (
    <div>
      <div className="frame_top"></div>
      <div className="frame_body">
        <h2 style={{ color: "#2071B2" }}>USER LOGIN PAGE</h2>

        <div className="frame_border">
          <p>
            <i>Enter Your Credentials Here</i>
          </p>
          <div>
            <input
              className={`username ${usernameError && "error"}`}
              placeholder="Username"
              type="text"
              onChange={onChange}
              name="username"
              value={loginData.username}
            />
            {usernameError ? (
              <p className="error_indicator">{usernameError}</p>
            ) : null}
          </div>
          <br />
          <div>
            <input
              className={`username ${passwordError && "error"}`}
              placeholder="Password"
              type="text"
              onChange={onChange}
              name="password"
              value={loginData.password}
            />
            {passwordError ? (
              <p className="error_indicator">{passwordError}</p>
            ) : null}
          </div>
          <div className="options">
            <p>Remember me</p>
            <input type="checkbox" id="Yes" value="Yes" />
            <button className="login_btn" onClick={onSubmit}>
              Login
            </button>
          </div>
          <a className="forgotten_password" href="#">
            <i>Forgotten Password</i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
