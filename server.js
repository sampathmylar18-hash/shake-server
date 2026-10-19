const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const alerts = {};

app.get("/", (req, res) => res.send("Shake for life server is running"));

app.post("/api/location", (req, res) => {
  const { alertId, lat, lng } = req.body;
  if (!alertId || lat == null || lng == null) {
    return res
      .status(400)
      .json({ error: "alertId , lat and lng are required" });
  }
  alerts[alertId] = { lat, lng, time: Date.now() };
  console.log("received : ", alertId, lat, lng);
  res.json({ ok: true });
});

app.get("/api/location/:alertId", (req, res) => {
  const data = alerts[req.params.alertId];
  if (!data) return res.status(404).json({ error: "no such alert" });
  res.json(data);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("server on port " + PORT));
