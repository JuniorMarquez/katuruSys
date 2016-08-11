'use strict';
app.controller('graficoCtrl', ['$scope', '$http', '$filter', '$modal', 'MyService', 'filterFilter', function($scope, $http, $filter,$modal, MyService,filterFilter) {
$http.get('http://localhost:1345/ordeno/?idArticulo='+MyService.data.articuloConsultado.id).then(function (resp) {
      $scope.ordenos = resp.data.results;

      // MyService.data.ordenos=resp.data.results;
      var cant = $scope.ordenos.length;
      // alert("cantidad: "+cant);
      $scope.ordenos.nombre=MyService.data.articuloConsultado.nombre;
      $scope.ordenos.cant=cant;
      //  
      $scope.d=[]; 
      $scope.suma=0;
      $scope.promedio=0;
      if ($scope.ordenos.length>10){
        for (var i= 0; i < 10; i++){
          var ind = [];
          ind[i,1]= $scope.ordenos[i].cantidad;
          $scope.suma = $scope.suma +  $scope.ordenos[i].cantidad;
          $scope.promedio=$scope.suma/10;
          ind[i,0]=i+1;
          $scope.d[i]=ind;
          $scope.d3=$scope.d;
        // $scope.d1[i][0]=[i];
        }
      }
    });  
}]);
