const mongoose = require("mongoose");
const Report = require("../models/Report");
const { sendGenImgEmail } = require("../utils/email");
const { CLIENT_BASE_URL, EXPIRED_TIME } = process.env;
// status
// 0: requested, ready to generate
// 1: finished
// 2: expired
// 3: waiting to request
// 4: waiting (iteration > 1)

exports.requestGeneration = async (req, res) => {
  try {
    const {
      email,
      generation_mode,
      prompt,
      width,
      height,
      cfg_scale,
      seed,
      steps,
      iterations,
      sampler_name,
    } = req.body;

    const waitingRequest = await Report.find({ status: 3, email });

    if (
      waitingRequest.length > 0 &&
      waitingRequest.iterations == waitingRequest.length
    ) {
      console.log("waitingRequest", waitingRequest.length);
      const temp = await Report.findByIdAndUpdate(
        { _id: waitingRequest[0]._id },
        { status: 0 }
      );
      res.status(200).json({
        msg: "Successfully Requested.",
        id: waitingRequest[0]._id,
        status: 3,
      });
    } else {
      const new_doc_ids = [];

      for (let i = 1; i <= iterations; i++) {
        const new_doc = await Report.create({
          email,
          generation_mode,
          prompt,
          width,
          height,
          cfg_scale,
          seed,
          steps,
          iterations,
          sampler_name,
        });
        new_doc_ids.push(new_doc._id);
      }

      const processing = await Report.find({ status: 0 });

      if (processing.length == iterations) {
        console.log("processing.length == iterations");
        res
          .status(200)
          .json({ msg: "Successfully Requested.", id: new_doc_ids, status: 1 });
      } else {
        // process Expired Request
        processing.map((request, i) => {
          let createdAt = new Date(request.createdAt).getTime();
          let currentTime = new Date().getTime();

          if (currentTime - createdAt > EXPIRED_TIME) {
            console.log("Expired", request._id);
            Report.findOneAndUpdate(
              { _id: request._id },
              { status: 2 },
              { new: true }
            ).then((err, doc) => {});
          }
        });

        const updated_processing = await Report.find({ status: 0 });

        console.log("updated_processing", updated_processing.length);
        if (updated_processing.length == 1) {
          res.status(200).json({
            msg: "Successfully Requested.",
            id: new_doc_ids,
            status: 1,
          });
        } else {
          res.status(200).json({
            msg: "Successfully Requested.",
            id: new_doc_ids,
            status: 0,
          });
        }
      }
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

exports.getRequests = async (req, res) => {
  try {
    const reports = await Report.find();
    res.status(200).json({ reports });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

exports.updateStatus = async (req, res) => {
  console.log("updateStatus=======================================");
  try {
    const { id, waitingTime, url, txt } = req.body;
    console.log("id", id, url, txt);
    await Report.findByIdAndUpdate(
      { _id: mongoose.Types.ObjectId(id) },
      { status: 1, waitingTime, url }
    );

    const processing = await Report.find({
      status: 0,
    });

    console.log("processing", processing);
    if (processing.length > 0) {
      console.log(" processing[0].email", processing[0].email);
      await Report.findOneAndUpdate({ _id: processing[0]._id }, { status: 3 });
      const email = processing[0].email;
      const url = `${CLIENT_BASE_URL}`;
      sendGenImgEmail(email, url);
    }

    res.status(200).json({ msg: "Successfully Updated." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

exports.updateStatusWithEmail = async (req, res) => {
  console.log("updateStatusWithEmail=================================");
  try {
    const { id, waitingTime, url } = req.body;
    console.log("id", id, url);
    await Report.findByIdAndUpdate(
      { _id: mongoose.Types.ObjectId(id) },
      { status: 1, waitingTime, url }
    );

    const processing = await Report.find({
      status: 0,
    });

    console.log("processing", processing);
    if (processing.length > 0) {
      console.log(" processing[0].email", processing[0].email);
      await Report.findOneAndUpdate({ _id: processing[0]._id }, { status: 3 });
      const email = processing[0].email;
      const url = `${CLIENT_BASE_URL}`;
      sendGenImgEmail(email, url);
    }

    res.status(200).json({ msg: "Successfully Updated." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

exports.getImageDatail = async (req, res) => {
  try {
    const { url } = req.body;

    const reports = await Report.find({ url });
    console.log("getImageDatail", reports);
    res.status(200).json({ data: reports[0] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

exports.getURLsByEmail = async (req, res) => {
  try {
    const { email } = req.body;
    // console.log("getURLsByEmail", email);

    const reports = await Report.find({ email });

    const reportsByEmail = reports.filter((report) => report.email);
    let urlByEmail = [];

    reportsByEmail.map((report) => {
      urlByEmail.push(report.url);
    });

    res.status(200).json({ data: urlByEmail });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

exports.getDataByURL = async (req, res) => {
  try {
    const { url } = req.body;
    console.log("getDataByURL", url);

    const report = await Report.find({ url });
    console.log("report", report);

    res.status(200).json({ data: report[0] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

exports.deleteByURL = async (req, res) => {
  try {
    const { url } = req.body;
    console.log("deleteByURL", url);

    await Report.findOneAndDelete({ url });

    res.status(200).json({ msg: "successfully deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
