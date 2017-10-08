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

app.listen(port, function(){
    console.log("http://localhost:" + port);
})