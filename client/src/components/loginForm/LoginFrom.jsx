import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../../assets/loginForm/loginForm.css";
function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      email,
      password,
    };
    const response = await fetch("http://localhost:10000/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    console.log(data);
    if (data.status === "success") {
      localStorage.setItem("JWT", data.token);
      navigate("/");
    } else if (data.status === "failed") {
      setError(data.error);
    }
  };
  return (
    <form
      action=""
      className="login--form"
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <label htmlFor="">Email</label>
      <input
        type="text"
        name="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        required
      />
      <label htmlFor="">Password</label>
      <input
        type="password"
        name="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        required
        className="last--input"
      />
      {error && <div className="error-message">{error}</div>}
      <div className="login--actions">
        <Link>Forgot Password?</Link>
        <button>Log In</button>
      </div>
      <Link to="/register" className="dont--have--acc">
        Dont have an account?
      </Link>
    </form>
  );
}

export default LoginForm;
