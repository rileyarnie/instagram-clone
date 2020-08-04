import React from "react";
import "./Register.css";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="register">
      <div className="register__form">
        <div className="register__logo">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/200px-Instagram_logo.svg.png"
            alt=""
          />
        </div>
        <form className="register__inputs">
          <input
            placeholder="username"
            className="register__formInput"
            type="text"
          />
          <input
            placeholder="email"
            className="register__formInput"
            type="email"
          />
          <input
            placeholder="password"
            className="register__formInput"
            type="password"
          />
          <button type="submit" className="register__login">
            Register
          </button>
        </form>
      </div>
      <div className="register_loginLink">
        <p>
          Already have an account? <Link className="register__link" to="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
