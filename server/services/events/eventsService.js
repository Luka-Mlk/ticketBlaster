const express = require("express");

const config = require("../../pkg/config/config");
const db = require("../../pkg/db/database");
const event = require("../events/handlers/eventsHandler");

db.connect();

const api = express();

api.use(express.json());
api.use(express.urlencoded({ extended: true }));

api.post("/api/event/create-event", event.createEvent);
api.patch("/api/event/:id/update", event.updateEvent);
api.delete("/api/event/delete/:id", event.removeEvent);

api.get("/api/event", event.getAllEvents);
api.get("/api/event/:id", event.getOneEvent);

api.listen(config.get("services").events.port, (err) => {
  if (err) return console.log(err);

  console.log(
    `Service [events] syccessfully started on port: ${
      config.get("services").events.port
    }`
  );
});
