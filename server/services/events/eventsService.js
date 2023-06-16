const express = require("express");
const { expressjwt: jwt } = require("express-jwt");

const config = require("../../pkg/config/config");
const db = require("../../pkg/db/database");
const event = require("../events/handlers/eventsHandler");

db.connect();

const api = express();

api.use(express.json());
api.use(express.urlencoded({ extended: true }));
api.use(
  jwt({
    secret: config.get("security").jwt_secret,
    algorithms: ["HS256"],
  }).unless({
    path: [
      "/api/event/",
      "/api/event/category/:category",
      "/api/event/content/:keyword",
      "/api/event/:id",
    ],
  })
);

api.post("/api/event/create-event", event.createEvent);
api.patch("/api/event/:id/update", event.updateEvent);
api.delete("/api/event/delete/:id", event.removeEvent);

api.get("/api/event", event.getAllEvents); // get all
api.get("/api/event/content/:keyword", event.getEventByContent); // get by keyword
api.get("/api/event/category/:category", event.getEventByCategory);
api.get("/api/event/:id", event.getOneEvent); // get single event

api.listen(config.get("services").events.port, (err) => {
  if (err) return console.log(err);

  console.log(
    `Service [events] syccessfully started on port: ${
      config.get("services").events.port
    }`
  );
});
