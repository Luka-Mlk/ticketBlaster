const event = require("../../../pkg/models/event/event.js");
const user = require("../../../pkg/models/user/user.js");
const storage = require("../../upload/handlers/storageHandler.js");

const createEvent = async (req, res) => {
  console.log(req.body);
  try {
    if (!req.auth) {
      return res.status(400).json({
        status: "failed",
        error: "Must be logged in to create event",
      });
    }
    if (req.auth.admin) {
      // if user is admin allow event creation
      const newEvent = await event.create({
        // body must have only theese fields
        eventName: req.body.eventName,
        category: req.body.category,
        date: req.body.date,
        imagePath: req.body.imagePath,
        eventDetails: req.body.eventDetails,
        location: req.body.location,
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

const addToCart = async (req, res) => {
  try {
    if (!req.auth) {
      return res.status(400).json({
        status: "failed",
        error: "must be logged in to add to cart",
      });
    }
    const usr = await user.getUserById(req.auth.id);

    const evnt = {
      event: req.params.id,
      numTickets: req.body.numTickets || 1,
    };

    const cartMap = new Map(
      usr.cart.map((item) => [item.event.toString(), item])
    );

    if (cartMap.has(req.params.id)) {
      cartMap.get(req.params.id).numTickets += evnt.numTickets;
    } else {
      usr.cart.push(evnt);
    }

    user.updateUser(req.auth.id, usr);

    return res.status(200).json({
      status: "success",
      modifiedUser: usr,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "failed",
      error: "Internal server error",
    });
  }
};

const removeFromCart = async (req, res) => {
  try {
    if (!req.auth) {
      return res.status(400).json({
        status: "failed",
        error: "must be logged in to remove from cart",
      });
    }
    const usr = await user.getUserById(req.auth.id);

    usr.cart = usr.cart.filter((id) => id.event.toString() !== req.params.id);

    user.updateUser(req.auth.id, usr);

    return res.status(200).json({
      status: "success",
      modifiedUser: usr,
    });
  } catch (err) {
    console.log(err);
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
      console.log(req.body);
      // if user is admin allow update
      const updatedEvent = await event.update(req.params.id, req.body);
      // res.status(204).send(updatedEvent);
      return res.status(200).json({
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
    if (!req.auth) {
      return res.status(400).json({
        status: "failed",
        error: "Must be logged in to remove event",
      });
    }
    if (req.auth.admin) {
      // if user is admin allow deletion
      const selectedEvent = await event.getOne(req.params.id);
      if (selectedEvent.imagePath) storage.removeEvent(selectedEvent.imagePath);
      const removedEvent = event.remove(req.params.id);
      // return res.status(204).send(removedEvent);
      return res.status(200).json({
        status: "success",
        message: "?????",
        // removedEvent,
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
  addToCart,
  removeFromCart,
  getEventByContent,
  getEventByCategory,
  updateEvent,
  removeEvent,
};
