var mongoose = require('mongoose'),
db_url = 'localhost/prueba1';
db = mongoose.createConnection(db_url);


var schema_Usuario = require('./Model/Usuario.js');
Usuario = db.model('Usuario', schema_Usuario);

var schema_Registro = require('./Model/Registro.js');
Registro = db.model('Registro', schema_Registro);

var schema_Prestamo = require('./Model/Prestamo.js');
Prestamo = db.model('Prestamo', schema_Prestamo);

var schema_Item = require('./Model/Item.js');
Item = db.model('Item', schema_Item);

var schema_Elemento = require('./Model/Elemento.js');
Elemento = db.model('Elemento', schema_Elemento);

console.log((db));
module.exports=db;
module.exports=mongoose;