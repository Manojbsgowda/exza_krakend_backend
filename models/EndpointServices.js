const mongoose = require("mongoose");

const endpointSchema = new mongoose.Schema(
  {
    endpoint: { type: String },
    method: { type: String },
    extra_config: {
      qos_ratelimit_router: {
        max_rate: { type: String },
        client_max_rate: { type: String },
        strategy: { type: String, default: "ip" },
      },
    },
    input_query_strings: { type: [String] },
    input_headers: { type: Array },
    concurrent_calls: { type: String },
    backend: {
      type: [
        {
          url_pattern: { type: String },
          method: { type: String },
          extra_config: {
            qos_ratelimit_proxy: {
              max_rate: { type: String },
              capacity: { type: String },
            },
          },
          host: { type: [String] },
        },
      ],
    },
    servicesId: { type: String, ref: "Services" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("EndpointServices", endpointSchema);
