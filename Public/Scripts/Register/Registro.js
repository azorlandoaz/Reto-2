$(document).ready(function () {
    var formInputs = $('input[type="text"],input[type="password"]');
    formInputs.focus(function () {
        $(this).parent().children('p.formLabel').addClass('formTop');
        $('div#formWrapper').addClass('darken-bg');
        $('div.logo').addClass('logo-active');
    });
    formInputs.focusout(function () {
        if ($.trim($(this).val()).length == 0) {
            $(this).parent().children('p.formLabel').removeClass('formTop');
        }
        $('div#formWrapper').removeClass('darken-bg');
        $('div.logo').removeClass('logo-active');
    });
    $('p.formLabel').click(function () {
        $(this).parent().children('.form-style').focus();
    });
});

var parking = angular.module('parking', []);
var apiBaseUrl = '@Url.Content(ProjectNameSpace.WebApiConfig.UrlPrefixRelative)';
parking.controller('registerCtrl', function ($scope, $http) {


    $scope.register = {};

    $scope.clickRegister = function () {

        var register = {}
        angular.extend(register, $scope.register);

        sessionStorage.username = register.username;

        if (register.username != null && register.UserPassword != null ) {
            var url = 'http://localhost:8081/createUsuario/' + register.username + '/' + register.UserPassword +'/activo/'
            + register.nickname + '/' + register.codigo;
            var post = $http.get(url)
            .then(success, fail);
        }
    }

    function success(resp) {
       // console.log(resp.data)
        //sessionStorage.setItem('token', resp.data);
        document.location = '/Views/Login.html';
     }

    function fail(resp) {
        $scope.login.error = "El login fallo";
        alert("El login fallo");
    }
});