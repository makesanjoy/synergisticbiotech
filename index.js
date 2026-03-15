const express = require("express");
const ejs = require("ejs");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

const isNetlify = !!process.env.LAMBDA_TASK_ROOT;
const basePath = isNetlify ? process.env.LAMBDA_TASK_ROOT : __dirname;
const viewsPath = path.join(basePath, "views");
const publicPath = path.join(basePath, "public");

app.set('views', viewsPath);
app.engine('ejs', ejs.renderFile);
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(publicPath));

// Optional: configure DB using env var; keep commented if local static deployment is enough
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
}

const formSchema = new mongoose.Schema({
  Name: String,
  Number: Number,
  Email: String
});
const Form = mongoose.model("Form", formSchema);

app.get("/", function (req, res) {
  res.render("home", {});
});
app.get("/product", function (req, res) {
  res.render("product", {

  });

});
app.get("/contact", function (req, res) {
  res.render("contact", {

  });

});
app.post("/", function (req, res) {
  const form = new Form({
    Name: req.body.formName,
    Number: req.body.number,
    Email: req.body.email,
  });

  form.save(function (err) {
    if (!err) {
      res.redirect("/");
    } else {
      res.status(500).send("Error saving form");
    }
  });
});

module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, function () {
    console.log("Server started on port " + PORT);
  });
}