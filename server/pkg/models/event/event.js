const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
  eventName: {
    type: String,
    required: true,
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
  location: {
    _id: false,
    type: {
      country: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
    },
    required: true,
  },
  ticketPrice: {
    type: Number,
    required: true,
  },
  relatedEvents: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "event",
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

const getByDetails = async (data) => {
  try {
    const reg = new RegExp(data, "i");
    // i flag makes regex case insensitive and no \\b means it just needs to contain the word even if it means in another word
    return await Event.find({ eventDetails: { $regex: reg } }); // query search that matches regular expression
  } catch (err) {
    throw err;
  }
};

const getByCategory = async (category) => {
  try {
    const reg = new RegExp(category); // MUST BE EXACT MATCH
    return await Event.find({ category: { $regex: reg } });
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
  getByDetails,
  getByCategory,
  update,
  remove,
};
