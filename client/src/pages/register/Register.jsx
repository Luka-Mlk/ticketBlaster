import React from "react";
import "../../assets/registerPage/registerPage.css";
import Header from "../../components/header/Header";
import RegisterForm from "../../components/registerForm/registerForm";
import Footer from "../../components/footer/Footer";

function Register() {
  return (
    <div className="register--page">
      <Header />
      <div className="form--wrapper">
        <h2>Create account</h2>
        <RegisterForm />
      </div>
      <Footer />
    </div>
  );
}

export default Register;
