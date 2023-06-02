const event = require("../../../pkg/models/event/event.js");

const createEvent = async (req, res) => {
  try {
    const newEvent = await event.create(req.body);
    return res.status(201).send(newEvent);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
};

const getAllEvents = async (req, res) => {
  try {
    const events = await event.getAll();
    return res.status(200).send(events);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
};

const getOneEvent = async (req, res) => {
  try {
    const singleEvent = await event.getOne(req.params.id);
    return res.status(200).send(singleEvent);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
};

const updateEvent = async (req, res) => {
  try {
    const updatedEvent = event.update(req.params.id, req.body);
    res.status(204).send(updatedEvent);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
};

const removeEvent = async (req, res) => {
  try {
    const removedEvent = event.remove(req.params.id);
    res.status(204).send(removedEvent);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getOneEvent,
  updateEvent,
  removeEvent,
};
