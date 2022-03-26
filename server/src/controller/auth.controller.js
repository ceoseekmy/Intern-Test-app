require("dotenv").config();
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const crypto = require("crypto");
const { generateToken } = require("../middlewares/JWT");
//setting up twilio
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
const smsKey = process.env.SMS_SECRET_KEY;

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

//login using email and password
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

//login using phone number and otp
async function sendotp(req, res) {
  const phone = `${91}${req.body.phone}`;
  const otp = Math.floor(100000 + Math.random() * 900000);
  const ttl = 5 * 60 * 1000;
  const expires = Date.now() + ttl;
  const data = `${phone}.${otp}.${expires}`;
  const hash = crypto.createHmac("sha256", smsKey).update(data).digest("hex");
  const fullHash = `${hash}.${expires}`;

  try {
    const response = await client.messages.create({
      body: `Your one time login password for login is ${otp}`,
      from: +15512092997,
      to: +919422803010,
    });
    // console.log(response);
  } catch (error) {
    res.status(400).send(error.message);
  }

  res.status(200).send({ phone, hash: fullHash });
}

module.exports = { register, loginemail, sendotp };
