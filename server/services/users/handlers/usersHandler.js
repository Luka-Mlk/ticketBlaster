const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const config = require("../../../pkg/config/config");
const user = require("../../../pkg/models/user/user");

const register = async (req, res) => {
  try {
    const acc = await user.getUserByEmail(req.body.email);
    if (acc) {
      return res.status(400).json({
        status: "failed",
        error: "Account with this email already exists",
      });
    }
    const fullNameRegEx = /^[a-zA-Z]{2,} [a-zA-Z]{2,}$/;
    const emailRegEx = /^[a-z0-9\.-]+@[a-z\.-]+\.[a-z]{2,}$/;
    const passwordRegEx = /^(?=.*[!@#$%^&*])(?=.*[a-zA-z]).{8,}/;
    if (
      req.body.password !== req.body.reWrittenPassword ||
      !passwordRegEx.test(req.body.password) ||
      !emailRegEx.test(req.body.email) ||
      !fullNameRegEx.test(req.body.fullName)
    ) {
      return res.status(400).json({
        status: "failed",
        error: "Bad request",
      });
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
      return res.status(400).json({
        status: "failed",
        error: "Account not found",
      });
    }
    if (!bcrypt.compareSync(req.body.password, acc.password)) {
      return res.status(400).json({
        status: "failed",
        error: "Wrong password",
      });
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

    if (req.body.fullName || req.body.email || req.body.imagePath) {
      let newFullName = usr.fullName;
      let newEmail = usr.email;
      let newImg = usr.imagePath;
      if (req.body.fullName !== "") {
        const fullNameRegEx = /^[a-zA-Z]{2,} [a-zA-Z]{2,}$/;
        if (!fullNameRegEx.test(req.body.fullName)) {
          return res.status(400).json({
            status: "failed",
            error: "Must contain full name",
          });
        }
        newFullName = req.body.fullName;
      }
      if (req.body.email !== "") {
        const emailRegEx = /^[a-z0-9\.-]+@[a-z\.-]+\.[a-z]{2,}$/;
        if (!emailRegEx.test(req.body.email)) {
          return res.status(400).json({
            status: "failed",
            error: "Must contain valid email address",
          });
        }
        newEmail = req.body.email;
      }
      if (req.body.imagePath !== "") {
        newImg = req.body.imagePath;
      }
      usr.fullName = newFullName;
      usr.email = newEmail;
      usr.imagePath = newImg;
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

const changeAdminStatus = async (req, res) => {
  try {
    if (!req.auth.admin) {
      return res.statuS(400).json({
        status: "failed",
        error: "Must be admin to change user admin status",
      });
    }
    console.log(req.body);
    const { id, bool } = req.body;
    const usr = await user.getUserById(id);
    usr.admin = !usr.admin;
    const nuUser = await user.updateUser(id, usr);
    console.log(nuUser);
    return res.status(200).json({
      status: "success",
      admin: usr.admin,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "failed",
      error: "Internal server error",
    });
  }
};

const getCart = async (req, res) => {
  try {
    const { cart } = await user.getUserById(req.auth.id);
    return res.status(200).json({
      status: "success",
      cart,
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
    // const email = req.auth.email;
    const id = req.auth.id;
    const pass = req.body.pass;
    const pass2 = req.body.pass2;
    if (pass !== pass2) {
      return res.status(400).json({
        status: "failed",
        error: "Passwords do not match",
      });
    }
    const acc = await user.getUserById(id);
    const passwordSameAsOld = bcrypt.compareSync(pass, acc.password);
    if (passwordSameAsOld) {
      return res.status(400).json({
        status: "failed",
        error: "Incorrect old password",
      });
    }
    const passHash = bcrypt.hashSync(pass);

    // const newPass = req.body.new_password;
    // const newPassHash = bcrypt.hashSync(newPass);
    // if (oldPassHash === newPassHash) {
    //   throw {
    //     code: 400,
    //     error: "Old and new pasword cannot be the same",
    //   };
    // }
    // const userPassChanged = await user.changePassword(acc.id, newPassHash);
    const userPassChanged = await user.changePassword(id, passHash);
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
      console.log(req.params);
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
  getCart,
  removeUser,
  updateUserCred,
  changeAdminStatus,
  getAllUsers,
  getSingleUser,
  remove,
  forgotPass,
};
