const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  isAdmin: Boolean
});

// set up the model
const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;

//mongopassword= XaH6vtRCLEdJZ7LA
