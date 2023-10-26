const mongoose = require("mongoose");
const { Schema } = mongoose;

const BookingSchema = new Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  placeId: { type: mongoose.Schema.Types.ObjectId, ref: "Place" },
  lastModified: String,
  selectedDate: String,
  guests: Number,
  price: Number,
  isCancelled: Boolean
});

const BookingModel = mongoose.model("Booking", BookingSchema);

module.exports = BookingModel;
