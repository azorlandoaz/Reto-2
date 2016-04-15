//if (!sessionStorage.getItem('token')) {
//    document.location = "/Views/index.html";
//}

var parking = angular.module('parking', []);

parking.controller('ReportCtrl', function ($scope, $http) {

    $scope.report = {};
    $scope.sesion = {};

    $scope.select = {
        id:["id"]
    };
    onLoadReport();

    $scope.clickReport = function () {
        var report = {}
        angular.extend(report, $scope.report);
        if (report.Usuario != null) {
            var url = 'http://localhost:8081/read/Registro/'+report.Usuario;
        }else
        {
            var url = 'http://localhost:8081/read/Registro';
        }

        var get = $http.get(url);
            get.then(success, fail);

            function success(resp) {
                $scope.report = resp.data.value;
            }

            function fail(resp) {
                $scope.report.error = "No se encontro registro.";
            }
        
    };

    $scope.check = function(value, checked) {
    var idx = arrayObjectIndexOf($scope.select,value);
       
        if (idx < 0 && checked) {
            $scope.select.id.push(value);
            console.log("Check");
        }else
        {
          $scope.select.id.splice(idx, 1);
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
        var url = 'http://localhost:8081/readUsuario/'+username;
        var getUser = $http.get(url);
        getUser.then(success, fail);
            
            function success(resp) {  
                $scope.sesion.nick = resp.data.value[0].nick;
                console.log($scope.report.sesion);
            }

            function fail(resp) {
                $scope.login.error = "Error al cargar la sesion de Logeo";
            }
    }

    function operationSearchD(report) {

        var url = '/read/Registro/';
        var get = $http.get(url);
        get.then(success, fail);

        function success(resp) {
            $scope.report = JSON.parse(resp.data);
        }

        function fail(resp) {
            console.log(resp);
            $scope.report.error = "No se encontro registro.";
        }
    }

    $scope.clickSalir = function () {
       // var deleteToken = $http.delete('/api/operation/' + sessionStorage.getItem('token'));
       // deleteToken.then(success, fail);
            //sessionStorage.removeItem('token');
            //alert("OK" + resp);
            var username = sessionStorage.username;
            var d = new Date(); 
            var datenow = d.getMonth()+'-'+d.getDay()+'-'+d.getFullYear()+'-'+ d.getHours()+':' + d.getMinutes(); 
            var registerUrl = '/createRegistro/Registro/'+ username+'/LogOut' + '/'+ datenow;
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




