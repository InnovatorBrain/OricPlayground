import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css'
import axios from "axios";
import AuthService from "../services/auth.service";

const Login = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    axios.post("http://127.0.0.1:8000/auth/login/", { username, password })
      .then((response) => {
        AuthService.login(response.data.token);
        navigate("/nlp/");
        window.location.reload();
      })
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.error) ||
          error.message ||
          error.toString();

        setLoading(false);
        setMessage(resMessage);
      });
  };

  return (
    <>
      <div className="login_container">
        <form className="form" onSubmit={handleLogin} ref={form}>
          <div className="flex-column">
            <label>Email </label>
            <div className="inputForm">
              <svg height="20" viewBox="0 0 32 32" width="20" xmlns="http://www.w3.org/2000/svg">
                {/* SVG path data */}
              </svg>
              <input
                type="text"
                className="input"
                placeholder="Enter your Email"
                value={username}
                onChange={onChangeUsername}
              />
            </div>
          </div>

          <div className="flex-column">
            <label>Password </label>
            <div className="inputForm">
              <svg height="20" viewBox="-64 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg">
                {/* SVG path data */}
              </svg>
              <input
                type="password"
                className="input"
                placeholder="Enter your Password"
                value={password}
                onChange={onChangePassword}
              />
            </div>
          </div>

          <button type="submit" className="button-submit">Sign In</button>

          <p className="p">Don't have an account? <span className="span">Sign Up</span></p>
          <p className="p line">Or With</p>

          <div className="flex-row">
            <button className="btn google">
              <svg version="1.1" width="20" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style={{ enableBackground: 'new 0 0 512 512' }} xmlSpace="preserve">
                {/* ... (your Google SVG path data) */}
              </svg>
              Google
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
