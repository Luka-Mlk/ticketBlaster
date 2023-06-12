const event = require("../../../pkg/models/event/event.js");

const createEvent = async (req, res) => {
  try {
    if (req.auth.admin) {
      const newEvent = await event.create({
        eventName: req.body.eventName,
        category: req.body.category,
        date: req.body.date,
        imagePath: req.body.imagePath,
        eventDetails: req.body.eventDetails,
        ticketPrice: req.body.ticketPrice,
        relatedEvents: req.body.relatedEvents,
      });
      // return res.status(201).send(newEvent);
      return res.status(201).json({
        status: "success",
        event: newEvent,
      });
    }
    // return res.status(400).send("Incorrect privileges");
    return res.status(400).json({
      status: "failed",
      error: "Incorrect privileges",
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

const getAllEvents = async (req, res) => {
  try {
    const events = await event.getAll();
    // return res.status(200).send(events);
    return res.status(200).json({
      status: "success",
      events,
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

const getOneEvent = async (req, res) => {
  try {
    const singleEvent = await event.getOne(req.params.id);
    // return res.status(200).send(singleEvent);
    return res.status(200).json({
      status: "success",
      singleEvent,
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

const updateEvent = async (req, res) => {
  try {
    if (req.auth.admin) {
      const updatedEvent = event.update(req.params.id, req.body);
      // res.status(204).send(updatedEvent);
      return res.status(204).json({
        status: "success",
        updatedEvent,
      });
    }
    // return res.status(400).send("Incorrect privileges");
    return res.status(400).json({
      status: "failed",
      error: "Incorrect privileges",
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

const removeEvent = async (req, res) => {
  try {
    if (req.auth.admin) {
      const removedEvent = event.remove(req.params.id);
      // return res.status(204).send(removedEvent);
      return res.status(204).json({
        status: "success",
        removedEvent,
      });
    }
    // res.status(400).send("Incorrect privileges");
    return res.status(400).json({
      status: "failed",
      error: "Incorrect privileges",
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

module.exports = {
  createEvent,
  getAllEvents,
  getOneEvent,
  updateEvent,
  removeEvent,
};
