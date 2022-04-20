const express = require("express");
const Services = require("../models/Services");
const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const newServiceApi = new Services({
      version: req.body.version,
      port: req.body.port,
      serviceName: req.body.serviceName,
      hostName: req.body.hostName,
    });
    const saved = await newServiceApi.save();
    res.status(201).json({ saved, message: "services config created" });
  } catch (error) {
    res.status(500).json({ error, message: "check with the code for eroors" });
  }
});

module.exports = router;
