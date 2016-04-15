var Schema = require('mongoose').Schema;

var Usuario = new Schema
({
	Usuario: String,
	contraseña: String,
	estado: String,
	nick: String,
	codigo: String,
	perfil: String
});

module.exports = Usuario;