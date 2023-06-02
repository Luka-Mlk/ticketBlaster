const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
  eventName: {
    type: String,
    required: true,
    minLength: 3,
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  imagePath: {
    type: String,
    required: false,
  },
  eventDetails: {
    type: String,
    required: true,
    minLength: 3,
  },
  ticketPrice: {
    type: Number,
    required: true,
  },
  relatedEvents: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Event",
      required: false,
    },
  ],
});

const Event = mongoose.model("events", eventSchema);

const create = async (event) => {
  try {
    const newEvent = new Event(event);
    return await newEvent.save();
  } catch (err) {
    throw err;
  }
};

const getAll = async () => {
  try {
    return await Event.find({});
  } catch (err) {
    throw err;
  }
};

const getOne = async (id) => {
  try {
    return await Event.findOne({ _id: id });
  } catch (err) {
    throw err;
  }
};

const update = async (id, data) => {
  try {
    return await Event.updateOne({ _id: id }, data);
  } catch (err) {
    throw err;
  }
};

const remove = async (id) => {
  try {
    return await Event.deleteOne({ _id: id });
  } catch (err) {
    throw err;
  }
};

module.exports = {
  create,
  getAll,
  getOne,
  update,
  remove,
};
