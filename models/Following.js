const mongoose = require("mongoose");

const followingSchema = new mongoose.Schema({

  email1: {
    type: String,
    required: [true, "Please enter your email"],
    trim: true,
    // unique: true
  },
  email2: {
    type: String,
    required: [true, "Please enter your email"],
    trim: true,
    // unique: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  followed: {
    type: Number,
  }
});


const Following = mongoose.model("Following", followingSchema);
module.exports = Following;