const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  imagePath: {
    type: String,
  },
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
  cart: [
    {
      _id: false /* Za mongoose da ne generira avtomatski ushte eden nepotreben id ALI NE RABOTI*/,
      event: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "event",
        required: false,
      },
      numTickets: {
        type: Number,
        default: 1,
      },
    },
  ],
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

const getUserById = async (_id) => {
  try {
    console.log(_id);
    return await User.findOne({ _id });
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
  getUserById,
  updateUser,
  changePassword,
  changePrivileges,
  removeUser,
};
