const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const profileRoutes = require("./routes/profileRoutes");
const reportRoutes = require("./routes/reportRoutes");
const reviewRoutes = require("./routes/reviewRoute");

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.static(__dirname + "/public"));
console.log(__dirname + "/public");
// Configurations for "body-parser"
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const mongoUrl = process.env.MONGODB_URL;
mongoose.connect(mongoUrl, (err) => {
  if (err) throw err;
  console.log("Mongodb connected...");
});

// app.get("/", (req, res) => res.json({ msg: "Hello" }));
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/report", reportRoutes);
app.use("/api/review", reviewRoutes);


if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.resolve(__dirname, "../frontend/dist")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"))
  );
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Backend is running on port ${port}`);
});
