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
        id:["id"]
    };//lista de id de los elementos seleccionados
    onLoadReport();
/***************************************************************/

    $scope.check = function(value, checked) {
    var idx = arrayObjectIndexOf($scope.select,value);
       
        if (idx < 0 && checked) {
            $scope.select.id.push(value);
            console.log("Check");
        }else
        {
          $scope.select.id.splice(idx, 1);
        }
        if($scope.select.id.length == 1){
            $scope.disableTagButton = {'visibility': 'hidden'};
        }else{
            $scope.disableTagButton = {'visibility': 'visible'};
        }
        console.log($scope.select);

    function arrayObjectIndexOf(arr, obj){
    for(var i = 0; i < arr.length; i++){
        if(angular.equals(arr[i], obj)){
            return i;
        }
    };
    return -1;
    };
};
    

    function onLoadReport() {
        var username = sessionStorage.username;
        var elemento = {}
        angular.extend(elemento, $scope.elemento);

       
        if (username != null) {
            var url = 'http://localhost:8081/readElement/Elemento';
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

  $scope.clickGuardar = function()
    {
        var username = sessionStorage.username;
        var elemento = {}
        angular.extend(elemento, $scope.elemento);
      
        var url = 'http://localhost:8081/readUsuario/'+username;
        var getUser = $http.get(url);
        getUser.then(success, fail);
            
            function success(resp) {  
                var idUsuario = resp.data.value; 
                 console.log(idUsuario);
              
               var d = new Date(); var dia =d.getDate().toString(); var diaFinal =(d.getDate()+ 3).toString();
                var mes =(d.getMonth()+1).toString(); var año =d.getFullYear().toString();
                      var nowDate = dia + '-' + mes + '-'+ año ;
                var endingDate = diaFinal + '-' + mes + '-'+ año ;
                var url = 'http://localhost:8081/prestamoCreate/Prestamo/'+ idUsuario+'/'+nowDate+'/'+endingDate;
                
               /* var crearPrestamo = $http.get(url);
                crearPrestamo.then(sucessPrestamo, failPrestamo);*/
               

             function sucessPrestamo(resp)
            {
               var idPrestamo = resp.data.value[0]._id;
                
                //Consultar el idElemento
               var url = 'http://localhost:8081/CreateItem/:collection/:v1/:v2/'+ idPrestamo+'/'+idElemento;
                var crearItem = $http.get(registerUrl);
                crearItem.then(sucessPrestamo, failPrestamo);

            }

            function failPrestamo(resp)
            {
                alert("No se pudo cerrar sesion. " + resp.data);
            }
            
            }
            
            function fail(resp) {  
                

                console.log('fallo');
            }
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
 });
  