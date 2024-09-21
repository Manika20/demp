const express = require("express");
const router = express.Router();

router.use("/run-fifo", require("./run-fifo"));

//console.log("Router Loaded");
module.exports = router;
