const fs = require("fs");
const strings = require("../../../pkg/strings/strings");

const upload = async (req, res) => {
  const fileTypes = [
    "image/png",
    "image/jpg",
    "image/pjpeg",
    "image/jpeg",
    "image/gif",
  ];
  const maxFileSize = 3145728; // 3MB

  if (maxFileSize < req.files.slika.mimetype) {
    // return res.status(400).send("File size limit exceeded");
    return res.status(400).json({
      status: "failed",
      error: "File size limit exceeded",
    });
  }

  if (!fileTypes.includes(req.files.slika.mimetype)) {
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

  const fileName = `${strings.random(9)}_${req.files.slika.name}`;
  const filePath = `${userDirPath}/${fileName}`;

  req.files.slika.mv(filePath, (err) => {
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
      file_name: fileName,
    });
  });
};

const remove = (req, res) => {
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

module.exports = {
  upload,
  remove,
};
