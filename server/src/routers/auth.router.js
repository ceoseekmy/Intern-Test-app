const {
  register,
  loginemail,
  sendotp,
  verifyotp,
  googleAuthenticate,
  googleRedirect,
  googleLogin,
} = require("../controller/auth.controller");

const authRouter = require("express").Router();

authRouter.post("/signup", register);
authRouter.post("/loginemail", loginemail);
authRouter.post("/sendotp", sendotp);
authRouter.post("/verifyotp", verifyotp);
authRouter.get("/google", googleAuthenticate);
authRouter.get("/google/callback", googleRedirect);
authRouter.get("/googlelogin", googleLogin);
module.exports = authRouter;
