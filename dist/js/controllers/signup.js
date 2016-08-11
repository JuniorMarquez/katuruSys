'use strict';

// signup controller
app.controller('SignupFormController', ['$scope', '$filter','$http', '$state','MyService', function($scope, $filter,$http, $state,MyService) {
    $scope.user = {};
    $scope.datos=[];
    $scope.establecimientos={};
    $scope.createEstablecimiento = function(user){
       $http.post('http://localhost:1337/establecimiento/', {administrador: $scope.user.nombre, emailAdministrador: $scope.user.email});
    };


    $scope.entrar = function(user) {
   
    $http.get('http://localhost:1337/userkaturu/?email=' +$scope.user.email).success(function(respuesta){
                // if ($scope.email=== 'undefined'){$scope.mensaje="usuario no registrado"}
                     // if (vm.dato !== vm.login.usuario){vm.login.mensaje="usuario no registrado"}
                $scope.datos = respuesta.results[0];
                MyService.data.datos=$scope.datos;
       });
    
      MyService.data.idUsuario=MyService.data.datos.id;
      $scope.app.usuario=MyService.data.datos.email;
         alert("hola "+MyService.data.id);       
     
    if(MyService.data.datos){
      $state.go('app.dashboard-v1');
    }
    if(!MyService.data.datos){
      $state.go('access.signin');
    }
    };

    $scope.ok = function(user) {
      $scope.createEstablecimiento(user);
      setTimeout(function() {

      $http.get('http://localhost:1337/establecimiento/?emailAdministrador='+$scope.user.email).then(function (resp) {
      $scope.establecimientos = resp.data.results;
      $scope.user.idEstablecimiento=($scope.establecimientos[$scope.establecimientos.length-1]).id;
      MyService.data.idEstablecimiento=$scope.user.idEstablecimiento;
        $http.post('http://localhost:1337/userkaturu/', {nombre: $scope.user.nombre, email: $scope.user.email, password: $scope.user.password,
        idEstablecimiento: MyService.data.idEstablecimiento,
        nivel:1,
      });
      // $scope.user.idEstablecimiento=datosEstablecimiento.id;
      });

      }, 1000);
      $http.get('http://localhost:1337/establecimiento/').then(function (resp) {
      $scope.establecimientos = resp.data.results;
      $scope.user.idEstablecimiento=($scope.establecimientos[$scope.establecimientos.length-1]).id;
      MyService.data.idEstablecimiento=$scope.user.idEstablecimiento;
        $http.post('http://localhost:1337/userkaturu/', {nombre: $scope.user.nombre, email: $scope.user.email, password: $scope.user.password,
        idEstablecimiento: MyService.data.idEstablecimiento,
        nivel:1,
      });
      // $scope.user.idEstablecimiento=datosEstablecimiento.id;
      });
      
      // Try to create
      
      $scope.entrar();
   };

     
    
  }])
