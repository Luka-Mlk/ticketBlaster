const fs = require("fs");

const CONFIG_SOURCE = `${__dirname}/config.json`;

let config = null;

if (config === null) {
  const file = fs.readFileSync(CONFIG_SOURCE, "utf-8");
  config = JSON.parse(file);
}

const get = (section) => {
  if (!config[section]) {
    console.log(`Configuration section ${section} doesn't exist`);
  }
  return config[section];
};

module.exports = {
  get,
};
