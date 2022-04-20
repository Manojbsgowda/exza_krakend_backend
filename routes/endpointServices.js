const express = require("express");
const EndpointServices = require("../models/EndpointServices");
const Services = require("../models/Services");
const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const newEndpointService = new EndpointServices(req.body);
    const saved = await newEndpointService.save();
    res.status(201).json({ saved, message: "endpoint data saved" });
  } catch (error) {
    res.status(500).json({ error, message: "check with the code for errors" });
  }
});

router.get("/:id", async (req, res) => {
  const serv_id = req.params.id;
  try {
    const serviceConfig = await Services.findOne({
      _id: serv_id,
    }).select(["-_id", "-createdAt", "-updatedAt", "-__v"]);

    const data = await EndpointServices.find({
      servicesId: serv_id,
    }).select([
      "-_id",
      "-backend._id",
      "-servicesId",
      "-createdAt",
      "-updatedAt",
      "-__v",
    ]);

    const d = {};

    res.status(200).json({ ...serviceConfig._doc, endpoints: data });
  } catch (error) {
    res.status(500).json({ error, message: "not getting any value" });
  }
});

module.exports = router;
