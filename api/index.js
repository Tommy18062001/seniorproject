const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const bcrypt = require("bcryptjs");
const bcryptSalt = bcrypt.genSaltSync(10);

const jwt = require('jsonwebtoken');
const jwtSecret = "ksdjflsgjlkgjlsrotz";

const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
// require the models
const User = require("./models/User");

const corsOptions = {
  origin: true,
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

// connect to mongoose
mongoose.connect(process.env.MONGO_URL);

if (mongoose.connect(process.env.MONGO_URL)) {
  console.log(mongoose.connection.readyState);
}

// parse Json
app.use(express.json());
// parse cookies
app.use(cookieParser());
// allow frontend app to access images
app.use("/uploads", express.static(__dirname + "/uploads"));
// fix cors permission
app.use(cors(corsOptions));

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  console.log({name, email, password})
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
      isAdmin: false,
    });
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});

app.post("/signin", async (req, res) => {
  const {email, password} = req.body;
  const userDoc = await User.findOne({ email });

  if (userDoc) {
    // if the user exists, check if the password is correct
    const passwordOk = bcrypt.compareSync(password, userDoc.password);
    if (passwordOk) {
      // use jwt to login
      jwt.sign(
        { email: userDoc.email, id: userDoc._id },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(userDoc);
        }
      );
    } else {
      res.json(422).json("password incorrect");
    }
  } else {
    res.json("not found");
  }
})

app.get('/signup', (req, res) => {
  res.json('ok')
})

app.listen(4000);
