var Schema = require('mongoose').Schema;

var Elemento = new Schema
({
	nombre: String,
	estado: String
});

module.exports = Elemento;