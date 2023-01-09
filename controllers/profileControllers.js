const User = require("../models/User");

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json({ user });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}

exports.updateProfile = async (req, res) => {
  try {
    const body = req.body;
    let data;

    if (req.file != null) {
      console.log('not null', req.file.filename)
      data = { ...body, avatar: req.file.filename };
    } else {
      data = { ...body };
    }
    console.log(data, data.id)
    const isExistingEmail = await User.findOne({ _id: { $ne: data.id }, email: body.email });
    if (isExistingEmail == null) {
      const user = await User.findByIdAndUpdate(data.id, data);
      res.status(200).json({ user, msg: "Profile updated successfully" });
    } else {
      return res.status(400).json({ msg: "Already Used Email" });
    }
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}

exports.updateUserByAdmin = async (req, res) => {
  try {
    const body = req.body;
    let data;

    if (req.file != null) {
      console.log('not null', req.file.filename)
      data = { ...body, avatar: req.file.filename };
    } else {
      data = { ...body };
    }
    let id = body.id
    console.log(data, id)
    const user = await User.findByIdAndUpdate(id, data);
    res.status(200).json({ user, avatar: req.file ? req.file.filename : user.avatar, msg: "User updated successfully" });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}