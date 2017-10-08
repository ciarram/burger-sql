var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var app = express();
var port = process.env.port || 8080;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

var connection = mysql.createConnection({
    user: 'root',
    database: 'burger_db'
});

connection.connect(function(err){
    if (err){
        console.log("error connecting:" + err.stack);
        return;
    }    
    console.log("connected as id" + connection.threadId);
});

app.get("/", function(req, res){
    connection.query("SELECT * FROM burgers", function(err, data){
        if (err){
            throw err;
        }
        console.log(data);
        res.render("index", {burgers: data});
    });
});

app.post("/", function( req, res){
    console.log("You've sent " + req.body.newBurger);
    connection.query("INSERT INTO burgers (newBurger) VALUES ?", [req.body.newBurger], function(err, results){
        if (err){
            throw err;
        }
        res.redirect("/");
    })
});

app.listen(port, function(){
    console.log("http://localhost:" + port);
});