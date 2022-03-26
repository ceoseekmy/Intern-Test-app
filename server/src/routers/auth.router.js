const {
  register,
  loginemail,
  sendotp,
} = require("../controller/auth.controller");

const authRouter = require("express").Router();

authRouter.post("/signup", register);
authRouter.post("/loginemail", loginemail);
authRouter.post("/sendotp", sendotp);
module.exports = authRouter;
