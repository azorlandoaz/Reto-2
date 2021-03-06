//if (!sessionStorage.getItem('token')) {
//    document.location = "/Views/index.html";
//}

var reto = angular.module('reto', []);

reto.controller('ElementoCtrl', function ($scope, $http) {


    /***************************************************
            espacio para inicializar valores
    ****************************************************/
    $scope.elemento = {};
    $scope.sesion = {};
    $scope.disableTagButton = {'visibility': 'hidden'};//oculto boton de guardado desde el comienzo
    $scope.select = {
        id:["id"],
        name:["name"]
    };//lista de id de los elementos seleccionados
    onLoadReport();
    /**********************************************************************************************************/

    /***************************************************
        funcion que se encarga de sacar las id de los
        elementos seleccionados en la lista $scope.select
        y de mostrar el boton de solicitar cuando alguno
        este seleccionado.
    ****************************************************/
    $scope.check = function(value,name, checked) {
    var idx = arrayObjectIndexOf($scope.select,value);
       
        if (idx < 0 && checked) {
            $scope.select.id.push(value);
            $scope.select.name.push(name);
        }else{
          $scope.select.id.splice(idx, 1);
          $scope.select.name.splice(idx, 1);
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
        var elemento = {}
        angular.extend(elemento, $scope.elemento);

       
        if (username != null) {
            var url = 'http://localhost:8081/ElementReadX/Elemento/estado/Reservado';
        }else
        {
            document.location = '/Views/Login.html';
        }

        var get = $http.get(url);
            get.then(success, fail);

            function success(resp) {
                $scope.elemento = resp.data.value;
                //$scope.elemento = JSON.parse(resp.data)
                //console.log( resp.data.value);
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
        var elemento = {}
        angular.extend(elemento, $scope.elemento);
     
        //actualizacion en la base de datos del estado del elemento
        for (var i = 1; i < $scope.select.id.length; i++) {
               console.log("elemento actualizado" + $scope.select.name[i]);
            var urlElemento = 'http://localhost:8081/update/Elemento/'+ $scope.select.name[i]+'/'+'Prestado'+'/'+$scope.select.id[i];
            var updateElem = $http.get(urlElemento);
            updateElem.then(sucessElem, failElem);

            }
        function sucessElem(resp){
            console.log("elemento actualizado");
            onLoadReport();
            console.log(resp);
        }
        function failElem(resp){
            console.log("No se pudo actualizar el elemento:: " + resp.data);
        }
      
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
  