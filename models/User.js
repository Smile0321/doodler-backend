const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  email: {
    type: String,
    required: [true, "Please enter your email"],
    trim: true,
    // unique: true
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
  },
  role: {
    type: String,
    default: "user",
    enum: ["admin", "user"]
  },
  joiningTime: {
    type: Date,
    default: Date.now
  },
  accessType: {
    type: Number,
    default: 0
  }
});


const User = mongoose.model("Users", userSchema);
module.exports = User;