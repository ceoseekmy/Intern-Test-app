const {
  register,
  loginemail,
  sendotp,
  verifyotp,
} = require("../controller/auth.controller");

const authRouter = require("express").Router();

authRouter.post("/signup", register);
authRouter.post("/loginemail", loginemail);
authRouter.post("/sendotp", sendotp);
authRouter.post("/verifyotp", verifyotp);
module.exports = authRouter;
