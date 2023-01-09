const express = require("express");
const router = express.Router();
const {
  requestGeneration,
  getRequests,
  updateStatus,
  updateStatusWithEmail,
  getImageDatail,
  getURLsByEmail,
  getDataByURL,
  deleteByURL
} = require("../controllers/reportControllers");

// Routes beginning with /api/users
router.get("/", getRequests);
router.post("/image-detail", getImageDatail);
router.post("/getURLsByEmail", getURLsByEmail);
router.post("/getDataByURL", getDataByURL);
router.post("/deleteByURL", deleteByURL);
router.post("/", requestGeneration);
router.put("/readyWithEmail", updateStatusWithEmail);
router.put("/", updateStatus);

module.exports = router;
