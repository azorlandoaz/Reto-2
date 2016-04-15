var Schema = require('mongoose').Schema;

var Prestamo = new Schema
({
	idUsuario: { type: Schema.ObjectId, ref: "Usuario" },
	fechaInicio: String,
	fechaFin: String
});

module.exports = Prestamo;