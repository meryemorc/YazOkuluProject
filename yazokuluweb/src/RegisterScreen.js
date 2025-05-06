import React, { useEffect } from "react";
import "./App.css";
import { Link } from "react-router-dom";


const RegisterScreen = () => {
  useEffect(() => {
    const form = document.querySelector("form");
    const message = document.getElementById("message");
    const smallMessage = document.getElementById("smallMessage");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const submitBtn = document.getElementById("submit");

    function firstMessage() {
      message.innerHTML = "Type your email";
      smallMessage.innerHTML = "";
      document.body.style.background = "#88C9E8";
    }

    function secondMessage() {
      message.innerHTML = "Choose your password";
      document.body.style.background = "#D5F3A6";
    }

    function length() {
      if (password.value.length <= 3) {
        smallMessage.innerHTML = "Make it strong";
      } else if (password.value.length > 3 && password.value.length < 10) {
        smallMessage.innerHTML = "Strong as a bull!";
      } else if (password.value.length >= 10) {
        smallMessage.innerHTML = "It's unbreakable!!!";
      } else {
        smallMessage.innerHTML = "";
      }
    }

    function formValidation() {
      email.addEventListener("input", firstMessage);
      password.addEventListener("input", secondMessage);
      password.addEventListener("keyup", length);

      submitBtn.addEventListener("mouseover", function () {
        message.innerHTML = "You're a click away";
        smallMessage.innerHTML = "Do it. That's what you are here for.";
        document.body.style.background = "#FCEFA6";
      });

      submitBtn.addEventListener("click", function () {
        form.innerHTML =
          '<h1>Good job!</h1><p class="success-message">There is a confirmation link waiting in your email inbox.</p>';
        document.body.style.background = "#D7F5DE";
      });
    }

    formValidation();
  }, []);

  return (
    <div className="container">
      <form autoComplete="off" id="form">
        <h1 id="message">Get Started</h1>
        <small id="smallMessage"></small>

        <div className="field">
          <input
            type="text"
            name="full_name"
            placeholder="Full Name"
            id="full_name"
            autoComplete="off"
          />
          <label htmlFor="full_name">Full Name</label>
        </div>

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
            autoComplete="new-password"
          />
          <label htmlFor="password">Password</label>
        </div>

        <div className="field">
  <select name="role" id="role" style={{ margin: "0 1.5rem", padding: "10px 20px" }}>
    <option value="">Select Role</option>
    <option value="student">Student</option>
    <option value="admin">Admin</option>
  </select>
</div>


        <button id="submit">Create My Account</button>
        <p>
          By signing up, I agree to the Terms of Service and Privacy Policy
        </p>
        <p>
            Already have an account?{" "}
            <Link to="/" style={{ color: "white", fontWeight: "bold" }}>
            Login
            </Link>
        </p>

      </form>
    </div>
  );
};

export default RegisterScreen;
