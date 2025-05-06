import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

const LoginScreen = () => {
  return (
    <div className="container">
      <form autoComplete="off" id="loginForm">
        <h1 id="message">Welcome Back</h1>
        <small id="smallMessage"></small>

        <div className="field">
          <input
            type="email"
            name="email"
            placeholder="Email"
            id="email"
            autoComplete="off"
          />
          <label htmlFor="email">Email</label>
        </div>

        <div className="field">
          <input
            type="password"
            name="password"
            placeholder="Password"
            id="password"
            autoComplete="current-password"
          />
          <label htmlFor="password">Password</label>
        </div>

        <button id="submit">Log In</button>

        <p>
          Don’t have an account?{" "}
          <Link to="/register" style={{ color: "white", fontWeight: "bold" }}>
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginScreen;
