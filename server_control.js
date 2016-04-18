console.log('Servidor Back - Reto 2');

var http = require('http');
var express = require('express');
var app = express();
var port = 8081;


var General_Service = require('./service.js');
var Usuario_Service = require('./service_usuario.js');
var Registro_Service = require('./service_registro.js');
var Elemento_Service = require('./service_elemento.js');
var Prestamo_Servicie = require('./service_prestamo.js');
var Item_Servicie = require('./service_item.js');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/create/:collection/:v1/:v2/:v3/:v4/:v5',General_Service.create);
app.get('/read/:collection',General_Service.read);
app.get('/read/:collection/:param',General_Service.readX);
app.get('/update/:collection/:v1/:v2/:id',General_Service.update);
app.get('/delete/:collection/:param/:value',General_Service.delete);
app.post('/', General_Service.post);

app.get('/createRegistro/:collection/:v1/:v2/:v3',Registro_Service.createRegistro);

app.get('/readUsuario/:param/:value',Usuario_Service.readUsuario);
app.get('/readUsuario/:param',Usuario_Service.readUsuarioByName);

app.get('/createUsuario/:v1/:v2/:v3/:v4/:v5',Usuario_Service.createUsuario);

app.get('/create/:collection/:v1/:v2',Elemento_Service.create);
app.get('/readElement/:collection',Elemento_Service.read);
app.get('/ElementReadX/:collection/:param/:value', Elemento_Service.readX);

app.get('/prestamoCreate/:collection/:v1/:v2/:v3', Prestamo_Servicie.create);
app.get('/prestamoRead/:collection', Prestamo_Servicie.read);
app.get('/prestamoReadX/:collection/:param/:value', Prestamo_Servicie.readX);

app.get('/CreateItem/:collection/:v1/:v2', Item_Servicie.create);
app.get('/ReadItem/:collection', Item_Servicie.read);
app.get('/itemReadX/:collection/:param/:value', Item_Servicie.readX);

http.createServer(app).listen(port);
console.log("Servidor activo por el puerto " + port);