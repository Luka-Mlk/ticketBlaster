const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const config = require("../../../pkg/config/config");
const user = require("../../../pkg/models/user/user");

const register = async (req, res) => {
  try {
    const acc = await user.getUserByEmail(req.body.email);
    if (acc) {
      throw {
        code: 400,
        error: "Account with this email already exists",
      };
    }
    req.body.password = bcrypt.hashSync(req.body.password);
    const newAcc = await user.create({
      imagePath: req.body.imagePath || "",
      fullName: req.body.fullName,
      email: req.body.email,
      password: req.body.password,
      admin: req.body.admin,
    });
    // return res.status(201).send(newAcc);
    return res.status(201).json({
      status: "success",
      user: newAcc,
    });
  } catch (err) {
    console.log(err);
    // return res.status(500).send("Internal server error");
    return res.status(500).json({
      status: "failed",
      error: "Internal server error",
    });
  }
};

const login = async (req, res) => {
  try {
    const acc = await user.getUserByEmail(req.body.email);
    if (!acc) {
      throw {
        code: 404,
        error: "Account not found",
      };
    }
    if (!bcrypt.compareSync(req.body.password, acc.password)) {
      throw {
        code: 400,
        error: "Wrong password",
      };
    }
    const payload = {
      fullName: acc.fullName,
      email: acc.email,
      id: acc.id,
      admin: acc.admin,
      //   exp: new Date().getTime() / 1000 / 60 + 45,
    };
    // console.log(config.get("security").jwt_secret);
    const token = jwt.sign(payload, config.get("security").jwt_secret);
    // return res.status(200).send({ token });
    return res.status(200).json({
      status: "success",
      token,
    });
  } catch (err) {
    console.log(err);
    // return res.status(500).send("Internal server error");
    return res.status(500).json({
      status: "failed",
      error: "Internal server error",
    });
  }
};

// const refreshToken = async (req, res) => {
//   try {
//     const payload = {
//       ...req.auth,
//       exp: new Date().getTime() / 1000 / 60 + 45,
//     };
//     const token = jwt.sign(payload, config.get("security").jwt_secret);
//     return res.status(200).send({ token });
//   } catch (err) {
//     console.log(err);
//     res.sttatus(500).send("Internal server error");
//   }
// };

const updateUserCred = async (req, res) => {
  try {
    if (!req.auth.id) {
      return res.statuS(400).json({
        status: "failed",
        error: "Must be logged in to change user credentials",
      });
    }

    const usr = await user.getUserById(req.auth.id);

    if (req.body.newFullName || req.body.newEmail) {
      const newFullName =
        req.body.newFullName !== "" ? req.body.newFullName : usr.fullName;
      // const newName = req.body.newName;
      const newEmail = req.body.newEmail !== "" ? req.body.newEmail : usr.email;
      usr.fullName = newFullName;
      usr.email = newEmail;
    }

    await user.updateUser(req.auth.id, usr);

    return res.status(200).json({
      status: "success",
      usr,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "failed",
      error: "Internal server error",
    });
  }
};

const forgotPass = async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "failed",
      error: "Internal server error",
    });
  }
};

const resetPass = async (req, res) => {
  try {
    const email = req.auth.email;
    const oldPass = req.body.old_password;
    const oldPassHash = bcrypt.hashSync(oldPass);
    const acc = await user.getUserByEmail(email);
    if (acc.password === oldPassHash) {
      throw {
        code: 400,
        error: "Incorrect old password",
      };
    }
    const newPass = req.body.new_password;
    const newPassHash = bcrypt.hashSync(newPass);
    if (oldPassHash === newPassHash) {
      throw {
        code: 400,
        error: "Old and new pasword cannot be the same",
      };
    }
    const userPassChanged = await user.changePassword(acc.id, newPassHash);
    // return res.status(200).send(userPassChanged);
    return res.status(200).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
    // res.status(500).send("Internal server error");
    return res.status(500).json({
      status: "failed",
      error: "Internal server error",
    });
  }
};

const remove = async (req, res) => {
  try {
    const removedUser = await user.removeUser(req.auth.id);
    // return res.status(200).send(removedUser);
    return res.status(500).json({
      status: "success",
      removed: removedUser,
    });
  } catch (err) {
    console.log(err);
    // res.status(500).send("Internal server error");
    return res.status(500).json({
      status: "failed",
      error: "Internal server error",
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    if (req.auth.admin) {
      const allUsers = await user.getAllUsers();
      return res.status(200).json({
        status: "success",
        allUsers,
      });
    }
    return res.status(400).json({
      status: "failed",
      error: "Incorrect priviliges",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "failed",
      error: "Internal server error",
    });
  }
};

const getSingleUser = async (req, res) => {
  try {
    if (req.auth.admin) {
      const singleUser = await user.getUserById(req.auth.id);
      return res.status(200).json({
        status: "success",
        singleUser,
      });
    }
    return res.status(400).json({
      status: "failed",
      error: "Incorrect priviliges",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "failed",
      error: "Internal server error",
    });
  }
};

const removeUser = async (req, res) => {
  try {
    if (req.auth.admin) {
      const deletedUser = await user.removeUser(req.params.id);
      return res.status(200).json({
        status: "success",
        deletedUser,
      });
    }
    return res.status(400).json({
      status: "failed",
      error: "Incorrect priviliges",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "failed",
      error: "Internal server error",
    });
  }
};

module.exports = {
  register,
  login,
  resetPass,
  removeUser,
  updateUserCred,
  getAllUsers,
  getSingleUser,
  remove,
  forgotPass,
};
