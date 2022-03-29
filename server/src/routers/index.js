const Router = require("express").Router();
const authRouter = require("../routers/auth.router");
const chatRouter = require("./chatroom.router");

Router.get("", (req, res) => {
  res.send("Welcome to Seekmy-chat app");
});
Router.use("/auth", authRouter);
Router.use("/chatroom",chatRouter);
module.exports = Router;
