var factory = require('./factory.js');


module.exports.readUsuario= function (request,response) {
	var tabla = request.params.collection;
	var param = request.params.param;
	var value = request.params.value;
	
	var object = factory.findCollectionByName("Usuario");
	var existe = false;
	
	if (object !== null) 
	{
		existe = true;
	}
	
	if ( existe == true)
	{
		object.find().where("Usuario").equals(param).where("contraseña").equals(value).exec(buscarDatos);
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

module.exports.readUsuarioByName = function (request,response) {
	var param = request.params.param;
	
	var object = factory.findCollectionByName("Usuario");
	var existe = false;
	
	if (object !== null) 
	{
		existe = true;
	}
	
	if ( existe == true)
	{
		object.find().where("Usuario").equals(param).exec(buscarDatos);
	}
	else
	{
		return response.json({status:"fail", name:"Estudiante", description:"COLLECTION_DONT_EXIST", value:[{}]});
	}
	
	function buscarDatos(err,items)
	{
		if(err)
		{
			return response.json({status:"fail", name:"Estudiante", description:"COLLECTION_BAD_QUERY", value:[{}]});
		}
		else
		{
			return response.json({status:"ok", name:"Estudiante", description:"COLLECTION_QUERY_OK", value:items});
		}
	}
}

module.exports.createUsuario = function (request,response) {
	var tabla = "Usuario";
	var v1 = request.params.v1;
	var v2 = request.params.v2;
	var v3 = request.params.v3;
	var v4 = request.params.v4;
	var v5 = request.params.v5;
			
	var object = factory.createObjectWithName(tabla,v1,v2,v3,v4,v5);
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