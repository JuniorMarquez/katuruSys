'use strict';

// controlador de inicio de session
app.controller('SignupFormController', ['$scope', '$filter','$http', '$state','MyService', 'toaster', function($scope, $filter,$http, $state,MyService,toaster) {
    $scope.toaster = {
    title: 'Exito!!',
    type: 'success',
    text: 'En hora buena! su registro se ha realizado con éxito, ya puede iniciar sessión.',
  };
  $scope.pop = function(){
    toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
  };

    $scope.user = {};
    $scope.datos=[];
    $scope.establecimientos={};
    $scope.createEstablecimiento = function(user){
       $http.post('http://52.33.127.122:1345/establecimiento/', {administrador: $scope.user.nombre, emailAdministrador: $scope.user.email});
    };

    $scope.entrar = function(user) {
      $http.get('http://52.33.127.122:1345/userkaturu/?email=' +$scope.user.email).success(function(respuesta){
        $scope.datos = respuesta.results[0];
        MyService.data.datos=$scope.datos;
      });
      MyService.data.idUsuario=MyService.data.datos.id;
      $scope.app.usuario=MyService.data.datos.email;
      // alert("hola "+MyService.data.id);  
      $scope.pop();     
      if(MyService.data.datos){
       
      }
     // 
    };

    $scope.ok = function(user) {
      $scope.createEstablecimiento(user);
      setTimeout(function() {
        $http.get('http://52.33.127.122:1345/establecimiento/?emailAdministrador='+$scope.user.email).then(function (resp) {
        $scope.establecimientos = resp.data.results;
        $scope.user.idEstablecimiento=($scope.establecimientos[$scope.establecimientos.length-1]).id;
        MyService.data.idEstablecimiento=$scope.user.idEstablecimiento;
        $http.post('http://52.33.127.122:1345/userkaturu/', {nombre: $scope.user.nombre, email: $scope.user.email, password: $scope.user.password,
          idEstablecimiento: MyService.data.idEstablecimiento,
          nivel:1,
          });
        });
      }, 1000);
      
    //   $http.get('http://52.33.127.122:1345/establecimiento/').then(function (resp) {
    //   $scope.establecimientos = resp.data.results;
    //   $scope.user.idEstablecimiento=($scope.establecimientos[$scope.establecimientos.length-1]).id;
    //   MyService.data.idEstablecimiento=$scope.user.idEstablecimiento;
    //   $http.post('http://52.33.127.122:1345/userkaturu/', {nombre: $scope.user.nombre, email: $scope.user.email, password: $scope.user.password,
    //     idEstablecimiento: MyService.data.idEstablecimiento,
    //     nivel:1,
    //   });
    // });
     $state.go('access.signin');
     //Intenta entrar después de registrarse con los valores de entrada
      
    // $scope.entrar();
   };
  }])
