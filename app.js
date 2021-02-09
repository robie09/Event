const express = require("express");
const { EventRoute } = require("./routes/Events");
app.use("/", EventRoute);

const app = express();
const db = require("./db/models");
app.use(express.json());

db.sequelize.sync();

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
