console.log('Servidor Front - Reto 2');

var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = 8082;
var path    = require("path");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('Public'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/Public/Views/login.html'));
});


http.createServer(app).listen(port);
console.log("Servidor activo por el puerto " + port);

