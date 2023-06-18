const mongoose = require("mongoose");

const historySchema = mongoose.Schema({
  personId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "user",
    required: true,
  },
  personName: {
    type: String,
    required: true,
    minLength: 3,
  },
  numPurchasedEvents: {
    type: Number,
    default: 1,
  },
  numTickets: {
    type: Number,
    default: 1,
  },
  purchasedEvents: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "event",
      required: true,
    },
  ],
});

const personHistory = mongoose.model("purchase_History", historySchema);

const getHistory = async (id) => {
  try {
    return await personHistory.find({ personId: id });
  } catch (err) {
    throw err;
  }
};

const create = async (history) => {
  try {
    const newPersonHistory = new personHistory(history);
    return await newPersonHistory.save();
  } catch (err) {
    throw err;
  }
};

const read = async (id) => {
  try {
    return await personHistory.find({ personId: id });
  } catch (err) {
    throw err;
  }
};

const update = async (id, data) => {
  try {
    return await personHistory.updateOne({ personId: id }, data);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getHistory,
  create,
  read,
  update,
};
