const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobileNumber: {
    type: Number,
    // required: true
  },
  password: {
    type: String,
    // required: true
  },
  status: {
    type: String,
    default: 1,
    // 1 pending
    // 2 verifiedUser
    // deActivated
  },
  otp: {
    type: String,
  },
  createdOn: {
    type: Date,
    default: new Date(),
  },
  role: {
    type: Number,
    default: 3,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

const USERS = mongoose.model("user", userSchema);

module.exports = USERS;
