import React, { useEffect, useState } from "react";
import UserWide from "../usersWide/UserWide";

import "../../assets/usersPage/usersPage.css";

function Users({ token }) {
  const [users, setUsers] = useState([]);
  const [deleteStatus, setDeleteStatus] = useState(false);
  const changeState = () => {
    setDeleteStatus(!deleteStatus);
    console.log("Child component changed parent component state");
  };
  const fetchUsers = async () => {
    try {
      const response = await fetch(
        "http://localhost:10000/api/user/all-users",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("JWT")}`,
          },
        }
      );
      const data = await response.json();

      setUsers(data.allUsers);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [, deleteStatus]);

  return (
    <div className="users--admin--div">
      {users.map((user, i) => {
        return (
          <UserWide
            key={i}
            user={user}
            token={token}
            changeState={changeState}
          />
        );
      })}
    </div>
  );
}

export default Users;
