const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    version: { type: String },
    port: { type: String },
    serviceName: { type: String },
    hostName: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Services", serviceSchema);
