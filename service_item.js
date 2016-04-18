var factory = require('./factory.js');

create = function (request,response) {
	var tabla = request.params.collection;
	var v1 = request.params.v1;
	var v2 = request.params.v2;
				
	var object = factory.createObjectWithName(tabla,v1,v2);
	var existe = false;
	
	if ( object !== null)
	{
		existe = true;
	}
	
	if ( existe)
	{
		object.save(onSaved);
	}
	else
	{
		return response.json({status:"fail", name:tabla, description:"COLLECTION_DONT_EXIST", value:[{}]});
	}
		
	function onSaved(err)
	{
		if(err)
		{
			return response.json({status:"fail", name:tabla, description:"COLLECTION_DONT_ALLOW_INSERTION", value:[{}]});
		}
		else
		{
			return response.json({status:"ok", name:tabla, description:"COLLECTION_INSERTION_OK", value:[{_id:object._id}]});
		}
	}
}

read = function (request,response) {
	var tabla = request.params.collection;
	
	var object = factory.findCollectionByName(tabla);
	var existe = false;
	
	if (object !== null) 
	{
		existe = true;
	}
	
	if ( existe == true)
	{
		object.find().exec(buscarDatos)
	}
	else
	{
		return response.json({status:"fail", name:tabla, description:"COLLECTION_DONT_EXIST", value:[{}]});
	}
	//collection.find().where(param).equals(value).exec(buscarDatos);
	
	function buscarDatos(err,items)
	{
		if(err)
		{
			return response.json({status:"fail", name:tabla, description:"COLLECTION_BAD_QUERY", value:[{}]});
		}
		else
		{
			return response.json({status:"ok", name:tabla, description:"COLLECTION_QUERY_OK", value:items});
		}
	}
}

module.exports.readX = function (request,response) {
	var tabla = request.params.collection;
	var param = request.params.param;
	var value = request.params.value;
	
	var object = factory.findCollectionByName(tabla);
	var existe = false;
	
	if (object !== null) 
	{
		existe = true;
	}
	
	if ( existe == true)
	{
		object.find().where(param).equals(value).exec(buscarDatos);
	}
	else
	{
		return response.json({status:"fail", name:tabla, description:"COLLECTION_DONT_EXIST", value:[{}]});
	}
	
	function buscarDatos(err,items)
	{
		if(err)
		{
			return response.json({status:"fail", name:tabla, description:"COLLECTION_BAD_QUERY", value:[{}]});
		}
		else
		{
			return response.json({status:"ok", name:tabla, description:"COLLECTION_QUERY_OK", value:items});
		}
	}
}

module.exports.update = function (request,response) {
	var tabla = request.params.collection;
	var v1 = request.params.v1;
	var v2 = request.params.v2;

	var id = request.params.id;
	
	var objeto = factory.createObjectWithName(tabla,v1,v2);
	
	if ( objeto == null)
	{
		return response.json({status:"fail", name:tabla, description:"COLLECTION_DONT_EXIST", value:[{}]});
	}
	else 
	{
		var updatedData = objeto.toObject();
		delete updatedData._id;
		return factory.updateData(tabla, id, updatedData, response);
	}}

module.exports.delete = function (request,response) {
	var tabla = request.params.tabla;
	var param = request.params.param;
	var value = request.params.value;
	
	var coleccion = factory.findCollectionByName(tabla);
		
	if(coleccion != null)
	{
		coleccion.remove().where(param).equals(value).exec(buscarDatos);
	}
	else
	{
		return response.json({status:"fail", name:tabla, description:"COLLECTION_DONT_EXIST", value:[{}]});
	}

	function buscarDatos(err,item)
	{
		if(err)
		{
			return response.json({status:"fail", name:tabla, description:"COLLECTION_BAD_QUERY", value:[{}]});
		}
		else
		{
			return response.json({status:"ok", name:tabla, description:"COLLECTION_REMOVE_FAIL", value:[{}]});
		}
	}
}

module.exports.post = function (request,response) {
	return response.json({'respuesta':request.body.nombre});
}

module.exports.createRegistro = function (request,response) {
	var tabla = request.params.collection;
	var v1 = request.params.v1;
	var v2 = request.params.v2;
			
	var object = factory.createObjectWithName(tabla,v1,v2);
	var existe = false;
	
	if ( object !== null)
	{
		existe = true;
	}
	
	if ( existe)
	{
		object.save(onSaved);
	}
	else
	{
		return response.json({status:"fail", name:tabla, description:"COLLECTION_DONT_EXIST", value:[{}]});
	}
		
	function onSaved(err)
	{
		if(err)
		{
			return response.json({status:"fail", name:tabla, description:"COLLECTION_DONT_ALLOW_INSERTION", value:[{}]});
		}
		else
		{
			return response.json({status:"ok", name:tabla, description:"COLLECTION_INSERTION_OK", value:[{_id:object._id}]});
		}
	}
}

module.exports.create = create;
module.exports.read = read;

