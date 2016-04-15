var Schema = require('mongoose').Schema;

var Item = new Schema
({
	idPrestamo: { type: Schema.ObjectId, ref: "Prestamo" },
	idElemento: { type: Schema.ObjectId, ref: "Elemento" }
});

module.exports = Item;