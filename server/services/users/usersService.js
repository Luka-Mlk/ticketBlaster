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
    path: ["/api/register", "/api/login"],
  })
);

api.post("/api/register", user.register);
api.post("/api/login", user.login);
api.post("/api/reset-password", user.resetPass);
api.post("/api/remove-account", user.remove);

api.listen(config.get("services").users.port, (err) => {
  if (err) console.log(err);

  console.log(
    `Service [users] successfully started on port: ${
      config.get("services").users.port
    }`
  );
});
