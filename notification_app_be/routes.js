const express = require("express");
const axios = require("axios");
const router = express.router();
const Log = require("../logging_middleware/logger");
router.get("/", async (req, res) => {
  await Log(
    "Backend",
    "info",
    "route",
    "home route accessed");
res.json({
    message: "backend working yeah"
  });
});
router.get("/notifications", async (req, res) => {
  await Log(
    "backend",
    "info",
    "controller",
    "Fetching Notifications");
  res.json({
    Notifications: [
      {   id: 1,
        title: "Placement Drive",
        message: "There is a Company drive Tomorrow"},
      {id: 2,
        title: "exam alert",
        message: "internal Exams are next week" } ]
  });
});
module.exports = router;