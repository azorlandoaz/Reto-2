//if (!sessionStorage.getItem('token')) {
//    document.location = "/Views/index.html";
//}

var reto = angular.module('reto', []);

reto.controller('ElementoCtrl', function ($scope, $http) {


    /***************************************************
            espacio para inicializar valores
    ****************************************************/
    $scope.elemento = [];
    $scope.sesion = {};
    $scope.disableTagButton = {'visibility': 'hidden'};//oculto boton de guardado desde el comienzo
    $scope.select = {
        id:["id"],
        usuario:["name"],
        contraseña:["name"],
        estado:["name"],
        nick:["name"],
        perfil:["perfil"],
        codigo:["codigo"]    
    };//lista de id de los elementos seleccionados
    onLoadReport();
    /**********************************************************************************************************/

    /***************************************************
        funcion que se encarga de sacar las id de los
        elementos seleccionados en la lista $scope.select
        y de mostrar el boton de solicitar cuando alguno
        este seleccionado.
    ****************************************************/
    $scope.check = function(value,name,contraseña,estado,nick,perfil,checked, codigo) {
    console.log($scope.check);
    var idx = arrayObjectIndexOf($scope.select,value);

       
        if (idx < 0 && checked) {
            $scope.select.id.push(value);
            $scope.select.usuario.push(name);
            $scope.select.contraseña.push(contraseña);
            $scope.select.estado.push(estado);
            $scope.select.nick.push(nick);
            $scope.select.perfil.push(perfil);
            $scope.select.codigo.push(codigo);
        }else{
          $scope.select.id.splice(idx, 1);
          $scope.select.usuario.splice(idx, 1);
          $scope.select.contraseña.splice(idx, 1);
          $scope.select.estado.splice(idx, 1);
          $scope.select.nick.splice(idx, 1);
          $scope.select.perfil.splice(idx, 1);
          $scope.select.codigo.splice(idx, 1);
        }

        if($scope.select.id.length == 1){
            $scope.disableTagButton = {'visibility': 'hidden'};
        }else{
            $scope.disableTagButton = {'visibility': 'visible'};
        }
        console.log($scope.select);
        //fucion que busca el elemento en la lista y regresa el index de este de los contrario devuelve -1
        function arrayObjectIndexOf(arr, obj){
        for(var i = 0; i < arr.length; i++){
            if(angular.equals(arr[i], obj)){
                return i;
            }
        };
        return -1;
        };
    };
    /*************************************************************************************************************/

    function onLoadReport() {
        var username = sessionStorage.username;
        var elemento = {};
        var item = {};
        angular.extend(elemento, $scope.elemento, $scope.item);

       
        if (username != null) {
            var url = 'http://localhost:8081/ElementReadX/Elemento/estado/Reservado';
        }else{
            document.location = '/Views/Login.html';
        }

        var get = $http.get(url);
            get.then(success, fail);

            function success(resp) {
                //$scope.elemento = resp.data.value;
                var elementos = resp.data.value;

                    console.log(elementos);
                for (var i = 0; i < elementos.length; i++) {
                    var url = 'http://localhost:8081/itemReadX/Item/idElemento/'+elementos[i]._id;
                    var getItem = $http.get(url);
                    getItem.then(successITem, fail);
                    console.log(elementos);
                }

                function successITem(resp) {
                   // console.log(resp.data.value); 
                    var idPrestamo = resp.data.value[0].idPrestamo;
                    var url = 'http://localhost:8081/PrestamoReadX/Prestamo/_id/'+idPrestamo;
                    var getItem = $http.get(url);
                    getItem.then(successPrestamo, fail);
                
                 }

                function successPrestamo(resp) {
                    var idUsuario = resp.data.value[0].idUsuario;
                    var url = 'http://localhost:8081/PrestamoReadX/Usuario/_id/'+idUsuario;
                    var getItem = $http.get(url);
                    getItem.then(successUsuario, fail);
                }

                function successUsuario(resp) {
                    console.log(resp.data.value[0]);
                    $scope.elemento.push(resp.data.value[0]);
                }


            }

            function fail(resp) {
                $scope.elemento.error = "No se encontro registro.";
            }
        
    }

    function operationSearchD(elemento) {

        var url = '/read/Registro/';
        var get = $http.get(url);
        get.then(success, fail);

        function success(resp) {
            $scope.elemento = JSON.parse(resp.data);
        }

        function fail(resp) {
            console.log(resp);
            $scope.elemento.error = "No se encontro registro.";
        }
    }

    $scope.clickConsultarPrestamo = function()
    {
        document.location = '/Views/Report.html';
    }

/********************************************************
            AQUI ESTA LA MAGIA
*********************************************************/
  $scope.clickGuardar = function(){
        var elemento = {};
        angular.extend(elemento, $scope.elemento);
      /******************************************
      primero creamos el prestamo
      ****************************************/
                              
                //actualizacion en la base de datos del estado del elemento
                for (var i = 1; i < $scope.select.id.length; i++) {
                    var urlElemento = 'http://localhost:8081/updateUsuario/Usuario/'+ $scope.select.Usuario[i]+'/'+$scope.select.contraseña[i]+'/'
                    + $scope.select.estado[i]+ '/' + $scope.select.nick[i]+ '/' +  $scope.select.codigo[i]+ '/' +  $scope.select.perfil[i];
                    var updateElem = $http.get(urlElemento);
                    updateElem.then(sucessItem, failItem);            
                }
                function sucessItem(resp){
                        console.log(resp);
                        console.log("el usuario con id: "+ resp.data.value[0]._id + " fue actualizado exitosamente");
                    }
                    function failItem(resp){
                        console.log("No se pudo crear el item:: " + resp.data);
                    }
                document.location = '/Views/Funcionario.html';
    }
    /***************************************************************************************************************/
    $scope.clickSalir = function () {
            //var deleteToken = $http.delete('/api/operation/' + sessionStorage.getItem('token'));
            //deleteToken.then(success, fail);
            //sessionStorage.removeItem('token');
            //alert("OK" + resp);
            var username = sessionStorage.username;
            var d = new Date(); 
            var datenow = d.getMonth()+'-'+d.getDay()+'-'+d.getFullYear()+'-'+ d.getHours()+':' + d.getMinutes(); 
            var registerUrl = 'http://localhost:8081/createRegistro/Registro/'+ username+'/LogOut' + '/'+ datenow;
            var getRegister = $http.get(registerUrl);
            getRegister.then(sucessRegister, failRegister);
        

         function sucessRegister(resp)
        {
            document.location = '/Views/Login.html';
        }

        function failRegister(resp)
        {
            alert("No se pudo cerrar sesion. " + resp.data);
        }
    }
 });
  