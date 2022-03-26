const Router = require("express").Router();

Router.get("", (req, res) => {
  res.send("Welcome to Seekmy-chat app");
});

module.exports = Router;
