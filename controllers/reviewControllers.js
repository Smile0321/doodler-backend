const Review = require("../models/Review");
const Following = require("../models/Following");

exports.getLikes = async (req, res) => {
  try {
    const { email, url } = req.body;
    // console.log("getLikes", email, url);
    const data = await Review.find({ email2: email, url, like: 1 });
    return res.status(200).json({ likes: data });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

exports.getLikesByEmail = async (req, res) => {
  try {
    const { email } = req.body;
    // console.log("getLikesByEmail", email);
    const data = await Review.find({ email2: email, like: 1 });
    return res.status(200).json({ likes: data.length });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

exports.getLikesURL = async (req, res) => {
  try {
    const { url } = req.body;
    // console.log("getLikesURL", url);
    const data = await Review.find({ url, like: 1 });
    return res.status(200).json({ likes: data });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

exports.getIslike = async (req, res) => {
  try {
    const { email1, email2, url } = req.body;
    const data = await Review.find({ email1, email2, url });
    if (data.length) {
      return res.status(200).json({ isLike: data[0] });
    } else {
      return res.status(200).json({ isLike: 0 });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

exports.like = async (req, res) => {
  try {
    const { email1, email2, url } = req.body;
    const data = await Review.find({ email1, email2, url });
    if (data.length) {
      await Review.findOneAndUpdate({ email1, email2, url }, { like: 1 });
    } else {
      await Review.create({ email1, email2, url, like: 1 });
    }
    res.status(200).json({ msg: "Successfully followed" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

exports.unlike = async (req, res) => {
  try {
    const { email1, email2, url } = req.body;
    const data = await Review.find({ email1, email2, url });
    if (data.length) {
      await Review.findOneAndUpdate({ email1, email2, url }, { like: 0 });
    } else {
      await Review.create({ email1, email2, url, like: 0 });
    }
    res.status(200).json({ msg: "Successfully unfollowed" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

exports.follow = async (req, res) => {
  try {
    const { email1, email2 } = req.body;
    const data = await Following.find({ email1, email2 });
    if (data.length) {
      await Following.findOneAndUpdate({ email1, email2 }, { followed: 1 });
    } else {
      await Following.create({ email1, email2, followed: 1 });
    }
    res.status(200).json({ msg: "Successfully unfollowed" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

exports.unfollow = async (req, res) => {
  try {
    const { email1, email2 } = req.body;
    const data = await Following.find({ email1, email2 });
    if (data.length) {
      await Following.findOneAndUpdate({ email1, email2 }, { followed: 0 });
    } else {
      await Following.create({ email1, email2, followed: 0 });
    }
    res.status(200).json({ msg: "Successfully unfollowed" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

exports.getFollowByEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const data = await Following.find({ email2: email, followed: 1 });
    if (data.length) {
      return res.status(200).json({ followings: data.length });
    } else {
      return res.status(200).json({ followings: 0 });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

exports.getFollowStatus = async (req, res) => {
  try {
    const { email1, email2 } = req.body;
    const data = await Following.find({ email1, email2 });
    return res
      .status(200)
      .json({ followed: data.length ? data[0].followed : 0 });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

exports.getFollowerByEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const data = await Following.find({ email1: email, followed: 1 });
    if (data.length) {
      return res.status(200).json({ followers: data.length });
    } else {
      return res.status(200).json({ followers: 0 });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
