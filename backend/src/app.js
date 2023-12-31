const createError = require("http-errors");
const express = require("express");

const createScheduleRoute = require("./route/createSchedule");
const fetchScheduleRoute = require("./route/fetchSchedule");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/createSchedule", createScheduleRoute);
app.use("/fetchSchedule", fetchScheduleRoute);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
