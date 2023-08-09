import React, { useEffect, useState } from "react";
import personImg from "../../assets/img/portrait.jpg";

import "../../assets/cards/userWideAdmin/wide.css";
function UserWide({ user, token, changeState }) {
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState("");
  const [buttonContent, setButtonContent] = useState("");
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [profileImgPath, setProfileImgPath] = useState(personImg);

  const handlePermissionChange = async () => {
    try {
      const response = await fetch(
        "http://localhost:10000/api/user/change-admin",
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("JWT")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: user._id,
            bool: !isUserAdmin,
          }),
        }
      );

      const data = await response.json();
      console.log(data);

      setIsUserAdmin(data.admin);

      if (data.status === "success") setDeleteStatus(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const response = await fetch(
        `http://localhost:10000/api/user/remove-user/${user._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("JWT")}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserImage = async () => {
    const res = await fetch(
      `http://localhost:10000/api/storage/get-all/${user._id}/${
        user.imagePath === "" ? "noImage" : user.imagePath
      }`,
      {
        method: "GET",
      }
    );
    if (res.ok) {
      // const data = await res.json();
      const data = await res.blob();
      setProfileImgPath(URL.createObjectURL(data));
    }
    return;
  };

  useEffect(() => {
    setIsUserAdmin(user.admin);
  }, [setIsUserAdmin]);

  useEffect(() => {
    fetchUserImage();
  }, []);
  return (
    <div className="user--wide--card--wrapper">
      <div className="user--wide--card">
        <div className="user--wide--description--content">
          <div className="user--wide--img--wrapper">
            {profileImgPath && <img src={profileImgPath} alt="user image" />}
          </div>
          <div className="user--wide--description--content--personal">
            <p>{user.fullName}</p>
            <p>{user.email}</p>
          </div>
        </div>
        {isUserAdmin ? (
          <div className="user--wide--card--actions">
            {token.id === user._id ? (
              ""
            ) : (
              <button
                onClick={() => {
                  setShowPopup(true);
                  setPopupContent(
                    "You are about to downgrade a user from administrator. Please proceed with caution."
                  );
                  setButtonContent("Downgrade user");
                }}
                className="admin--user"
              >
                Make User
              </button>
            )}
            {token.id === user._id ? (
              ""
            ) : (
              <button
                onClick={() => {
                  setShowPopup(true);
                  setPopupContent(
                    "You are about to delete a user. Please proceed with caution."
                  );
                  setButtonContent("Delete user");
                }}
              >
                Delete User
              </button>
            )}
          </div>
        ) : (
          <div className="user--wide--card--actions">
            <button
              onClick={() => {
                setShowPopup(true);
                setPopupContent(
                  "You are about to make a user administrator of the system. Please proceed with caution."
                );
                setButtonContent("Make user admin");
              }}
              className="regular--user"
            >
              Make Admin
            </button>
            <button
              onClick={() => {
                setShowPopup(true);
                setPopupContent(
                  "You are about to delete a user. Please proceed with caution."
                );
                setButtonContent("Delete user");
              }}
            >
              Delete User
            </button>
          </div>
        )}
        {showPopup && (
          <div className="popup--users">
            <div className="popup--users--subdiv">
              <h2>Are you sure?</h2>
              <p>{popupContent}</p>
            </div>
            <div className="popup--users--actions">
              <button
                className="popup--users--action--cancel"
                onClick={() => {
                  setShowPopup(false);
                }}
              >
                Cancel
              </button>
              <button
                className="popup--users--action--commit"
                onClick={() => {
                  console.log(buttonContent);
                  if (buttonContent !== "Delete user") {
                    handlePermissionChange();
                    return setShowPopup();
                  }
                  handleDeleteUser();
                  changeState();
                  setShowPopup();
                }}
              >
                {buttonContent}
              </button>
            </div>
          </div>
        )}
      </div>
      <hr />
    </div>
  );
}

export default UserWide;
