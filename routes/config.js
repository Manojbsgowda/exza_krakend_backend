const express = require("express");
const Config = require("../models/Config");
const router = express.Router();
const fs = require("fs");

router.post("/create", async (req, res) => {
  try {
    console.log("req.body data", req.body);
    const newConfig = new Config(req.body);
    console.log(newConfig);

    const saved = await newConfig.save();

    const { _id, createdAt, updatedAt, __v, ...info } = saved._doc;

    if (saved == {}) {
      res.status(404).json("No data available");
    }
    var jsonContent = await JSON.stringify(info, null, 2);

    fs.writeFile(`krakend.json`, jsonContent, "utf8", function (err) {
      if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return res.json(err);
      }
    });

    res.status(201).json({ data: saved, message: "Succesfully created" });
  } catch (error) {
    res.status(500).json({ error, message: "/create" });
  }
});

router.get("/download", async (req, res) => {
  try {
    const file = `krakend.json`;
    res.download(file);
  } catch (error) {
    res.status(500).json({ error, message: "/download" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const configData = await Config.findById(req.params.id);
    res.status(200).json(configData);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
