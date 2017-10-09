var express = require('express');
var app = express();
var port = process.env.port || 3000;

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

var mysql = require('mysql');

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

app.post("/", function(req, res){
    console.log("You've sent " + req.body.name);
    connection.query("INSERT INTO burgers (name) VALUES (?)", [req.body.name], function(err, results){
        if (err){
            throw err;
        }
        res.redirect("/");
    })
});

app.put("/", function(req, res) {
    connection.query("UPDATE burgers SET name = ? WHERE id = ?", [req.body.name, req.params.id], function(err, result) {
      if (err) {
        // If an error occurred, send a generic server faliure
        return res.status(500).end();
      } else if (result.changedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  });

app.listen(port, function(){
    console.log("http://localhost:" + port);
});