import React from "react";
import { Link } from "react-router-dom";
import "../../assets/registerForm/registerForm.css";

function RegisterForm() {
  return (
    <form action="" className="register--form">
      <label htmlFor="">Full Name</label>
      <input type="text" />
      <label htmlFor="">Email</label>
      <input type="text" />
      <label htmlFor="">Password</label>
      <input type="password" />
      <label htmlFor="">Re-type Password</label>
      <input type="password" />
      <div className="register--actions">
        <Link>Create account</Link>
        <Link>Already have an account?</Link>
      </div>
    </form>
  );
}

export default RegisterForm;
