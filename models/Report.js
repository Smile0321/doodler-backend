const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({

  email: {
    type: String,
    required: [true, "Please enter your email"],
    trim: true,
    // unique: true
  },
  generation_mode: {
    type: String,
  },
  prompt: {
    type: String,
  },
  width: {
    type: Number,
  },
  height: {
    type: Number,
  },
  url: {
    type: String,
  },
  cfg_scale: {
    type: Number,
  },
  seed: {
    type: Number,
  },
  steps: {
    type: Number,
  },
  iterations: {
    type: Number,
  },
  sampler_name: {
    type: String,
  },
  waitingTime: {
    type: Number,
  },
  status: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Report = mongoose.model("Reports", reportSchema);
module.exports = Report;