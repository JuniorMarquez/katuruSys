'use strict';


app.controller('ajustesCtrl', ['$scope', '$http', '$filter', '$modal', 'MyService', 'filterFilter', function($scope, $http, $filter,$modal, MyService,filterFilter) {
 


  $scope.filter = '';
$scope.datos={};
$scope.datos=MyService.data.datos;

  $scope.bienvenida= function(){
//     $http.get('http://localhost:1337/usergesgan/'+MyService.data.idUsuario).then(function (resp) {
//     $scope.datos = resp.data.results;
// nombre = $scope.datos[0].nombre;
// // var numero = $scope.groups.length;
// // $scope.numero=numero;
// // MyService.data.numero=numero;
//   });
    
 alert("bienvenido"+MyService.data.datos.nombre);

  };
 
 //  $http.get('http://localhost:1337/ordeno/?idArticulo='+MyService.data.articuloConsultado.id).then(function (resp) {
 //    $scope.ordenos = resp.data.results;
 //    MyService.data.ordenos=resp.data.results;
 //    var cant = $scope.ordenos.length;
 //    // alert("cantidad: "+cant);
 //    $scope.ordenos.nombre=MyService.data.articuloConsultado.nombre;
 //    $scope.ordenos.cant=cant;
 //    //  
 //   $scope.ordenos.promedio=MyService.data.promedio;

 //    });
 //   // $scope.d=($scope.valorConcatenar);
 //   // alert("valor c"+$scope.valorConcatenar);
 // $scope.d3=MyService.data.d;
   
 
  
// $scope.d2 = [ [1,12],[2,11],[3,12],[4,8],[5,7.5],[6,7],[7,6.8],[8,7],[9,7.2],[10,7] ];
}]);
