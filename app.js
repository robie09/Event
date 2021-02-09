const express = require("express");
const app = express();
const db = require("./db/models");
const EventRoute = require("./routes/Events");

//Middleware
app.use(express.json());
app.use("/event/", EventRoute);

db.sequelize.sync();
//db.sequelize.sync({ alter: true });

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
