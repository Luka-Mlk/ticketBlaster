const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    minLength: 3,
  },
  email: {
    type: String,
    required: true,
    minLength: 10,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  admin: {
    type: Boolean,
    enum: [true, false],
    default: false,
  },
});

const User = mongoose.model("users", userSchema);

const create = async (user) => {
  try {
    const newUser = new User(user);
    return await newUser.save();
  } catch (err) {
    throw err;
  }
};

const getUserByEmail = async (email) => {
  try {
    return await User.findOne({ email });
  } catch (err) {
    throw err;
  }
};

const getAllUsers = async () => {
  try {
    return await User.find({});
  } catch (err) {
    throw err;
  }
};

const updateUser = async (id, data) => {
  try {
    return await User.updateOne({ _id: id }, data);
  } catch (err) {
    throw err;
  }
};

const changePassword = async (id, pass) => {
  try {
    return await User.updateOne({ _id: id }, { password: pass });
  } catch (err) {
    throw err;
  }
};

const changePrivileges = async (id, data) => {
  try {
    return await User.updateOne({ _id: id }, { $set: { role: data } });
  } catch (err) {
    throw err;
  }
};

const removeUser = async (id) => {
  try {
    return await User.deleteOne({ _id: id });
  } catch (err) {
    throw err;
  }
};

module.exports = {
  create,
  getAllUsers,
  getUserByEmail,
  updateUser,
  changePassword,
  changePrivileges,
  removeUser,
};
