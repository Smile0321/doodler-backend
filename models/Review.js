const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({

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
  url: {
    type: String,
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  like: {
    type: Number,
  }
});


const Review = mongoose.model("Reviews", reviewSchema);
module.exports = Review;