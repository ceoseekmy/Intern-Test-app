require("dotenv").config();
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const { generateToken } = require("../middlewares/JWT");
//register route callback
async function register(req, res) {
  const record = req.body;

  try {
    const userExist = await User.exists({ email: record.email });

    //process.env.Salt
    const hashedPassword = await bcrypt.hash(record.password, 10);
    var newUser = await User.create({
      name: record.name,
      email: record.email,
      password: hashedPassword,
      phone: parseInt(record.phone),
    });

    const token = await generateToken(newUser);

    newUser.token = token;

    res.send(newUser);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function loginemail(req, res) {
  const record = req.body;
  const userExist = await User.findOne({ email: record.email }).lean();

  if (!userExist) {
    return res.status(400).json({ msg: "Invalid Credentials" });
  }

  const isMatch = await bcrypt.compare(record.password, userExist.password);

  if (!isMatch) {
    return res.status(400).json({ msg: "Invalid Credentials" });
  }

  const token = await generateToken(userExist);
  res.json({
    ...userExist,
    token,
  });
}

module.exports = { register, loginemail };
