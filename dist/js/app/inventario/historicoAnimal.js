'use strict';
app.controller('graficoArticuloCtrl', ['$scope', '$http', '$filter', '$modal', 'MyService', 'filterFilter', function($scope, $http, $filter,$modal, MyService,filterFilter) {
}]);

app.controller('IndexController', ['$scope', '$http', '$filter', '$modal', 'MyService', 'filterFilter', 'datepickerConfig',function($scope, $http, $filter,$modal, MyService,filterFilter, datepickerConfig) {
$scope.date = moment();
}]);

app.controller('historicoArticuloCtrl', ['$scope', '$http', '$filter', '$modal', 'MyService', 'filterFilter', 'datepickerConfig',function($scope, $http, $filter,$modal, MyService,filterFilter, datepickerConfig) {
    $scope.getGrafico =function(){
      $scope.nombre=MyService.data.articuloConsultado.nombre;
      $http.get('http://localhost:1337/ordeno/?idArticulo='+MyService.data.articuloConsultado.id).then(function (resp) {
        $scope.ordenosGrafico = resp.data.results;
        var cant = $scope.ordenosGrafico.length;
        $scope.ordenosGrafico.nombre=MyService.data.articuloConsultado.nombre;
        $scope.ordenosGrafico.cant=cant;
        $scope.d=[]; 
        $scope.suma=0;
        $scope.promedio=0;
        $scope.ordenosGrafico=$scope.ordenosGrafico.reverse();
        if ($scope.ordenosGrafico.length>9){
          var e = 10;
          for (var i= 0; i < 10; i++){
            var ind = [];
            ind[i,1]= $scope.ordenosGrafico[i].cantidad;
            $scope.suma = $scope.suma +  $scope.ordenosGrafico[i].cantidad;
            $scope.promedio=$scope.suma/10;
            ind[e,0]=e;
            e=e-1;
            $scope.d[i]=ind;
            $scope.d3=$scope.d;
          }
        }
        var reverso =$scope.d3.reverse();
        $scope.d3=reverso;
      }); 
    };
    $scope.getGrafico();    


    $scope.today = function() {
      $scope.fechaInicio = new Date();
    };
    // $scope.today();

    $scope.clear = function () {
      $scope.fechaFin = null;
    };

    // Disable weekend selection
    // $scope.disabled = function(date, mode) {
    //   return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    // };

    $scope.toggleMin = function() {
      $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened = true;
    };
     $scope.open2 = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened2 = true;
    };

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1,
      class: 'datepicker'
    };

    $scope.initDate = new Date('2016-15-20');
    $scope.formats = ['dd/MM/yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = 'MM/dd/yyyy';
    $scope.tbOptions = {
    filterText: ''};
    $scope.filter = '';
      $scope.tbOptions = {
      bDestroy: true,
      pageLength: 5,
      data: []
                                                     
    };
    $scope.filter = '';
      $scope.tbOptions2 = {
      bDestroy: true,
      pageLength: 5,
      data: []
                                                     
    };
     $scope.tbOptions3 = {
      bDestroy: true,
      pageLength: 5,
      data: []
                                                     
    };
    $scope.tbOptions4 = {
      bDestroy: true,
      pageLength: 5,
      data: []
                                                     
    };
    $scope.tbOptions5 = {
      bDestroy: true,
      pageLength: 5,
      data: []
                                                     
    };
    $scope.tbOptions6 = {
      bDestroy: true,
      pageLength: 5,
      data: []
                                                     
    };
    $scope.tbOptions7 = {
      bDestroy: true,
      pageLength: 5,
      data: []
                                                     
    };
    $scope.getSalidas = function () {
      $scope.ordenos=null;
      $http.get('http://localhost:1337/ordeno/?idArticulo='+MyService.data.articuloConsultado.id).then(function (resp) {
        $scope.ordenos = resp.data.results;
        var bandera="";
        var bandera2="";
        $scope.ordenos2=[];
        var date = new Date();
        var mes = date.getMonth();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        var result = [];
        $scope.fechaInicio=$filter('date')(new Date(firstDay),'dd/MM/yyyy');
        $scope.fechaFin=$filter('date')(new Date(lastDay),'dd/MM/yyyy');
        var conversations = $scope.ordenos;
        var start_date =  Date.parse(firstDay);
        var end_date = Date.parse(lastDay);
        end_date=end_date+86400000;

        if ($scope.ordenos && $scope.ordenos.length > 0){
          for (var i=0;i < $scope.ordenos.length;i++){
            var conversationDate1 =  $scope.ordenos[i].createdAt;
            var conversationDate=Date.parse(conversationDate1);
            if (conversationDate >= start_date && conversationDate <= end_date){
              result.push($scope.ordenos[i]);
            }
            $scope.ordenos2=result;
          }
        }
        for (var i  = 0; i<$scope.ordenos2.length;i++){
          bandera = $scope.ordenos2[i].createdAt;
          bandera2=$filter('date')(new Date(bandera),'dd/MM/yyyy');
          $scope.ordenos2[i].createdAtFormateada=bandera2;
        }
        $scope.ordenos2=$scope.ordenos2.reverse();
        $scope.tbOptions.data = $scope.ordenos2;
        $scope.tbOptions.aoColumns=[
          { mData: 'createdAtFormateada' },
          { mData: 'cantidad' }                            
          ];
      });
    };
 $scope.getSalidas();
$scope.getPesos = function () {
      $scope.pesos=null;
      $http.get('http://localhost:1337/peso/?idArticulo='+MyService.data.articuloConsultado.id).then(function (resp) {
        $scope.pesos = resp.data.results;
        var bandera="";
        var bandera2="";
        $scope.pesos2=[];
        var date = new Date();
        var mes = date.getMonth();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        var result = [];
        $scope.fechaInicio=$filter('date')(new Date(firstDay),'dd/MM/yyyy');
        $scope.fechaFin=$filter('date')(new Date(lastDay),'dd/MM/yyyy');
        var conversations = $scope.pesos;
        var start_date =  Date.parse(firstDay);
        var end_date = Date.parse(lastDay);
        end_date=end_date+86400000;

        if ($scope.pesos && $scope.pesos.length > 0){
          for (var i=0;i < $scope.pesos.length;i++){
            var conversationDate1 =  $scope.pesos[i].createdAt;
            var conversationDate=Date.parse(conversationDate1);
            if (conversationDate >= start_date && conversationDate <= end_date){
              result.push($scope.pesos[i]);
            }
            $scope.pesos2=result;
          }
        }
        for (var i  = 0; i<$scope.pesos2.length;i++){
          bandera = $scope.pesos2[i].createdAt;
          bandera2=$filter('date')(new Date(bandera),'dd/MM/yyyy');
          $scope.pesos2[i].createdAtFormateada=bandera2;
        }
        $scope.pesos2=$scope.pesos2.reverse();
        $scope.tbOptions6.data = $scope.pesos2;
        $scope.tbOptions6.aoColumns=[
          { mData: 'createdAtFormateada' },
          { mData: 'peso' }                            
          ];
      });
    };
    $scope.getPesos();
   
    $scope.getEntradas = function () {
      $scope.tratamientos=null;
      $http.get('http://localhost:1337/tratamiento/?idArticulo='+MyService.data.articuloConsultado.id).then(function (resp) {
        $scope.tratamientos = resp.data.results;
        var bandera="";
        var bandera2="";
        $scope.tratamientos2=[];
        var date = new Date();
        var mes = date.getMonth();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        var result = [];
        $scope.fechaInicio=$filter('date')(new Date(firstDay),'dd/MM/yyyy');
        $scope.fechaFin=$filter('date')(new Date(lastDay),'dd/MM/yyyy');
        var conversations = $scope.tratamientos;
        var start_date =  Date.parse(firstDay);
        var end_date = Date.parse(lastDay);
        end_date=end_date+86400000;

        if ($scope.tratamientos && $scope.tratamientos.length > 0){
          for (var i=0;i < $scope.tratamientos.length;i++){
            var conversationDate1 =  $scope.tratamientos[i].createdAt;
            var conversationDate=Date.parse(conversationDate1);
            if (conversationDate >= start_date && conversationDate <= end_date){
              result.push($scope.tratamientos[i]);
            }
            $scope.tratamientos2=result;
          }
        }
        for (var i  = 0; i<$scope.tratamientos2.length;i++){
          bandera = $scope.tratamientos2[i].createdAt;
          bandera2=$filter('date')(new Date(bandera),'dd/MM/yyyy');
          $scope.tratamientos2[i].createdAtFormateada=bandera2;
        }
        $scope.tratamientos2=$scope.tratamientos2.reverse();
        $scope.tbOptions5.data = $scope.tratamientos2;
        $scope.tbOptions5.aoColumns=[
          { mData: 'createdAtFormateada' },
          { mData: 'descripcion' },
          { mData: 'observaciones' },

          ];
      });
    };

    $scope.getEntradas();
 
    $scope.getDepartamentos = function () {
      $scope.departamentos=null;
      $http.get('http://localhost:1337/sumdepartamento/?idArticulo='+MyService.data.articuloConsultado.id).then(function (resp) {
        $scope.departamentos = resp.data.results;
        var bandera="";
        var bandera2="";
        $scope.departamentos2=[];
        var date = new Date();
        var mes = date.getMonth();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        var result = [];
        var conversations = $scope.departamentos;
        var start_date =  Date.parse(firstDay);
        var end_date = Date.parse(lastDay);
        end_date=end_date+86400000;

        if ($scope.departamentos && $scope.departamentos.length > 0){
          for (var i=0;i < $scope.departamentos.length;i++){
            var conversationDate1 =  $scope.departamentos[i].createdAt;
            var conversationDate=Date.parse(conversationDate1);
            if (conversationDate >= start_date && conversationDate <= end_date){
              result.push($scope.departamentos[i]);
            }
            $scope.departamentos2=result;
          }
        }
        for (var i  = 0; i<$scope.departamentos2.length;i++){
          bandera = $scope.departamentos2[i].createdAt;
          bandera2=$filter('date')(new Date(bandera),'dd/MM/yyyy');
          $scope.departamentos2[i].createdAtFormateada=bandera2;
        }
        $scope.departamentos2=$scope.departamentos2.reverse();
        $scope.tbOptions2.data = $scope.departamentos2;
        $scope.tbOptions2.aoColumns=[
          { mData: 'createdAtFormateada' },
          { mData: 'descripcion.descripcion' },
          { mData: 'descripcion.TipoDepartamento' },
          { mData: 'observaciones' }                              
          ];
      });
    };

    $scope.getDepartamentos();

    $scope.getMedicamentos = function () {
      $scope.medicamentos=null;
      $http.get('http://localhost:1337/summedicamento/?idArticulo='+MyService.data.articuloConsultado.id).then(function (resp) {
        $scope.medicamentos = resp.data.results;
        var bandera="";
        var bandera2="";
        $scope.medicamentos2=[];
        var date = new Date();
        var mes = date.getMonth();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        var result = [];
        var conversations = $scope.medicamentos;
        var start_date =  Date.parse(firstDay);
        var end_date = Date.parse(lastDay);
        end_date=end_date+86400000;

        if ($scope.medicamentos && $scope.medicamentos.length > 0){
          for (var i=0;i < $scope.medicamentos.length;i++){
            var conversationDate1 =  $scope.medicamentos[i].createdAt;
            var conversationDate=Date.parse(conversationDate1);
            if (conversationDate >= start_date && conversationDate <= end_date){
              result.push($scope.medicamentos[i]);
            }
            $scope.medicamentos2=result;
          }
        }
        for (var i  = 0; i<$scope.medicamentos2.length;i++){
          bandera = $scope.medicamentos2[i].createdAt;
          bandera2=$filter('date')(new Date(bandera),'dd/MM/yyyy');
          $scope.medicamentos2[i].createdAtFormateada=bandera2;
        }
        $scope.medicamentos2=$scope.medicamentos2.reverse();
        $scope.tbOptions3.data = $scope.medicamentos2;
        $scope.tbOptions3.aoColumns=[
          { mData: 'createdAtFormateada' },
          { mData: 'medicamento.descripcion' },
          { mData: 'medicamento.tipoMedicamento' },
          { mData: 'observaciones' }                              
          ];
      });
    };
    $scope.getMedicamentos();
     $scope.getAlimentos = function () {
      $scope.alimentos=null;
      $http.get('http://localhost:1337/sumalimento/?idArticulo='+MyService.data.articuloConsultado.id).then(function (resp) {
        $scope.alimentos = resp.data.results;
        var bandera="";
        var bandera2="";
        $scope.alimentos2=[];
        var date = new Date();
        var mes = date.getMonth();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        var result = [];
        var conversations = $scope.alimentos;
        var start_date =  Date.parse(firstDay);
        var end_date = Date.parse(lastDay);
        end_date=end_date+86400000;

        if ($scope.alimentos && $scope.alimentos.length > 0){
          for (var i=0;i < $scope.alimentos.length;i++){
            var conversationDate1 =  $scope.alimentos[i].createdAt;
            var conversationDate=Date.parse(conversationDate1);
            if (conversationDate >= start_date && conversationDate <= end_date){
              result.push($scope.alimentos[i]);
            }
            $scope.alimentos2=result;
          }
        }
        for (var i  = 0; i<$scope.alimentos2.length;i++){
          bandera = $scope.alimentos2[i].createdAt;
          bandera2=$filter('date')(new Date(bandera),'dd/MM/yyyy');
          $scope.alimentos2[i].createdAtFormateada=bandera2;
        }
        $scope.alimentos2=$scope.alimentos2.reverse();
        $scope.tbOptions7.data = $scope.alimentos2;
        $scope.tbOptions7.aoColumns=[
          { mData: 'createdAtFormateada' },
          { mData: 'descripcion.descripcion' },
          { mData: 'descripcion.tipoAlimento' },
          { mData: 'observaciones' }                              
          ];
      });
    };

    $scope.getAlimentos();

    $scope.getSaltos = function () {
      $scope.saltos=null;
      $http.get('http://localhost:1337/salto/?idArticulo='+MyService.data.articuloConsultado.id).then(function (resp) {
        $scope.saltos = resp.data.results;
        var bandera="";
        var bandera2="";
        $scope.saltos2=[];
        var date = new Date();
        var mes = date.getMonth();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        var result = [];
        var conversations = $scope.saltos;
        var start_date =  Date.parse(firstDay);
        var end_date = Date.parse(lastDay);
        end_date=end_date+86400000;

        if ($scope.saltos && $scope.saltos.length > 0){
          for (var i=0;i < $scope.saltos.length;i++){
            var conversationDate1 =  $scope.saltos[i].createdAt;
            var conversationDate=Date.parse(conversationDate1);
            if (conversationDate >= start_date && conversationDate <= end_date){
              result.push($scope.saltos[i]);
            }
            $scope.saltos2=result;
          }
        }
        for (var i  = 0; i<$scope.saltos2.length;i++){
          bandera = $scope.saltos2[i].createdAt;
          bandera2=$filter('date')(new Date(bandera),'dd/MM/yyyy');
          $scope.saltos2[i].createdAtFormateada=bandera2;
        }
        $scope.saltos2=$scope.saltos2.reverse();
        $scope.tbOptions4.data = $scope.saltos2;
        $scope.tbOptions4.aoColumns=[
          { mData: 'createdAtFormateada' },
          { mData: 'macho.nombre' },
          { mData: 'observaciones' }                              
          ];
      });
    };

    $scope.getSaltos();

    $scope.getPromedio =function(){
      $scope.ordenosPromedio=null;
      $http.get('http://localhost:1337/ordeno').then(function (resp) {
        $scope.ordenosPromedio = resp.data.results;
        $scope.sumaTotal=0;
        $scope.promedioTotal=0;
        for (var i= 0; i < $scope.ordenosPromedio.length; i++){
          $scope.sumaTotal = $scope.sumaTotal +  $scope.ordenosPromedio[i].cantidad;
        } 
        $scope.promedioTotal=$scope.sumaTotal/($scope.ordenosPromedio.length);
        // alert("suma total:"+$scope.ordenosPromedio.length);
      }); 
    };

    $scope.getPromedio();

    $scope.getDepartamentos2 = function () {
    $scope.departamentosSegundo=null;
    $http.get('http://localhost:1337/sumdepartamento/?idArticulo='+MyService.data.articuloConsultado.id).then(function (resp) {
      $scope.departamentosSegundo = resp.data.results;  
      var bandera="";
      var bandera2="";
      // $scope.departamentos2=[];
      var result2 = [];
      var conversations2 = $scope.departamentosSegundo;
      var start_date2 =  Date.parse($scope.fechaInicio) ;  
      var end_date2 = Date.parse($scope.fechaFin);   
      end_date2=end_date2+86400000;
      if ($scope.departamentosSegundo && $scope.departamentosSegundo.length > 0){
        var conversationDate =0;
        for (var i=0;i < $scope.departamentosSegundo.length;i++){
          conversationDate=Date.parse($scope.departamentosSegundo[i].createdAt);
          if (conversationDate >= start_date2 && conversationDate <= end_date2){
            result2.push($scope.departamentosSegundo[i]);
          }
          $scope.departamentos2=result2;   
        }
      }
      for (var i  = 0; i<$scope.departamentos2.length;i++){
        bandera = $scope.departamentos2[i].createdAt;
        bandera2=$filter('date')(new Date(bandera),'dd/MM/yyyy');
        $scope.departamentos2[i].createdAtFormateada=bandera2;
        }
      $scope.departamentos2=$scope.departamentos2.reverse();
      $scope.tbOptions2.data = $scope.departamentos2;
      $scope.tbOptions2.aaData = result2;
    });   
  };

    $scope.getSaltos2 = function () {
      $scope.saltosSegundo=null;
      $http.get('http://localhost:1337/salto/?idArticulo='+MyService.data.articuloConsultado.id).then(function (resp) {
        $scope.saltosSegundo = resp.data.results;  
        var bandera="";
        var bandera2="";
        // $scope.saltos2=[];
        var result2 = [];
        var conversations2 = $scope.saltosSegundo;
        var start_date2 =  Date.parse($scope.fechaInicio) ;  
        var end_date2 = Date.parse($scope.fechaFin);   
        end_date2=end_date2+86400000;
        if ($scope.saltosSegundo && $scope.saltosSegundo.length > 0){
          var conversationDate =0;
          for (var i=0;i < $scope.saltosSegundo.length;i++){
            conversationDate=Date.parse($scope.saltosSegundo[i].createdAt);
            if (conversationDate >= start_date2 && conversationDate <= end_date2){
              result2.push($scope.saltosSegundo[i]);
            }
            $scope.saltos2=result2;   
          }
        }
        for (var i  = 0; i<$scope.saltos2.length;i++){
          bandera = $scope.saltos2[i].createdAt;
          bandera2=$filter('date')(new Date(bandera),'dd/MM/yyyy');
          $scope.saltos2[i].createdAtFormateada=bandera2;
          }
        $scope.saltos2=$scope.saltos2.reverse();
        $scope.tbOptions4.data = $scope.saltos2;
        $scope.tbOptions4.aaData = result2;
      });   
    };


    $scope.getMedicamentos2 = function () {
      $scope.medicamentosSegundo=null;
      $http.get('http://localhost:1337/summedicamento/?idArticulo='+MyService.data.articuloConsultado.id).then(function (resp) {
        $scope.medicamentosSegundo = resp.data.results;  
        var bandera="";
        var bandera2="";
        // $scope.medicamentos2=[];
        var result2 = [];
        var conversations2 = $scope.medicamentosSegundo;
        var start_date2 =  Date.parse($scope.fechaInicio) ;  
        var end_date2 = Date.parse($scope.fechaFin);   
        end_date2=end_date2+86400000;
        if ($scope.medicamentosSegundo && $scope.medicamentosSegundo.length > 0){
          var conversationDate =0;
          for (var i=0;i < $scope.medicamentosSegundo.length;i++){
            conversationDate=Date.parse($scope.medicamentosSegundo[i].createdAt);
            if (conversationDate >= start_date2 && conversationDate <= end_date2){
              result2.push($scope.medicamentosSegundo[i]);
            }
            $scope.medicamentos2=result2;   
          }
        }
        for (var i  = 0; i<$scope.medicamentos2.length;i++){
          bandera = $scope.medicamentos2[i].createdAt;
          bandera2=$filter('date')(new Date(bandera),'dd/MM/yyyy');
          $scope.medicamentos2[i].createdAtFormateada=bandera2;
          }
        $scope.medicamentos2=$scope.medicamentos2.reverse();
        $scope.tbOptions3.data = $scope.medicamentos2;
        $scope.tbOptions3.aaData = result2;
      });   
    };

    $scope.getAlimentos2 = function () {
      $scope.alimentosSegundo=null;
      $http.get('http://localhost:1337/sumalimento/?idArticulo='+MyService.data.articuloConsultado.id).then(function (resp) {
        $scope.alimentosSegundo = resp.data.results;  
        var bandera="";
        var bandera2="";
   // $scope.alimentos2=[];
        var result2 = [];
        var conversations2 = $scope.alimentosSegundo;
        var start_date2 =  Date.parse($scope.fechaInicio) ;  
        var end_date2 = Date.parse($scope.fechaFin);   
        end_date2=end_date2+86400000;
        if ($scope.alimentosSegundo && $scope.alimentosSegundo.length > 0){
          var conversationDate =0;
          for (var i=0;i < $scope.alimentosSegundo.length;i++){
            conversationDate=Date.parse($scope.alimentosSegundo[i].createdAt);
            if (conversationDate >= start_date2 && conversationDate <= end_date2){
              result2.push($scope.alimentosSegundo[i]);
            }
            $scope.alimentos2=result2;   
          }
        }
        for (var i  = 0; i<$scope.alimentos2.length;i++){
          bandera = $scope.alimentos2[i].createdAt;
          bandera2=$filter('date')(new Date(bandera),'dd/MM/yyyy');
          $scope.alimentos2[i].createdAtFormateada=bandera2;
          }
        $scope.alimentos2=$scope.alimentos2.reverse();
        $scope.tbOptions7.data = $scope.alimentos2;
        $scope.tbOptions7.aaData = result2;
      });   
    };

    $scope.getEntradas2 = function () {
      $scope.tratamientosSegundo=null;
      $http.get('http://localhost:1337/tratamiento/?idArticulo='+MyService.data.articuloConsultado.id).then(function (resp) {
        $scope.tratamientosSegundo = resp.data.results;  
        var bandera="";
        var bandera2="";
        // $scope.tratamientos2=[];
        var result2 = [];
        var conversations2 = $scope.tratamientosSegundo;
        var start_date2 =  Date.parse($scope.fechaInicio) ;  
        var end_date2 = Date.parse($scope.fechaFin);   
        end_date2=end_date2+86400000;
        if ($scope.tratamientosSegundo && $scope.tratamientosSegundo.length > 0){
          var conversationDate =0;
          for (var i=0;i < $scope.tratamientosSegundo.length;i++){
            conversationDate=Date.parse($scope.tratamientosSegundo[i].createdAt);
            if (conversationDate >= start_date2 && conversationDate <= end_date2){
              result2.push($scope.tratamientosSegundo[i]);
            }
            $scope.tratamientos2=result2;   
          }
        }
        for (var i  = 0; i<$scope.tratamientos2.length;i++){
          bandera = $scope.tratamientos2[i].createdAt;
          bandera2=$filter('date')(new Date(bandera),'dd/MM/yyyy');
          $scope.tratamientos2[i].createdAtFormateada=bandera2;
          }
        $scope.tratamientos2=$scope.tratamientos2.reverse();
        $scope.tbOptions5.data = $scope.tratamientos2;
        $scope.tbOptions5.aaData = result2;
      });   
    };
      $scope.getPesos2 = function () {
    $scope.pesosSegundo=null;
    $http.get('http://localhost:1337/peso/?idArticulo='+MyService.data.articuloConsultado.id).then(function (resp) {
      $scope.pesosSegundo = resp.data.results;  
      var bandera="";
      var bandera2="";
     // $scope.pesos2=[];
      var result2 = [];
      var conversations2 = $scope.pesosSegundo;
      var start_date2 =  Date.parse($scope.fechaInicio) ;  
      var end_date2 = Date.parse($scope.fechaFin);   
      end_date2=end_date2+86400000;
      if ($scope.pesosSegundo && $scope.pesosSegundo.length > 0){
        var conversationDate =0;
        for (var i=0;i < $scope.pesosSegundo.length;i++){
          conversationDate=Date.parse($scope.pesosSegundo[i].createdAt);
          if (conversationDate >= start_date2 && conversationDate <= end_date2){
            result2.push($scope.pesosSegundo[i]);
          }
          $scope.pesos2=result2;   
        }
      }
      for (var i  = 0; i<$scope.pesos2.length;i++){
        bandera = $scope.pesos2[i].createdAt;
        bandera2=$filter('date')(new Date(bandera),'dd/MM/yyyy');
        $scope.pesos2[i].createdAtFormateada=bandera2;
        }
      $scope.pesos2=$scope.pesos2.reverse();
      $scope.tbOptions6.data = $scope.pesos2;
      $scope.tbOptions6.aaData = result2;
    }); 
     
  };


    $scope.getSalidas2 = function () {
    $scope.ordenosSegundo=null;
    $http.get('http://localhost:1337/ordeno/?idArticulo='+MyService.data.articuloConsultado.id).then(function (resp) {
      $scope.ordenosSegundo = resp.data.results;  
      var bandera="";
      var bandera2="";
      $scope.ordenos2=[];
      var result2 = [];
      var conversations2 = $scope.ordenosSegundo;
      var start_date2 =  Date.parse($scope.fechaInicio) ;  
      var end_date2 = Date.parse($scope.fechaFin);   
      end_date2=end_date2+86400000;
      if ($scope.ordenosSegundo && $scope.ordenosSegundo.length > 0){
        var conversationDate =0;
        for (var i=0;i < $scope.ordenosSegundo.length;i++){
          conversationDate=Date.parse($scope.ordenosSegundo[i].createdAt);
          if (conversationDate >= start_date2 && conversationDate <= end_date2){
            result2.push($scope.ordenosSegundo[i]);
          }
          $scope.ordenos2=result2;   
        }
      }
      for (var i  = 0; i<$scope.ordenos2.length;i++){
        bandera = $scope.ordenos2[i].createdAt;
        bandera2=$filter('date')(new Date(bandera),'dd/MM/yyyy');
        $scope.ordenos2[i].createdAtFormateada=bandera2;
        }
      $scope.ordenos2=$scope.ordenos2.reverse();
      $scope.tbOptions.data = $scope.ordenos2;
      $scope.tbOptions.aaData = result2;
    }); 
    $scope.getDepartamentos2(); 
    $scope.getMedicamentos2(); 
    $scope.getAlimentos2(); 
    $scope.getSaltos2();  
    $scope.getEntradas2(); 
    $scope.getPesos2();
  };
 
}]);
