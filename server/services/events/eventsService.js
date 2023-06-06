const express = require("express");

const config = require("../../pkg/config/config");
const db = require("../../pkg/db/database");
const event = require("../events/handlers/eventsHandler");

db.connect();

const api = express();

api.use(express.json());
api.use(express.urlencoded({ extended: true }));

api.post("/api/create-event", event.createEvent);
api.post("/api/:id/update", event.updateEvent);
api.post("/api/delete/:id", event.removeEvent);

api.get("/api/events", event.getAllEvents);
api.get("/api/:id", event.getOneEvent);

api.listen(config.get("services").events.port, (err) => {
  if (err) return console.log(err);

  console.log(
    `Service [events] syccessfully started on port: ${
      config.get("services").events.port
    }`
  );
});
