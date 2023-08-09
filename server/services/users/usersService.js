const express = require("express");
const { expressjwt: jwt } = require("express-jwt");

const config = require("../../pkg/config/config");
const db = require("../../pkg/db/database");
const user = require("./handlers/usersHandler");

db.connect();

const api = express();

api.use(express.json());
api.use(express.urlencoded({ extended: true }));
api.use(
  jwt({
    secret: config.get("security").jwt_secret,
    algorithms: ["HS256"],
  }).unless({
    path: [
      "/api/user/register",
      "/api/user/login",
      "/api/user/forgot-password",
    ],
  })
);

// {
// "email": "luka.milik1@gmail.com",
// "password": "Luka123"
// }

api.post("/api/user/register", user.register);
api.post("/api/user/login", user.login);
api.patch("/api/user/reset-password", user.resetPass);
api.patch("/api/user/change-credentials", user.updateUserCred);
api.patch("/api/user/change-admin", user.changeAdminStatus);
api.delete("/api/user/remove-account", user.remove);
api.delete("/api/user/remove-user/:id", user.removeUser);
api.post("/api/user/forgot-password", user.forgotPass);

api.get("/api/user/cart", user.getCart);
api.get("/api/user/all-users", user.getAllUsers);
api.get("/api/user/my-profile", user.getSingleUser);

api.listen(config.get("services").users.port, (err) => {
  if (err) console.log(err);

  console.log(
    `Service [users] successfully started on port: ${
      config.get("services").users.port
    }`
  );
});
