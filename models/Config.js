const mongoose = require("mongoose");

const configSchema = new mongoose.Schema(
  {
    version: { type: Number },
    port: { type: Number },
    serviceName: { type: String },
    // hostName: { type: [String], required: true },
    endpoints: {
      type: [
        {
          _id: false,
          endpoint: { type: String },
          method: { type: String },
          extra_config: {
            qos_ratelimit_router: {
              max_rate: { type: Number },
              client_max_rate: { type: Number },
              strategy: { type: String, default: "ip" },
            },
          },
          input_query_strings: { type: [String], _id: false },
          input_headers: { type: [String], _id: false },
          concurrent_calls: { type: Number },
          backend: {
            type: [
              {
                _id: false,
                is_collection: { type: Boolean, default: true },
                url_pattern: { type: String },
                method: { type: String },
                extra_config: {
                  qos_ratelimit_proxy: {
                    max_rate: { type: Number },
                    capacity: { type: Number },
                  },
                },
                host: { type: [String], _id: false },
              },
            ],
          },
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Config", configSchema);
