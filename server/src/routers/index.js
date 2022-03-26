const Router = require("express").Router();
const authRouter = require("../routers/auth.router");
Router.get("", (req, res) => {
  res.send("Welcome to Seekmy-chat app");
});
Router.use("/auth", authRouter);
module.exports = Router;
