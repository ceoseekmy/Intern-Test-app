const { register } = require("../controller/auth.controller");

const authRouter = require("express").Router();

authRouter.post("/signup", register);

module.exports = authRouter;
