const mongoose = require("mongoose");
const config = require("../config/config");

const connect = () => {
  const url = config.get("db").url;
  const username = config.get("db").username;
  const password = config.get("db").password;
  const connURL = `mongodb+srv://${username}:${password}@${url}?retryWrites=true&w=majority`;
  // mongoose.connect(connURL, (err) => {
  //   if (err) {
  //     return console.log("Couldn't connect to database \r", err);
  //   }
  //   console.log("Connected to database");
  // });
  mongoose
    .connect(connURL)
    .then(console.log(`Connected to database`))
    .catch((err) => {
      console.log("Error connecting to db \n", err);
    });
};

module.exports = {
  connect,
};
