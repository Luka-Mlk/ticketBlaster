import React from "react";
import { Link } from "react-router-dom";
import "../../assets/loginForm/loginForm.css";

function LoginForm() {
  return (
    <form action="" className="login--form">
      <label htmlFor="">Email</label>
      <input type="text" />
      <label htmlFor="">Password</label>
      <input type="password" className="last--input" />
      <div className="login--actions">
        <Link>Forgot Password?</Link>
        <Link>Log In</Link>
      </div>
      <Link to="/register">Dont have an account?</Link>
    </form>
  );
}

export default LoginForm;
