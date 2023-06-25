const express = require("express");
const { expressjwt: jwt } = require("express-jwt");

const config = require("../../pkg/config/config");
const db = require("../../pkg/db/database");
const ecommerce = require("./handlers/ecommerceHandler");

db.connect();

const api = express();

api.use(express.json());
api.use(express.urlencoded({ extended: true }));
api.use(
  jwt({
    secret: config.get("security").jwt_secret,
    algorithms: ["HS256"],
  })
);

api.post("/api/ecommerce/checkout", ecommerce.checkOut);
api.get("/api/ecommerce/history", ecommerce.getHistory);

api.listen(config.get("services").ecommerce.port, (err) => {
  if (err) console.log(err);

  console.log(
    `Service [users] successfully started on port: ${
      config.get("services").ecommerce.port
    }`
  );
});
