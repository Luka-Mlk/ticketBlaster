const express = require("express");
const config = require("../../pkg/config/config");
const fileUpload = require("express-fileupload");
const { expressjwt: jwt } = require("express-jwt");
const storage = require("./handlers/storage");

const api = express();

api.use(
  jwt({
    algorithms: ["HS256"],
    secret: config.get("security").jwt_secret,
  })
);
api.use(fileUpload());
api.use(express.json());
api.use(express.urlencoded({ extended: true }));

api.post("/api/storage", storage.upload);
api.delete("/api/storage", storage.remove);

api.listen(config.get("services").storage.port, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(
    `Service [storage] successfully started on port ${
      config.get("services").storage.port
    }`
  );
});
