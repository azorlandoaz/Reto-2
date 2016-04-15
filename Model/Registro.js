var Schema = require('mongoose').Schema;

var Registro = new Schema
({
	IdUsuario:String,
	TipoLog:String,
	Fecha:String,
});

module.exports = Registro;