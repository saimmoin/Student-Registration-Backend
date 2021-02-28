var express = require("express");
const bodyParser = require("body-parser");
cors = require("cors");
var app = express();

app.use(express.json());

app.use(cors());

app.get("/", function (req, res, next) {
  res.json({ response: "Please call some function e.g. /student" });
});

app.get("/student", (req, res) => {
  console.log("In register method (GET)");
});

app.post("/student", function (req, res, next) {
  console.log("In register method (POST)");
  const { Sequelize, Model, DataTypes } = require("sequelize");
  const sequelize = new Sequelize("student_registration", "root", "", {
    dialect: "mysql",
  });

  class Registration extends Model {}
  Registration.init(
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: DataTypes.STRING,
      class: DataTypes.INTEGER,
      section: DataTypes.STRING,
    },
    { sequelize, modelName: "student_registration" }
  );

  const newStudent = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    class: req.body.class,
    section: req.body.section,
  };

  sequelize

    .sync()
    .then(() => Registration.create(newStudent))

    .then((obj) => {
      console.log(obj.toJSON());
    });
  res.json({ response: "Registeration is successful" });
});

app.listen(8081, () => {
  console.log("application is running on port 8081");
});
module.exports = app;
