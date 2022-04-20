const express = require("express");
const router = express.Router();

const CreateApi = require("../models/CreateApi");

router.post("/create", async (req, res) => {
  try {
    const checkContext = await CreateApi.findOne({ context: req.body.context });
    if (checkContext) {
      return res
        .status(409)
        .json({ message: `context  \"${req.body.context}\" already exist!` });
    }

    const newCreateApi = new CreateApi({
      apiname: req.body.apiname,
      context: req.body.context,
      version: req.body.version,
      endpoint: req.body.endpoint,
    });
    const saved = await newCreateApi.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const api = await CreateApi.find();
    console.log(test);
    res.status(200).json(test);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
