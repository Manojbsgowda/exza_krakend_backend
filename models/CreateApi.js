const mongoose = require("mongoose");

const CreateApiSchema = new mongoose.Schema(
  {
    apiname: { type: String, required: true },
    context: { type: String, required: true, unique: true },
    version: { type: String, required: true },
    endpoint: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CreateApi", CreateApiSchema);
