import React, { useRef, useState, useSyncExternalStore } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../../assets/registerForm/registerForm.css";
function RegisterForm() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);

  // const fullNameRegEx = /^[a-zA-Z]+ [a-zA-Z]+$/;
  const fullNameRegEx = /^[a-zA-Z]{2,} [a-zA-Z]{2,}$/;
  const emailRegEx = /^[a-z0-9\.-]+@[a-z\.-]+\.[a-z]{2,}$/;
  const passwordRegEx = /^(?=.*[!@#$%^&*])(?=.*[a-zA-z]).{8,}/;

  const [errors, setErrors] = useState({});
  const [errorSentByServer, setErrorSentByServer] = useState("");

  const handleInputChange = (e) => {
    // console.log(errors);
    const { name, value } = e.target;
    if (name === "fullName") {
      if (!fullNameRegEx.test(value)) {
        setErrors((previErr) => ({
          ...previErr,
          fullName: "Field requires first and last name",
        }));
      } else {
        setErrors((previErr) => ({
          ...previErr,
          fullName: "",
        }));
      }
    } else if (name === "email") {
      if (!emailRegEx.test(value)) {
        setErrors((prevErr) => ({
          ...prevErr,
          email: "Field required valid email",
        }));
      } else {
        setErrors((prevErr) => ({
          ...prevErr,
          email: "",
        }));
      }
    } else if (name === "password") {
      if (!passwordRegEx.test(value)) {
        setErrors((prevErr) => ({
          ...prevErr,
          password:
            "Password must contain special character, number, lowercase and uppercase letters",
        }));
      } else if (value.length < 8) {
        setErrors((prevErr) => ({
          ...prevErr,
          password: "Password must be at least 8 characters long",
        }));
      } else {
        setErrors((prevErr) => ({
          ...prevErr,
          password: "",
        }));
      }
    } else if (name === "reWrittenPassword") {
      if (value !== password) {
        setErrors((prevErr) => ({
          ...prevErr,
          reWrittenPassword: "Passwords must match",
        }));
      } else {
        setErrors((prevErr) => ({
          ...prevErr,
          reWrittenPassword: "",
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(fullName);
    // console.log(email);
    // console.log(password);
    if (!areAllFieldsEmpty(errors)) {
      return alert("Register form has errors, cannot proceed");
    }
    const formData = {
      fullName: fullName,
      email: email,
      password: password,
    };
    const response = await fetch("http://localhost:10000/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    console.log(data);
    if (data.status === "success") return navigate("/login");
    else if (data.status === "failed") setErrorSentByServer(data.error);
  };

  function areAllFieldsEmpty(obj) {
    return Object.values(obj).every((val) => val === "");
  }

  return (
    <form
      action=""
      className="register--form"
      onSubmit={(e) => handleSubmit(e)}
    >
      <label htmlFor="">Full Name</label>
      <input
        type="text"
        name="fullName"
        onChange={(e) => {
          setFullName(e.target.value);
          handleInputChange(e);
        }}
        required
      />
      {errors.fullName && (
        <div className="error-message">{errors.fullName}</div>
      )}
      <label htmlFor="">Email</label>
      <input
        type="text"
        name="email"
        onChange={(e) => {
          setEmail(e.target.value);
          handleInputChange(e);
        }}
        required
      />
      {errors.email && <div className="error-message">{errors.email}</div>}
      <label htmlFor="">Password</label>
      <input
        type="password"
        name="password"
        onChange={(e) => {
          setPassword(e.target.value);
          handleInputChange(e);
        }}
        required
      />
      {errors.password && (
        <div className="error-message">{errors.password}</div>
      )}
      <label htmlFor="">Re-type Password</label>
      <input
        type="password"
        name="reWrittenPassword"
        onChange={(e) => {
          handleInputChange(e);
        }}
        required
      />
      {errors.reWrittenPassword && (
        <div className="error-message">{errors.reWrittenPassword}</div>
      )}
      {errorSentByServer && (
        <div className="error-message">{errorSentByServer}</div>
      )}
      <div className="register--actions">
        <button>Create account</button>
        <Link to="/login">Already have an account?</Link>
      </div>
    </form>
  );
}

export default RegisterForm;
