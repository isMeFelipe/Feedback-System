import React, { useState } from "react";
import "./AdminPage.css";

const AdminPage = () => {
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
      <div className="admin_frame_top"></div>
      <div className="admin_frame_body">
        <h2 style={{ color: "#2071B2" }}>ADMIN LOGIN PAGE</h2>

        <div className="admin_frame_border">
          <p>
            <i>Enter Your Credentials Here</i>
          </p>
          <div>
            <input
              className={`admin ${usernameError && "error"}`}
              placeholder="Username"
              type="text"
              onChange={onChange}
              name="username"
              value={loginData.username}
              required
            />
            {usernameError ? (
              <p className="error_indicator">{usernameError}</p>
            ) : null}
          </div>
          <br />
          <div>
            <input
              className={`admin ${passwordError && "error"}`}
              placeholder="Password"
              type="password"
              onChange={onChange}
              name="password"
              value={loginData.password}
              required
            />
            {passwordError ? (
              <p className="error_indicator">{passwordError}</p>
            ) : null}
          </div>
          <button className="login_btn" onClick={onSubmit}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
