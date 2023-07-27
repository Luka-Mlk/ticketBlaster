const express = require("express");
const config = require("../../pkg/config/config");
const fileUpload = require("express-fileupload");
const { expressjwt: jwt } = require("express-jwt");
const storage = require("./handlers/storageHandler");

const api = express();

api.use(
  jwt({
    secret: config.get("security").jwt_secret,
    algorithms: ["HS256"],
  }).unless({
    path: [/^\/api\/storage\/get\/*./],
  })
);
api.use(fileUpload());
api.use(express.json());
api.use(express.urlencoded({ extended: true }));

api.post("/api/storage/upload-profile", storage.upload);
api.post("/api/storage/upload-event", storage.uploadEvent);
api.get("/api/storage/get/:fileName", storage.read);
api.delete("/api/storage/delete", storage.remove);

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
