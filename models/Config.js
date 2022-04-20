const mongoose = require("mongoose");

const configSchema = new mongoose.Schema(
  {
    version: { type: String },
    port: { type: String },
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
              max_rate: { type: String },
              client_max_rate: { type: String },
              strategy: { type: String, default: "ip" },
            },
          },
          input_query_strings: { type: [String], _id: false },
          input_headers: { type: [String], _id: false },
          concurrent_calls: { type: String },
          backend: {
            type: [
              {
                _id: false,
                url_pattern: { type: String },
                method: { type: String },
                extra_config: {
                  qos_ratelimit_proxy: {
                    max_rate: { type: String },
                    capacity: { type: String },
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
