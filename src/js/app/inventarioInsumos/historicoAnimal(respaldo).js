'use strict';
app.controller('historicoArticuloCtrl', ['$scope', '$http', '$filter', '$modal', 'MyService', 'filterFilter', function($scope, $http, $filter,$modal, MyService,filterFilter) {
  $scope.filter = '';
      $scope.tbOptions = {
      bDestroy: true,
      data: [],
      aoColumns: [
        { mData: 'createdAt' },
        { mData: 'cantidad' }                          
      ]                                                   
    };

$scope.getSalidas = function () {

  $scope.ordenos=null;
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
    };
    $scope.tbOptions.data = $scope.ordenos;
    $scope.tbOptions.data = $scope.ordenos;
    // MyService.data.indice=MyService.data.indice+1;
    // $scope.indice=MyService.data.indice;
  } );

    };
    $scope.getSalidas();




  
   // $scope.d=($scope.valorConcatenar);
   // alert("valor c"+$scope.valorConcatenar);
// $scope.d2 = [ [1,12],[2,11],[3,12],[4,8],[5,7.5],[6,7],[7,6.8],[8,7],[9,7.2],[10,7] ];
}]);
