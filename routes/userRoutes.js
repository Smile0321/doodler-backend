const express = require("express");
const router = express.Router();
const { getUsers, getUserById } = require("../controllers/userControllers");
const { verifyAccessToken, verifyAdmin } = require("../middlewares");

// Routes beginning with /api/users
router.get("/", getUsers);
router.get("/:id",getUserById);

module.exports = router;
