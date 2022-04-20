const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

const createApiRoute = require("./routes/createApi");
const servicesRoute = require("./routes/services");
const endpointServicesRoute = require("./routes/endpointServices");
const configRoute = require("./routes/config");

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

const url = process.env.MONGO_URL;
mongoose
  .connect(url)
  .then(() => console.log("db connected successfully"))
  .catch((err) => console.log(err));

app.use("/create_api", createApiRoute);
app.use("/services", servicesRoute);
app.use("/endpoint_services", endpointServicesRoute);
app.use("/config", configRoute);

const PORT = process.env.PORT_NUMBER;
app.listen(PORT, () => console.log(`Server running on ${PORT}`)); //string literals
