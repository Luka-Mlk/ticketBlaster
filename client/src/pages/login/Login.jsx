import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/header/Header";
import LoginForm from "../../components/loginForm/LoginFrom";
import Footer from "../../components/footer/Footer";

import "../../assets/loginPage/loginPage.css";
function Login() {
  return (
    <div className="login--page">
      <Header />
      <div className="form--wrapper">
        <h2>Log In</h2>
        <LoginForm />
      </div>
      <Footer />
    </div>
  );
}

export default Login;
