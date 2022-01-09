const express = require("express");
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

const PORT = process.env.PORT || 4000;

// middleware
app.use(cors());
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send("Webhook listening to requests");
});

app.post("/webhook", async (req, res) => {
  const requestPayload = req.body;
  const countryCode = requestPayload.billing_address.country_code;

  const possibleValues = ["ME", "RS", "BA"];

  if (possibleValues.includes(countryCode)) {
    await axios.post("YOUR URL", requestPayload);
    return res.json({ success: true, message: "country code match" });
  }

  return res.json({ success: false, message: "country code did not match" });
});

app.listen(PORT, () => console.log("Server started on port " + PORT));
