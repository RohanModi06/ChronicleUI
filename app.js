var express = require("express");
var path = require("path");
var fetch = require("node-fetch");
var session = require("express-session");

var routes = require("./routes");

var app = express();
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));


app.use(express.urlencoded({extended: true}));
app.use(session({secret:'XASDASDA',saveUninitialized:'true'}));

app.use(routes);

app.listen(app.get("port"),()=>{
    console.log("server started on port "+app.get("port"));
});


