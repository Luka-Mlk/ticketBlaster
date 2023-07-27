const fs = require("fs");
const strings = require("../../../pkg/strings/strings");
const event = require("../../../pkg/models/event/event");
const path = require("path");

const upload = async (req, res) => {
  const fileTypes = [
    "image/png",
    "image/jpg",
    "image/pjpeg",
    "image/jpeg",
    "image/gif",
  ];
  const maxFileSize = 3145728; // 3MB
  if (maxFileSize < req.files.image.size) {
    // return res.status(400).send("File size limit exceeded");
    return res.status(400).json({
      status: "failed",
      error: "File size limit exceeded",
    });
  }

  if (!fileTypes.includes(req.files.image.mimetype)) {
    // return res.status(400).send("Bad request");
    return res.status(400).json({
      status: "failed",
      error: "Incorrect image format",
    });
  }

  const userDir = `user_${req.auth.id}`;
  const userDirPath = `${__dirname}/../user_uploads/${userDir}`;

  if (!fs.existsSync(userDirPath)) {
    fs.mkdirSync(userDirPath);
  }

  const fileName = `${strings.random(9)}_${req.files.image.name}`;
  const filePath = `${userDirPath}/${fileName}`;

  req.files.image.mv(filePath, (err) => {
    if (err) {
      console.log(err);
      // return res.status(500).send("Internal server error");
      return res.status(500).json({
        status: "failed",
        error: "Internal server error",
      });
    }
    // return res.status(200).send({ file_name: fileName });
    return res.status(200).json({
      status: "success",
      // file_path: filePath,
      file_name: fileName,
    });
  });
};

const uploadEvent = async (req, res) => {
  if (!req.auth.admin) {
    return res.status(400).json({
      status: "failed",
      error: "Incorrect permissions",
    });
  }
  const fileTypes = [
    "image/png",
    "image/jpg",
    "image/pjpeg",
    "image/jpeg",
    "image/gif",
  ];
  const maxFileSize = 3145728; // 3MB
  if (maxFileSize < req.files.image.size) {
    // return res.status(400).send("File size limit exceeded");
    return res.status(400).json({
      status: "failed",
      error: "File size limit exceeded",
    });
  }

  if (!fileTypes.includes(req.files.image.mimetype)) {
    // return res.status(400).send("Bad request");
    return res.status(400).json({
      status: "failed",
      error: "Incorrect image format",
    });
  }
  const name = `${strings.random(9)}_${req.files.image.name}`;
  const path = `${__dirname}/../user_uploads/event_images/${name}`;

  req.files.image.mv(path, (err) => {
    if (err) {
      console.log(err);
      // return res.status(500).send("Internal server error");
      return res.status(500).json({
        status: "failed",
        error: "Internal server error",
      });
    }
    // return res.status(200).send({ file_name: fileName });
    return res.status(200).json({
      status: "success",
      // file_path: filePath,
      file_name: name,
    });
  });
};

const read = async (req, res) => {
  const userDir = `user_${req.auth.id}`;
  const userDirPath = `${__dirname}/../user_uploads/${userDir}`;

  const fileName = req.params.fileName;
  const filePath = `${userDirPath}/${fileName}`;
  if (!fs.existsSync(filePath)) {
    // return res.status(400).send("No such file in storage");
    return res.status(400).json({
      status: "failed",
      error: "No such file in storage",
    });
  }
  const resolvedPath = path.resolve(filePath);
  return res.sendFile(resolvedPath);
};

const remove = async (req, res) => {
  const userDir = `user_${req.auth.id}`;
  const userDirPath = `${__dirname}/../user_uploads/${userDir}`;

  const fileName = req.body.fileName;
  const filePath = `${userDirPath}/${fileName}`;

  if (!fs.existsSync(filePath)) {
    // return res.status(400).send("No such file in storage");
    return res.status(400).json({
      status: "failed",
      error: "No such file in storage",
    });
  }

  fs.unlinkSync(`${userDirPath}/${fileName}`);

  const files = fs.readdirSync(userDirPath);

  if (files.length < 1) {
    fs.rmdirSync(userDirPath);
  }

  // return res.status(200).send({ removed: fileName, filesInDirectory: files });
  return res.status(200).json({
    status: "success",
    removed: fileName,
    filesInDirectory: files,
  });
};

const removeEvent = async (name) => {
  const path = `${__dirname}/../user_uploads/event_images/${name}`;
  fs.unlinkSync(path);
};

module.exports = {
  upload,
  uploadEvent,
  read,
  remove,
  removeEvent,
};
