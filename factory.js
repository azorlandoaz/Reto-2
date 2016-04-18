require('./db.js');

module.exports.createObjectWithName = function(coleccion, v1, v2, v3, v4, v5) {
	var obj = null;
	
	if ( coleccion == 'Usuario') {
		obj = new Usuario({Usuario:v1, contraseña:v2, estado:v3, nick:v4, codigo:v5, perfil:"estudiante"});
	}
	else if ( coleccion == 'Registro') {
		obj = new Registro({IdUsuario:v1,TipoLog:v2, Fecha:v3});
	}
	else if ( coleccion == 'Prestamo') {
		obj = new Prestamo({idUsuario:v1,fechaInicio:v2, fechaFin:v3});
	}
	else if ( coleccion == 'Item') {
		obj = new Item({idPrestamo:v1, idElemento:v3});
	}else if (coleccion =='Elemento') {
		obj = new Elemento({nombre:v1, estado:v2});
	}	
	return obj;
}

module.exports.findCollectionByName = function(name)
{
	var objeto = null;
	
	if(name === 'Usuario') {
		objeto = Usuario;
	}
	else if ( name === 'Registro') {
		objeto = Registro;
	}
	else if ( name === 'Prestamo') {
		objeto = Prestamo;
	}
	else if ( name === 'Item') {
		objeto = Item;
	}else if (name ==='Elemento') {
		objeto = Elemento;
	}
	return objeto;
}

module.exports.updateData = function(name, key, data, service)
{
	if(name === 'Usuario')
	{
		Usuario.update({_id: key}, data, {upsert: true}, respuesta);
	}
	else if(name === 'Registro')
	{
		Registro.update({_id: key}, data, {upsert: true}, respuesta);
	}
		
	function respuesta (err)
	{
		if ( err)
		{
			return service.json({status:"fail", name:name, description:"ID_OBJECT_DONT_EXIST", value:[{}]});
		}
		else
		{
			return service.json({ status: "ok", name:name, description:"COLLECTION_QUERY_OK", value: key});
		}
	}
}