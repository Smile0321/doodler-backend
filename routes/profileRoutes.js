const express = require("express");
const router = express.Router();
const { verifyAccessToken } = require("../middlewares");
const { getProfile, updateProfile, updateUserByAdmin } = require("../controllers/profileControllers");
const multer = require('multer');

// Routes beginning with /api/profile
router.get("/", getProfile);
router.put("/updateUserByAdmin",   updateUserByAdmin);
router.put("/", updateProfile);


module.exports = router;
