const express = require("express");
const proxy = require("express-http-proxy");
const cors = require("cors");

const config = require("../../pkg/config/config");

const api = express();

api.use(cors());

const ecommerceProxy = proxy("http://localhost:4996", {
  proxyReqPathResolver: (req) => {
    return `/api/ecommerce${req.url}`;
  },
});

const storageProxy = proxy("http://localhost:4997", {
  proxyReqPathResolver: (req) => {
    return `/api/storage${req.url}`;
  },
});

const usersProxy = proxy("http://localhost:4998", {
  proxyReqPathResolver: (req) => {
    return `/api/user${req.url}`;
  },
});

const eventsProxy = proxy("http://localhost:4999", {
  proxyReqPathResolver: (req) => {
    return `/api/event${req.url}`;
  },
});

api.use("/api/ecommerce", ecommerceProxy);
api.use("/api/storage", storageProxy);
api.use("/api/user", usersProxy);
api.use("/api/event", eventsProxy);

api.listen(config.get("services").proxy.port, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(
    `Service [proxy] has successfully started on port ${
      config.get("services").proxy.port
    }`
  );
});
