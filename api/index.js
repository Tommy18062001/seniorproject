const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const bcrypt = require("bcryptjs");
const bcryptSalt = bcrypt.genSaltSync(10);

const jwt = require("jsonwebtoken");
const jwtSecret = "ksdjflsgjlkgjlsrotz";

const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const multer = require("multer");
const fs = require("fs");

dotenv.config();
// require the models
const User = require("./models/User");
const Place = require("./models/Place");

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
  console.log({ name, email, password });
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
  const { email, password } = req.body;
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
      res.status(422).json("password incorrect");
    }
  } else {
    res.json("not found");
  }
});

app.get("/userData", (req, res) => {
  // in order to use Jwt we need the token
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { name, email, _id, profilePic } = await User.findById(userData.id);
      res.json({ name, email, _id, profilePic });
    });
  } else {
    res.json(null);
  }
});

app.post("/signout", (req, res) => {
  // reset the cookie
  res.cookie("token", "").json(true);
});

// user profile Picture Upload
const uploadMiddleware = multer({ dest: "uploads/" });
app.post("/upload", uploadMiddleware.single("profilePic"), (req, res) => {
  const { originalname, path } = req.file;

  // grab the extension of the file
  const splittedName = originalname.split(".");
  const ext = splittedName[splittedName.length - 1];

  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);
  res.json(newPath.replace("uploads\\", ""));
});

// place photos upload
app.post("/uploadPhotos", uploadMiddleware.array("photos", 50), (req, res) => {
  const uploadedPhotos = [];
  for (let i = 0; i < req.files.length; i++) {
    const { originalname, path } = req.files[i];
    const splittedName = originalname.split(".");
    const ext = splittedName[splittedName.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadedPhotos.push(newPath.replace("uploads\\", ""));
  }
  res.json(uploadedPhotos);
});

app.put("/userData", async (req, res) => {
  const { token } = req.cookies;
  const { id, name, email, profilePic } = req.body;
  console.log(name, email, profilePic);
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const userDoc = await User.findById(userData.id);

      if (userDoc._id == id) {
        userDoc.set({
          name: name,
          email: email,
          profilePic: profilePic,
        });
        await userDoc.save();
        console.log("we finished here");
      }
      res.json("save");
    });
  } else {
    res.json(null);
  }
});

app.post("/newPlace", (req, res) => {
  const {
    title,
    location,
    lastModified,
    description,
    maxGuests,
    photos,
    price,
    rating,
  } = req.body;

  // console.log(title,
  //   location,
  //   lastModified,
  //   description,
  //   maxGuests,
  //   photos,
  //   price)

  const { token } = req.cookies;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;

    // at this point we should get the user information
    const placeDoc = await Place.create({
      owner: userData.id,
      title,
      location,
      photos: photos,
      lastModified: lastModified,
      description,
      maxGuests,
      price,
      rating: rating,
    });
    res.json(placeDoc);
  });
});

app.get("/placeData", async (req, res) => {
  const placeData = await Place.find();
  res.json(placeData);
});

app.get("/placeData/:id", async (req, res) => {
  const { id } = req.params;
  const placeData = await Place.findById(id);
  res.json(placeData);
});

app.put("/editPlace/:id", async (req, res) => {
  const { id } = req.params;
  const {
    title,
    location,
    lastModified,
    description,
    maxGuests,
    photos,
    price,
    rating,
  } = req.body;
  const { token } = req.cookies;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.findById(id);

    if (userData.id === placeDoc.owner.toString()) {
      placeDoc.set({
        title,
        location,
        photos: photos,
        lastModified: lastModified,
        description,
        maxGuests,
        price,
        rating: rating,
      });
      await placeDoc.save();
      res.json(placeDoc);
    }
  });
});

app.delete("/placeData/:id", async (req, res) => {
  const { id } = req.params;
  const placeData = await Place.deleteOne({ _id: id });
  res.status(202).json("Place Deleted Successfully");
});

app.listen(4000);
