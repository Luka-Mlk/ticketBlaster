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
      //   exp: new Date().getTime() / 1000 / 60 + 45,
    };
    console.log(config.get("security").jwt_secret);
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
    const removedUser = user.removeUser(req.auth.id);
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

module.exports = {
  register,
  login,
  resetPass,
  remove,
};
