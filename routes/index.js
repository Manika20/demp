const express = require("express");
const router = express.Router();
const Controller = require("../controller.js");

router.post("/run-fifo", Controller.fifo);
module.exports = router;
