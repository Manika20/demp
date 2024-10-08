const cors = require("cors");
const express = require("express");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const indexRouter = require("./api/index");
app.use("/", indexRouter);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
