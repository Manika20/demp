const express = require("express");
const router = express.Router();
const Controller = require("../controller.js");

// This route should handle POST requests
router.post("/", Controller.fifo); // Change "/run-fifo" to "/" here

module.exports = router;
