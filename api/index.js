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
const Review = require("./models/Review");
const Booking = require("./models/Booking");

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

//**************************************************ACCOUNT AUTH*************************************************//
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  console.log({ name, email, password });
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
      isAdmin: false,
      profilePic: "placeholder.png",
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
          res
            .cookie("token", token, {
              httpOnly: true,
              path: "/",
              maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
            })
            .json(userDoc);
        }
      );
    } else {
      res.status(422).json("password incorrect");
    }
  } else {
    res.json("not found");
  }
});

app.post("/signout", (req, res) => {
  // reset the cookie
  res.cookie("token", "").json(true);
});

//**************************************************USER ENDPOINTS*************************************************//
app.get("/userData", (req, res) => {
  // in order to use Jwt we need the token
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { name, email, _id, profilePic, isAdmin } = await User.findById(
        userData.id
      );
      res.json({ name, email, _id, profilePic, isAdmin });
    });
  } else {
    res.json(null);
  }
});

app.get("/userData/:id", async (req, res) => {
  const { id } = req.params;
  const userData = await User.findById(id);
  res.json(userData);
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

//**************************************************PICTURES UPLOAD*************************************************//
// delete image
app.delete("/delete/:filename", (req, res) => {
  const { filename } = req.params;
  console.log(filename);
  fs.unlinkSync("uploads/" + filename);
  res.status(202).json("Image Deleted Successfully");
});

//**************************************************PLACE ENDPOINTS*************************************************//
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

  const { token } = req.cookies;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;

    // at this point we should get the user information
    console.log("i finally got here");
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

app.get("/placeData/top", async (req, res) => {
  const placeData = await Place.find();
  res.json(
    placeData.sort(function (a, b) {
      return b.rating - a.rating;
    })
  );
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

//**************************************************REVIEW ENDPOINTS*************************************************//
app.get("/reviewData", async (req, res) => {
  const reviewData = await Review.find();
  res.json(reviewData);
});

app.get("/reviewData/top", async (req, res) => {
  const reviewData = await Review.find();
  res.json(
    reviewData.sort(function (a, b) {
      return b.rating - a.rating;
    })
  );
});

// reviews endpoints
app.get("/reviewData/:id", async (req, res) => {
  const { id } = req.params;
  const reviewData = await Review.find({ placeId: id });
  res.json(reviewData);
});

app.post("/newReview", (req, res) => {
  const { id, reviewText, lastModified, rating } = req.body;

  const { token } = req.cookies;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const reviewDoc = await Review.create({
      owner: userData.id,
      placeId: id,
      lastModified,
      reviewText,
      rating: parseInt(rating),
    });
    res.json(reviewDoc);
  });
});

//**************************************************BOOKING ENDPOINTS***µµ******************************************//
app.post("/newBooking", (req, res) => {
  const { id, date, guests, lastModified, price } = req.body;
  const { token } = req.cookies;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    console.log("here i got authenticated");
    if (err) throw err;
    console.log("I passed the error");
    const bookingDoc = await Booking.create({
      owner: userData.id,
      placeId: id,
      selectedDate: date,
      guests,
      lastModified,
      price,
      isCancelled: false,
    });
    console.log("i am all done here");
    res.json(bookingDoc);
  });
});

// update the booking status
app.put("/bookingStatus/:id", async (req, res) => {
  const { id } = req.params;
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const userDoc = await User.findById(userData.id);
      const bookingDoc = await Booking.findById(id);

      if (userDoc._id == bookingDoc.owner.toString()) {
        bookingDoc.set({
          isCancelled: true,
        });
        await bookingDoc.save();
      }
      res.json("Booking Cancelled");
    });
  } else {
    res.json(null);
  }
});

// update the booking information
app.put("/bookingData/:id", async (req, res) => {
  const { date, guests, lastModified, price } = req.body;
  const { id } = req.params;
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const userDoc = await User.findById(userData.id);
      const bookingDoc = await Booking.findById(id);

      if (userDoc._id == bookingDoc.owner.toString()) {
        bookingDoc.set({
          selectedDate: date,
          lastModified: lastModified,
          guests,
          price,
        });
        await bookingDoc.save();
      }
      res.json("Booking Information Updated");
    });
  } else {
    res.json(null);
  }
});

app.delete("/bookingData/:id", async (req, res) => {
  const { id } = req.params;
  const bookingsData = await Booking.deleteOne({ _id: id });
  res.status(202).json("Booking Deleted Successfully");
});

// get the list of all bookings made
app.get("/bookingsData", async (req, res) => {
  const bookingsData = await Booking.find();
  res.json(bookingsData);
});

// get the list of booking depending on the owner/user
app.get("/bookingsData/:id", async (req, res) => {
  const { id } = req.params;
  const bookingsData = await Booking.find({ owner: id });
  res.json(bookingsData);
});

// get a specific booking with its ID
app.get("/bookingData/:id", async (req, res) => {
  const { id } = req.params;
  const bookingData = await Booking.findOne({ _id: id });
  res.json(bookingData);
});

//***********************************************PORT DECLARATION*************************************************//
app.listen(4000, console.log("The server is running"));
