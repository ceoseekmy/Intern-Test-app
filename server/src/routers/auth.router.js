const { register, loginemail } = require("../controller/auth.controller");

const authRouter = require("express").Router();

authRouter.post("/signup", register);
authRouter.post("/loginemail", loginemail);
module.exports = authRouter;
