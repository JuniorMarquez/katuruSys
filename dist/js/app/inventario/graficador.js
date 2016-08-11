// 'use strict';


// app.controller('graficadorCtrl', ['$scope', '$http', '$filter', '$modal', 'MyService', 'filterFilter', function($scope, $http, $filter,$modal, MyService,filterFilter) {
 


//   $scope.filter = '';
//   $http.get('http://localhost:1337/ordeno/?idArticulo='+MyService.data.articuloConsultado.id).then(function (resp) {
//     $scope.ordenos = resp.data.results;
//     MyService.data.ordenos=resp.data.results;
//     var cant = $scope.ordenos.length;
//     // alert("cantidad: "+cant);
//     $scope.ordenos.nombre=MyService.data.articuloConsultado.nombre;
//     $scope.ordenos.cant=cant;
//     //  
//     $scope.d=[]; 
//     for (var i= 0; i < 10; i++){
//       var ind = [];
//       ind[i,1]=MyService.data.ordenos[i].cantidad;
//       ind[i,0]=i+1;
//       $scope.d[i]=ind;
//       // $scope.d1[i][0]=[i];
//     }
//   MyService.data.d=$scope.d;
   
//    // $scope.d=($scope.valorConcatenar);
//    // alert("valor c"+$scope.valorConcatenar);
//  $scope.d3=MyService.data.d;
//    // alert(+$scope.d3);
//   });
  
// $scope.d2 = [ [1,12],[2,11],[3,12],[4,8],[5,7.5],[6,7],[7,6.8],[8,7],[9,7.2],[10,7] ];
// }]);
