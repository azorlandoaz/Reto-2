//if (!sessionStorage.getItem('token')) {
//    document.location = "/Views/index.html";
//}

var reto = angular.module('reto', []);

reto.controller('ElementoCtrl', function ($scope, $http) {
    /***************************************************
            espacio para inicializar valores
    ****************************************************/
    $scope.elemento = {
        id:[]
    };
    $scope.prestamo = {
        elemento:[],
        prestamo:[]
    };
    $scope.disableTagButton = {'visibility': 'hidden'};//oculto boton de guardado desde el comienzo
    $scope.sesion = {};

    $scope.select = {
        id:["id"],
        name:["name"]
    };
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
        }else
        {
          $scope.select.id.splice(idx, 1);
          $scope.select.name.splice(idx, 1);
        }
        if($scope.select.id.length == 1){
            $scope.disableTagButton = {'visibility': 'hidden'};
        }else{
            $scope.disableTagButton = {'visibility': 'visible'};
        }
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
        var userID = sessionStorage.userID;
        var prestamo = {}
        angular.extend(prestamo, $scope.prestamo);
        var elemento = {}
        angular.extend(elemento, $scope.elemento);

       
        if (userID != null) {
            var url = 'http://localhost:8081/prestamoReadX/Prestamo/idUsuario/'+userID;
        }else   {
            document.location = '/Views/Login.html';
        }

        var get = $http.get(url);
            get.then(success, fail);

            function success(resp_prestamo) {
                $scope.prestamo.prestamo = resp_prestamo.data.value;
                for (var i = 0; i < resp_prestamo.data.value.length; i++) {
                     var urlItem = 'http://localhost:8081/itemReadX/Item/idPrestamo/'+resp_prestamo.data.value[i]._id;
                     var getItem = $http.get(urlItem);
                     getItem.then(successItem, failItem);
                } 
            }
                function successItem(resp) {
                    for (var i = 0; i < resp.data.value.length; i++) {
                     var urlElement = 'http://localhost:8081/ElementReadX/Elemento/_id/'+resp.data.value[i].idElemento;
                     var getElement = $http.get(urlElement);
                     getElement.then(successElement, failElement);
                    }

                     function successElement(resp_element) {
                        $scope.prestamo.elemento.push(resp_element.data.value[0]);
                        $scope.elemento = $scope.prestamo.elemento;
                        console.log(resp_element.data.value[0]);
                    } 
                    function failElement(resp_element) {
                        $scope.prestamo.error = "No se encontro elemento.";
                    } 
                }
                function failItem(resp_item) {
                    $scope.prestamo.error = "No se encontro Item.";
                }           
                    //$scope.elemento = JSON.parse(resp.data)
            

            function fail(resp_prestamo) {
                $scope.prestamo.error = "No se encontro prestamo.";
            }
        
    }

    function operationSearchD(elemento) {

        var url = 'http://localhost:8081/read/Registro/';
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

$scope.clickSolicitarPrestamo = function()
{
    document.location = '/Views/SolicitudPrestamo.html';
}
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


    $scope.clickGuardar = function(){

        for (var i = 1; i < $scope.select.id.length; i++) {
                //eliminamos un item con el id de cada elemento
                   var urlItem = 'http://localhost:8081/delete/Item/idElemento/'+$scope.select.id[i];
                    var deleteItem = $http.get(urlItem);
                    deleteItem.then(sucessItem, failItem);
                //actualizacion en la base de datos del estado del elemento
                    var urlElemento = 'http://localhost:8081/update/Elemento/'+ $scope.select.name[i]+'/'+'Disponible'+'/'+$scope.select.id[i];
                    var updateElem = $http.get(urlElemento);
                    updateElem.then(sucessElem, failElem);
                }
                function sucessItem(resp){
                        console.log(resp);
                        console.log("el item fue eliminado exitosamente");
                    }
                    function failItem(resp){
                        alert("No se pudo elminar el item:: " + resp.data);
                    }
                    function sucessElem(resp){
                        console.log("elemento actualizado");
                    }
                    function failElem(resp){
                        alert("No se pudo actualizar el elemento:: " + resp.data);
                    }

        document.location = '/Views/Report.html';
    }

   
});




