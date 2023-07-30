import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

import "../../assets/userDetails/userDetails.css";
import imgPath from "../../assets/img/portrait.jpg";
function UserDetails() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    imagePath: "",
  });
  const [imgSrc, setImgSrc] = useState("");
  const [errors, setErrors] = useState({});
  const [serverErrors, setServerErrors] = useState("");
  const [file, setFile] = useState({});
  const [succ, setSucc] = useState(false);

  const getImg = async () => {
    try {
      const response = await fetch("http://localhost:10000/api/storage/get", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JWT")}`,
        },
      });
      if (!response.ok) {
        const data = await response.json();
        console.log(data);
        return;
      }
      const img = await response.blob();
      setImgSrc(URL.createObjectURL(img));
      console.log(img);
    } catch (error) {
      console.log(error);
    }
  };

  const testName = (name) => {
    if (name === "") return "";
    const fullNameRegEx = /^[a-zA-Z]{2,} [a-zA-Z]{2,}$/;
    if (!fullNameRegEx.test(name)) {
      return "Needs full name, at least two characters";
    } else {
      return "";
    }
  };

  const testMail = (mail) => {
    if (mail === "") return "";
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
    if (pass2 !== formDataPass.pass) {
      return "Passwords do not match";
    } else {
      return "";
    }
  };

  const testMap = {
    fullName: testName,
    email: testMail,
    imagePath: () => "",
  };

  const objectIsEmpty = (obj) => {
    const valueArr = Object.values(obj);
    return valueArr.every((value) => value === "");
  };

  const genError = () => {
    const obj = {};
    for (const field in formData) {
      const fieldVal = formData[field];
      // console.log(field);
      // console.log(fieldVal);
      obj[field] = testMap[field](fieldVal);
    }
    return obj;
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    setFile(file);
    // console.log(file);
    setImgSrc(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formDataSender = formData;

    const errObj = genError();
    setErrors(errObj);
    if (!objectIsEmpty(errObj)) {
      return;
    }

    if (file.name) {
      const imgFormData = new FormData();
      imgFormData.set("image", file);

      const imgResponse = await fetch(
        "http://localhost:10000/api/storage/upload-profile",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("JWT")}`,
          },
          body: imgFormData,
        }
      );
      const imgName = await imgResponse.json();

      if (imgName.status === "success") {
        formDataSender = {
          ...formDataSender,
          ["imagePath"]: imgName.file_name,
        };
      }
    }
    if (objectIsEmpty(formDataSender)) {
      return;
    }
    const response = await fetch(
      "http://localhost:10000/api/user/change-credentials",
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JWT")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataSender),
      }
    );
    const data = await response.json();
    setFile({});
    console.log(data);
    if (data.status === "success") {
      return setSucc(true);
    } else if (data.status === "failed") setServerErrors(data.error);
  };

  const [resetPassVisibility, setVisibility] = useState(false);

  const toggleVis = (e) => {
    e.preventDefault();
    setVisibility(!resetPassVisibility);
  };

  useEffect(() => {
    getImg();
  }, []);

  const [formDataPass, setFormDataPass] = useState({});
  const [serverErrorPass, setServerErrorPass] = useState("");
  const [succMsg, setSuccMsg] = useState("");
  const [errorPass, setErrorPass] = useState({});

  const passwordTestMap = {
    pass: testPass,
    pass2: testPass2,
  };

  const genErrorPassword = () => {
    const obj = {};
    for (const field in formDataPass) {
      const fieldVal = formDataPass[field];
      // console.log(field);
      // console.log(fieldVal);
      obj[field] = passwordTestMap[field](fieldVal);
    }
    return obj;
  };

  const handlePassInput = (e) => {
    const { name, value } = e.target;
    setFormDataPass((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePassSubmit = async (e) => {
    e.preventDefault();
    console.log(formDataPass);

    let formDataPassword = formDataPass;
    console.log(formDataPassword);
    const errObj = genErrorPassword(formDataPassword);
    setErrorPass(errObj);
    if (!objectIsEmpty(errObj)) {
      return;
    }

    if (objectIsEmpty(formDataPassword)) {
      return;
    }

    const response = await fetch(
      "http://localhost:10000/api/user/reset-password",
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JWT")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataPassword),
      }
    );
    const data = await response.json();
    console.log(data);
    if (data.status === "success") {
      setVisibility(!resetPassVisibility);
      setSuccMsg("Successfully changed password");
    } else if (data.status === "failed") {
      setServerErrorPass(data.error);
    }
  };

  return (
    <form className="user--details--form" action="">
      <div className="user--details--img--and--name--div">
        <div className="user--details--img--wrapper">
          {imgSrc ? (
            <img src={imgSrc} alt="avatar" />
          ) : (
            <img src={imgPath} alt="person image" />
          )}
        </div>
        <div className="user--details--full--name--div">
          <label htmlFor="">Full Name</label>
          <input type="text" name="fullName" id="" onChange={handleInput} />
          {errors.fullName && (
            <div className="error-message">{errors.fullName}</div>
          )}
        </div>
      </div>
      <div className="user--details--upload--avatar--and--email">
        <label
          htmlFor="avatar"
          className="user--details--upload--avatar--button"
        >
          Upload Avatar
        </label>
        <input
          name="avatar"
          id="avatar"
          type="file"
          className="hidden"
          onChange={handleUpload}
        />
        <div className="user--details--email--div">
          <label htmlFor="">Email</label>
          <input type="text" name="email" onChange={handleInput} />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>
      </div>
      <div className="user--details--submit--button">
        <button onClick={handleSubmit}>Submit</button>
      </div>
      {serverErrors && <div className="error-message">{serverErrors}</div>}
      {succ && (
        <div className="succ-message">Successfully changed credentials</div>
      )}
      <div className="user--details--password--change--div">
        <h3>Password</h3>
        <button
          onClick={toggleVis}
          className="user--details--password--change--button"
        >
          Change Password
        </button>
      </div>
      {resetPassVisibility && (
        <div className="user--details--retype--wrapper">
          <div className="user--details--retype--password">
            <div className="user--detials--initial--password--div">
              <label htmlFor="">Password</label>
              <input type="password" name="pass" onChange={handlePassInput} />
            </div>
            <div className="user--details--re--type--password--div">
              <label htmlFor="">Re-type Password</label>
              <input type="password" name="pass2" onChange={handlePassInput} />
            </div>
          </div>
          {errorPass.pass && (
            <div className="error-message">{errorPass.pass}</div>
          )}
          {errorPass.pass2 && (
            <div className="error-message">{errorPass.pass2}</div>
          )}
          {serverErrorPass && (
            <div className="error-message">{serverErrorPass}</div>
          )}
          <div className="user--details--submit--password--button">
            <button onClick={handlePassSubmit}>Submit</button>
          </div>
        </div>
      )}
      {succMsg && <div className="succ-message">{succMsg}</div>}
    </form>
  );
}

export default UserDetails;
