
app.controller('AlimentoCtrl', ['$scope', '$state','$http', '$filter', '$modal', 'MyService', 'filterFilter', 'toaster',  function($scope,  $state ,$http, $filter,$modal, MyService, filterFilter, toaster) {
 
  

  // $scope.filter = '';
  // $scope.mensajePrenez = 'Registrar / anular estado de preñéz del articulo';
    
  // $scope.today = function() {
  //   $scope.fechaNacimiento = new Date();
  // };
 

  // $scope.clear = function () {
  //   $scope.fechaNacimiento = null;
  // };

  // // Disable weekend selection
  // $scope.disabled = function(date, mode) {
  //   return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  // };

  // $scope.toggleMin = function() {
  //   $scope.minDate = $scope.minDate ? null : new Date();
  // };
  // $scope.toggleMin();

  // $scope.open = function($event) {
  //   $event.preventDefault();
  //   $event.stopPropagation();

  //   $scope.opened = true;
  // };

  // $scope.dateOptions = {
  //   formatYear: 'yy',
  //   startingDay: 1,
  //   class: 'datepicker'
  // };

  // $scope.initDate = new Date('2016-15-20');
  // $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  // $scope.format = 'shortDate';

  // $scope.carga = function (){
  //   $http.get('http://localhost:1337/grupo/?idUsuario='+MyService.data.idUsuario).then(function (resp) {
  //     $scope.groups = resp.data.results;
  //   });
  // };
// $scope.selectGroup2 = function(item){  
// MyService.data.luz=null; 
//     MyService.data.grupo=item.grupo;
//     angular.forEach($scope.groups, function(item) {
//       item.selected = false;
//     });
//     $scope.group = item;
//     // $scope.group.selected = true;
//     $scope.filter = item.name;
//     $http.get('http://localhost:1337/articulo/?idUsuario='+MyService.data.idUsuario).then(function (resp) {
//       $scope.items = resp.data.results;
//       // $scope.item = null;  
//       // $scope.item.selected = true;
//     });
//     $scope.selectItem2(MyService.data.articulo);
//   };
$scope.selectItem2 = function(item){  

     $http.get('http://localhost:1337/articulo/?idUsuario='+MyService.data.idUsuario).then(function (resp) {
      $scope.items = resp.data.results;
      // $scope.item = null;  
      // $scope.item.selected = true;
    });
    var identificador =item.id;
        var numero =item.barcode;
        var nombre =item.nombre;
    MyService.data.hembra = nombre;
     MyService.data.numero = numero;
    MyService.data.identificador = identificador;
    angular.forEach($scope.items, function(item) {
      item.selected = true;
      item.editing = false;
    });
    $scope.item = item;
    if (item.sexo == 'Macho'){
      $scope.sexado = true;
    }
    if (item.sexo == 'Hembra'){
      $scope.sexado = false;
    }
     if (item.grupo == 'Vacas'){
      $scope.grupoValidado = true;
    }
 // if (item.grupo == 'Becerras'){
 //   $scope.alerts = [
 //  { type: 'danger', msg: 'Por su edad, este articulo debería estar en el grupo de las Vacas' }
 //  ];
 //    }




    else{
      $scope.grupoValidado = false;
    }

    $scope.item.selected = true;
    $http.get('http://localhost:1337/articulo/?idUsuario='+MyService.data.idUsuario).then(function (resp) {
      $scope.articuloes = resp.data.results;
    });
      
    // var pas = item.id;
    // $scope.articuloesFiltradas = $scope.articuloes.filter(function (articulo) {
    //   return (articulo.idArticulo == pas );
    // });

  };
// if ($state=='apps.articulo'){


// };
    if (MyService.data.luz){
        $scope.items = null;
        $scope.item=null;
        // var articulo = MyService.data.articulo;
        // alert("articulo:" +MyService.data.articulo.id);
        $scope.selectGroup2(MyService.data.articulo);
        // $scope.selectItem(articulo);
        MyService.data.luz=null;
        MyService.data.articulo=null;
    };


  // if (!$scope.items){
  //    $scope.items={};
  // };
 
  
  $http.get('http://localhost:1337/grupo/?idUsuario='+MyService.data.idUsuario).then(function (resp) {
    $scope.groups = resp.data.results;
  });



  // $scope.alerts = [
  // { type: 'danger', msg: 'Por su edad, este articulo debería estar en el grupo de las Vacas' }
  // ];

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };
  $scope.pop2 = function(){
    toaster.pop($scope.toaster.type3, $scope.toaster.title3, $scope.toaster.text3);
  };
  $scope.pop3 = function(){
    toaster.pop($scope.toaster.type4, $scope.toaster.title4, $scope.toaster.text4);
  };
  $scope.pop4 = function(){
    toaster.pop($scope.toaster.type5, $scope.toaster.title5, $scope.toaster.text5);
  };
  $scope.pop8 = function(){
    toaster.pop($scope.toaster.type8, $scope.toaster.title8, $scope.toaster.text8);
  };
  $scope.pop6 = function(){
    if ($scope.item.prenez == true){
      toaster.pop($scope.toaster.type6, $scope.toaster.title6, $scope.toaster.text6);
      }
    if ($scope.item.prenez == false){
      toaster.pop($scope.toaster.type7, $scope.toaster.title7, $scope.toaster.text7);
      }
  };    
  $scope.pop = function(){
    if ($scope.item.estado == true){
      toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
    }
    if ($scope.item.estado == false){
      toaster.pop($scope.toaster.type2, $scope.toaster.title2, $scope.toaster.text2);
    }
  };

  $scope.consultar = function(item){
  MyService.data.articuloConsultado = null;
  MyService.data.articuloConsultado = item;
  if (MyService.data.articuloConsultado.sexo==="Hembra"){
    $state.go('apps.historicoArticulo');
    }
  if (MyService.data.articuloConsultado.sexo==="Macho"){
    $state.go('apps.historicoArticuloMacho');
    }
  };
  $scope.carga = function(){
    $http.get('http://localhost:1337/grupo/?idUsuario='+MyService.data.idUsuario).then(function (resp) {
      $scope.groups = resp.data.results;
    });
  };
  $http.get('http://localhost:1337/raza/?idUsuario='+MyService.data.idUsuario).then(function (resp) {
      $scope.razas = resp.data.results;
    });
 $scope.cargaAlimentos = function(){
      $http.get('http://localhost:1337/alimento/?idUsuario='+MyService.data.idUsuario).then(function (resp) {
        $scope.alimentos = resp.data.results;
      });
    };
    $scope.cargaAlimentos();

  
  $scope.openConfirm = function (item) {
    var identificador=item.id;
    MyService.data.identificador = identificador;
      var modalInstance = $modal.open({
        templateUrl: 'modalConfirm.html',
        controller: 'ModalInstanceCtrl',
        size: 'sm',
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });
    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
        $scope.item = null;  
        $scope.pop2();
        
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
  $scope.openConfirm2 = function (item) {
    var identificador=item.id;
    MyService.data.identificador = identificador;
      var modalInstance = $modal.open({
        templateUrl: 'modalConfirm2.html',
        controller: 'ModalInstanceCtrl',
        size: 'sm',
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
       $scope.groups.splice($scope.groups.indexOf(item), 1);
        $scope.item = null;  
        $scope.pop8();
        
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.openDepartamento = function (item) {
    var identificador=item.id;
    MyService.data.identificador = identificador;
      var modalInstance = $modal.open({
        templateUrl: 'modalDepartamento.html',
        controller: 'ModalInstanceCtrl',
        size: 'sm',
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });
    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
  $scope.openSumDepartamento = function (item) {
    var identificador=item.id;
    MyService.data.identificador = identificador;
      var modalInstance = $modal.open({
        templateUrl: 'modalSumDepartamento.html',
        controller: 'ModalInstanceCtrl',
        size: 'sm',
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });
    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
   $scope.openSumAlimento = function (item) {
    var identificador=item.id;
    MyService.data.identificador = identificador;
      var modalInstance = $modal.open({
        templateUrl: 'modalSumAlimento.html',
        controller: 'ModalInstanceCtrl',
        size: 'lg',
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });
    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
  $scope.openSumMedicamento = function (item) {
    var identificador=item.id;
    MyService.data.identificador = identificador;
      var modalInstance = $modal.open({
        templateUrl: 'modalSumMedicamento.html',
        controller: 'ModalInstanceCtrl',
        size: 'lg',
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });
    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.openSalto = function (item) {
    var identificador=item.id;
    MyService.data.identificador = identificador;
      var modalInstance = $modal.open({
        templateUrl: 'modalSalto.html',
        controller: 'ModalInstanceCtrl',
        size: 'sm',
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });
    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.openEntrada = function (item) {
    var identificador=item.id;
    MyService.data.identificador = identificador;
      var modalInstance = $modal.open({
        templateUrl: 'modalEntrada.html',
        controller: 'ModalInstanceCtrl',
        size: 'sm',
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });
    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
 
  $scope.openSalida = function (item) {
    var identificador=item.id;
    MyService.data.identificador = identificador;
      var modalInstance = $modal.open({
        templateUrl: 'modalSalida.html',
        controller: 'ModalInstanceCtrl',
        size: 'sm',
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });
    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
  $scope.openParto = function (item) {
    var identificador=item.id;
    MyService.data.identificador = identificador;
      var modalInstance = $modal.open({
        templateUrl: 'modalParto.html',
        controller: 'ModalInstanceCtrl',
        size: 'sm',
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });
    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
 
  $scope.disabled = undefined;
  $scope.searchEnabled = undefined;

  $scope.enable = function() {
    $scope.disabled = false;
  };

  $scope.disable = function() {
    $scope.disabled = true;
  };

  $scope.enableSearch = function() {
    $scope.searchEnabled = true;
  }

  $scope.disableSearch = function() {
    $scope.searchEnabled = false;
  }

  $scope.clear = function() {
    $scope.person.selected = undefined;
    $scope.address.selected = undefined;
    $scope.country.selected = undefined;
  };

  // $scope.createGroup = function(){
  //   var group = {name: 'Nuevo grupo'};          
  //   group.name = $scope.checkItem(group, $scope.groups, 'name');
  //   group.idUsuario = MyService.data.idUsuario;
  //   // alert("dato: "+group.idUsuario);
  //   $scope.groups.push(group);
  // };

  // $scope.checkItem = function(obj, arr, key){
  //   var i=0;
  //   angular.forEach(arr, function(item) {
  //     if(item[key].indexOf( obj[key] ) == 0){
  //       var j = item[key].replace(obj[key], '').trim();
  //       if(j){
  //         i = Math.max(i, parseInt(j)+1);
  //       }else{
  //         i = 1;
  //       }
  //     }
  //   });
  //   return obj[key] + (i ? ' '+i : '');
  // };

  // $scope.deleteGroup = function(item){
  //   $http.delete('http://localhost:1337/grupo/'+item.id , item)
  //   $scope.groups.splice($scope.groups.indexOf(item), 1);
  // };


$http.get('http://localhost:1337/alimento/?idUsuario='+MyService.data.idUsuario).then(function (resp) {
      $scope.items = resp.data.results;
      $scope.item = null;  
      // $scope.item.selected = true;
    });

  // $scope.selectGroup = function(item){   
  //   MyService.data.grupo=item.name;
  //   angular.forEach($scope.groups, function(item) {
  //     item.selected = false;
  //   });
  //   $scope.group = item;
  //   $scope.group.selected = true;
  //   $scope.filter = item.name;
  //   $http.get('http://localhost:1337/articulo/?idUsuario='+MyService.data.idUsuario).then(function (resp) {
  //     $scope.items = resp.data.results;
  //     $scope.item = null;  
  //     // $scope.item.selected = true;
  //   });
  // };
   
  


  $scope.selectItem = function(item){    
        var identificador =item.id;
        var numero =item.barcode;
        var nombre =item.nombre;
        MyService.data.hembra = nombre;
        MyService.data.numero = numero;
        MyService.data.identificador = identificador;
        angular.forEach($scope.items, function(item) {
        item.selected = false;
        item.editing = false;
        });



    // $scope.item = item;
    // if (item.sexo == 'Macho'){
    //   $scope.sexado = true;
    // }
    // if (item.sexo == 'Hembra'){
    //   $scope.sexado = false;
    // }
    //  if (item.grupo == 'Vacas'){
    //   $scope.grupoValidado = true;
    // }
    // else{
    //   $scope.grupoValidado = false;
    // }

    $scope.item.selected = true;
    $http.get('http://localhost:1337/alimento/?idUsuario='+MyService.data.idUsuario).then(function (resp) {
      $scope.alimento = resp.data.results;
    });
      
    // var pas = item.id;
    // $scope.articuloesFiltradas = $scope.articuloes.filter(function (articulo) {
    //   return (articulo.idArticulo == pas );
    // });
  };

  $scope.deleteItem = function(item){
    $http.delete('http://localhost:1337/articulo/'+item.id , item)
    $scope.items.splice($scope.items.indexOf(item), 1);
    $scope.item = $filter('orderBy')($scope.items, 'nombre')[0];
    if($scope.item) $scope.item.selected = true;
  };

  $scope.deleteAlimento = function(articulo){
    $http.delete('http://localhost:1337/alimento/'+alimento.id , alimento)
    $scope.alimentosFiltradas.splice($scope.alimentos.indexOf(alimento), 1);
    $scope.alimento = $filter('orderBy')($scope.alimentoes, 'nombre')[0];
    if($scope.alimento) $scope.alimento.selected = true;
  };

  $scope.createItem = function(){
    var item = {
      descripcion:'', 
      mensajeNuevo:"Presione \"Editar\" para ingresar datos",
      fechaNacimiento:"Por ingresar",
      idUsuario: MyService.data.idUsuario
    };
    
    $scope.items.push(item);
    $scope.selectItem(item);
    $scope.item.editing = true;
    
    $scope.item.mensajeNuevo=null;
    $scope.item.idUsuario = MyService.data.idUsuario;
   
  };

  // $scope.createItem = function(){
  //   var item = {
  //     avatar:'img/cow.png'
  //   };
  //   $scope.items.push(item);
  //   $scope.selectItem(item);
  //   $scope.item.editing = true;
  //   $scope.item.sexo = 'Hembra';
  //   $scope.item.fechaNacimiento = '.';
  //   $scope.item.estado = true;
  //   $scope.item.prenez = false;
  //   $scope.item.control=true;
  //   $scope.item.idUsuario = MyService.data.idUsuario;
  //   $http.get('http://localhost:1337/grupo/?idUsuario='+MyService.data.idUsuario).then(function (resp) {
  //   $scope.groups = resp.data.results;
  //   }); 
  // };
  
  $scope.editItem = function(item){
    if(item && item.selected){
      item.editing = true;
    }
  };

  
  $scope.doneEditingAlimento = function(item){
    var alimentoAct = {};
    MyService.data.idenAlimento=item.id;

    alimentoAct.nombre=item.nombre;
    alimentoAct.idUsuario=item.idUsuario;


    

  
    if (MyService.data.idenAlimento){
      $scope.pop4();
      $http.put('http://localhost:1337/alimento/'+MyService.data.idenAlimento , alimentoAct)
    }
    else {
      $scope.pop3();;
      $http.post('http://localhost:1337/alimento/', alimentoAct)
    }
    $scope.items = null;
    $scope.alimentos = null;
    $scope.item=null;
    item.editing = false;
  };
 


}]);
