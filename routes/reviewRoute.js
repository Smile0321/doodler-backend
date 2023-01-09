const express = require("express");
const router = express.Router();
const {
  like,
  unlike,
  getLikes,
  getIslike,
  getLikesURL,
  follow,
  unfollow,
  getFollowByEmail,
  getFollowStatus,
  getLikesByEmail,
  getFollowerByEmail,
} = require("../controllers/reviewControllers");

// Routes beginning with /api/reviews
router.post("/getlikes", getLikes);
router.post("/getlikesByURL", getLikesURL);
router.post("/getLikesByEmail", getLikesByEmail);
router.post("/getIslike", getIslike);
router.post("/like", like);
router.post("/unlike", unlike);

router.post("/follow", follow);
router.post("/unfollow", unfollow);
router.post("/getFollowByEmail", getFollowByEmail);
router.post("/getFollowerByEmail", getFollowerByEmail);
router.post("/getFollowStatus", getFollowStatus);

module.exports = router;
