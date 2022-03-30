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
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const passport = require("passport");
const {
  FunctionInstance,
} = require("twilio/lib/rest/serverless/v1/service/function");
const res = require("express/lib/response");
//setting up passport
const googleUser = "";
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:4000/api/auth/google/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      googleUser = profile.id;
      return done(err, profile);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

//register route callback
async function register(req, res) {
  const record = req.body;

  try {
    const userExist = await User.exists({ email: record.email });
    if (userExist) {
      return res.status(400).send({ msg: "user already registered" });
    }
    //process.env.Salt
    const hashedPassword = await bcrypt.hash(record.password, 10);
    var newUser = await User.create({
      name: record.name,
      email: record.email,
      password: hashedPassword,
      phone: parseInt(record.phone),
    });

    // const token = await generateToken(newUser);

    // newUser.token = token;
    console.log("user created");
    res.json({
      message: "User [" + record.name + "] registered successfully!",
    });
    // res.send(newUser);
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
  const phone = req.body.phone;
  console.log(phone);
  const otp = Math.floor(100000 + Math.random() * 900000);
  const data = `${phone}.${otp}`;
  const hash = crypto.createHmac("sha256", smsKey).update(data).digest("hex");
  const userExist = await User.exists({ phone: phone });

  if (!userExist) {
    return res.status(400).send({ msg: "Phone not registered" });
  } else {
    const userOtp = await User.findOneAndUpdate(
      { phone: phone },
      { $set: { otp: hash } },
      { new: true }
    );
  }
  console.log(userExist);

  try {
    const response = await client.messages.create({
      body: `Your one time login password for login is ${otp}`,
      from: +15512092997,
      to: `+91${phone}`,
    });
    console.log(response);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }

  return res.status(200).send({ phone, otp });
}

async function verifyotp(req, res) {
  const phone = req.body.phone;
  const otp = req.body.otp;
  console.log(phone, " ", otp);

  const data = `${phone}.${otp}`;
  const newCalculatedHash = crypto
    .createHmac("sha256", smsKey)
    .update(data)
    .digest("hex");

  const userExist = await User.findOne({ phone: phone }).lean();
  const token = await generateToken(userExist);
  if (newCalculatedHash === userExist.otp) {
    return res.status(200).json({
      ...userExist,
      token,
    });
  } else {
    return res
      .status(400)
      .send({ verification: false, msg: "verification failed" });
  }
}

//oAuth
async function googleAuthenticate(req, res) {
  passport.authenticate("google", { scope: ["email", "profile"] });
}

async function googleRedirect(req, res) {
  passport.authenticate("google", {
    successRedirect: "/api/auth/googlelogin",
  });
}

async function googleLogin() {
  const token = await JWT.sign(
    {
      id: googleUser,
    },
    process.env.Secret,
    {
      expiresIn: 6000000,
    }
  );
  res.send(token);
}

module.exports = {
  register,
  loginemail,
  sendotp,
  verifyotp,
  googleAuthenticate,
  googleRedirect,
  googleLogin,
};
