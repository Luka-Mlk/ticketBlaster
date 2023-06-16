const event = require("../../../pkg/models/event/event.js");

const createEvent = async (req, res) => {
  try {
    console.log(req.auth);
    if (req.auth.admin) {
      // if user is admin allow event creation
      const newEvent = await event.create({
        // body must have only theese fields
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
    if (typeof req.auth == "undefined" || !req.auth.admin) {
      // if there is no token or token is false return bad request
      // return res.status(400).send("Incorrect privileges");
      return res.status(400).json({
        // if user !admin refuse creation request
        status: "failed",
        error: "Incorrect privileges",
      });
    }
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

const getEventByContent = async (req, res) => {
  try {
    const eventsByContent = await event.getByDetails(req.params.keyword); // returns array of events containing keyword
    return res.status(200).json({
      status: "success",
      eventsByContent,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "failed",
      error: "Internal server error",
    });
  }
};

const getEventByCategory = async (req, res) => {
  try {
    const eventsByCategory = await event.getByCategory(req.params.category);
    return res.status(200).json({
      status: "success",
      eventsByCategory,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "failed",
      error: "Internal server error",
    });
  }
};

const updateEvent = async (req, res) => {
  try {
    if (req.auth.admin) {
      // if user is admin allow update
      const updatedEvent = event.update(req.params.id, req.body);
      // res.status(204).send(updatedEvent);
      return res.status(204).json({
        status: "success",
        updatedEvent,
      });
    }
    // return res.status(400).send("Incorrect privileges");
    return res.status(400).json({
      // if user !admin refuse update request
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
      // if user is admin allow deletion
      const removedEvent = event.remove(req.params.id);
      // return res.status(204).send(removedEvent);
      return res.status(204).json({
        status: "success",
        removedEvent,
      });
    }
    // res.status(400).send("Incorrect privileges");
    return res.status(400).json({
      // if user is not admin refuse delete request
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
  getEventByContent,
  getEventByCategory,
  updateEvent,
  removeEvent,
};
