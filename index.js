const express = require("express");
const ejs = require("ejs");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


mongoose.connect("mongodb+srv://sanjaysingha:123Machine@cluster0.qffoa.mongodb.net/synergisticFORM?retryWrites=true&w=majority", {useNewUrlParser: true});


const formSchema =new  mongoose.Schema( {
  Name: String,
 Number: Number,
 Email:String
});

const Form = mongoose.model("Form", formSchema);

app.get("/", function(req, res){
res.render("home",{

});

});
app.get("/product", function(req, res){
  res.render("product",{
  
  });
  
  });
  app.get("/contact", function(req, res){
    res.render("contact",{
    
    });
    
    });
    app.post("/", function(req, res){
      const form = new Form({
        Name: req.body.formName,
        Number: req.body.number,
        Email: req.body.email,
      });
    
    
      form.save(function(err){
        if (!err){
            res.redirect("/");
        }
      });
    });




app.listen(3000, function() {
    console.log("Server started on port 3000");
  });