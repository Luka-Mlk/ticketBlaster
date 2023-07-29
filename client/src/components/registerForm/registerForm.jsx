import React, {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { Link, useNavigate } from "react-router-dom";

import "../../assets/registerForm/registerForm.css";
function RegisterForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  // validate backend values

  const testName = (name) => {
    const fullNameRegEx = /^[a-zA-Z]{2,} [a-zA-Z]{2,}$/;
    if (!fullNameRegEx.test(name)) {
      return "Needs full name, at least two characters";
    } else {
      return "";
    }
  };

  const testMail = (mail) => {
    const emailRegEx = /^[a-z0-9\.-]+@[a-z\.-]+\.[a-z]{2,}$/;
    if (!emailRegEx.test(mail)) {
      return "Must be valid email";
    } else {
      return "";
    }
  };

  const testPass = (pass) => {
    const passwordRegEx = /^(?=.*[!@#$%^&*])(?=.*[a-zA-z]).{8,}/;
    if (!passwordRegEx.test(pass)) {
      return "Password must contain special character, number, lowercase and uppercase letters and 8 characters long";
    } else {
      return "";
    }
  };

  const testPass2 = (pass2) => {
    if (pass2 !== formData.password) {
      return "Passwords must match";
    } else {
      return "";
    }
  };

  const testMap = {
    fullName: testName,
    email: testMail,
    password: testPass,
    reWrittenPassword: testPass2,
  };

  const objectIsEmpty = (obj) => {
    const valueArr = Object.values(obj);
    return valueArr.every((value) => value === "");
  };

  const [errors, setErrors] = useState({});
  const [errorSentByServer, setErrorSentByServer] = useState("");

  const handleInputChange = (e) => {
    // CALL ERROR ON SUBMIT-VAL
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const genError = () => {
    const obj = {};
    for (const field in formData) {
      const fieldVal = formData[field];
      obj[field] = testMap[field](fieldVal);
    }
    return obj;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorObj = genError();
    setErrors(errorObj);

    if (!objectIsEmpty(errorObj)) {
      return;
    }

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

  // function areAllFieldsEmpty(obj) {
  //   return Object.values(obj).every((val) => val !== "");
  // }

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
