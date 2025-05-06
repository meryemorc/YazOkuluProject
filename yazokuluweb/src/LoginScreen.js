import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "./api/axios"; // bu dosyada baseURL ayarlı olmalı
import "./App.css";



const LoginScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // formun sayfayı yenilemesini engeller
    try {
      const response = await axios.post("api/Auth/login", {
        email,
        password,
      });

      const token = response.data.token;
      localStorage.setItem("token", token); // token saklanıyor
      navigate("/home"); // giriş başarılıysa yönlendir

    } catch (err) {
      console.error(err);
      setError("Giriş başarısız. Lütfen bilgileri kontrol et.");
    }
  };

  return (
    <div className="container">
      <form autoComplete="off" id="loginForm" onSubmit={handleSubmit}>
        <h1 id="message">Welcome Back</h1>
        {error && <small id="smallMessage" style={{ color: "red" }}>{error}</small>}

        <div className="field">
          <input
            type="email"
            name="email"
            placeholder="Email"
            id="email"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="password">Password</label>
        </div>

        <button id="submit" type="submit">Log In</button>

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
