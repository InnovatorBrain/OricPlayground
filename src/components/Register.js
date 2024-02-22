import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css'
import axios from "axios";

const Register = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const onChangeFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const onChangeLastName = (e) => {
    setLastName(e.target.value);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSignup = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      setLoading(false);
      return;
    }

    axios.post("http://127.0.0.1:8000/auth/signup/", {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      confirm_password: confirmPassword
    })
      .then((response) => {
        // Handle successful response
        // You can handle redirection or any other action here
        console.log(response.data);
        navigate("/login/");
      })
      .catch((error) => {
        // Handle error
        console.error("Registration error:", error);
        setMessage("Registration failed. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div className="login_container">
        <form className="form" onSubmit={handleSignup} ref={form}>
          {/* First Name */}
          <div className="flex-column">
            <label>First Name</label>
            <div className="inputForm">
              <input
                type="text"
                className="input"
                placeholder="Enter your First Name"
                value={firstName}
                onChange={onChangeFirstName}
              />
            </div>
          </div>
          {/* Last Name */}
          <div className="flex-column">
            <label>Last Name</label>
            <div className="inputForm">
              <input
                type="text"
                className="input"
                placeholder="Enter your Last Name"
                value={lastName}
                onChange={onChangeLastName}
              />
            </div>
          </div>
          {/* Email */}
          <div className="flex-column">
            <label>Email</label>
            <div className="inputForm">
              <input
                type="text"
                className="input"
                placeholder="Enter your Email"
                value={email}
                onChange={onChangeEmail}
              />
            </div>
          </div>
          {/* Password */}
          <div className="flex-column">
            <label>Password</label>
            <div className="inputForm">
              <input
                type="password"
                className="input"
                placeholder="Enter your Password"
                value={password}
                onChange={onChangePassword}
              />
            </div>
          </div>
          {/* Confirm Password */}
          <div className="flex-column">
            <label>Confirm Password</label>
            <div className="inputForm">
              <input
                type="password"
                className="input"
                placeholder="Confirm your Password"
                value={confirmPassword}
                onChange={onChangeConfirmPassword}
              />
            </div>
          </div>
          {/* Submit Button */}
          <button type="submit" className="button-submit" disabled={loading}>
            {loading && <span className="spinner-border spinner-border-sm"></span>}
            <span>Create Account</span>
          </button>
          {/* Message for existing user */}
          <p className="p">If have an account? <span className="span">Sign In</span></p>
          {/* Or With */}
          <p className="p line">Or With</p>
          {/* Google button */}
          <div className="flex-row">
            <button className="btn google">
              {/* Google Icon */}
              <span>Google</span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
