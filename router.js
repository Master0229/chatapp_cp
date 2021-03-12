const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(__dirname + '/template/login.html');
});

module.exports = router;