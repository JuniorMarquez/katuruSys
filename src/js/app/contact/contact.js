
app.controller('ContactCtrl', ['$scope', '$http', '$filter', '$modal', 'MyService', 'filterFilter', function($scope, $http, $filter,$modal, MyService,filterFilter) {
  

  $scope.filter = '';

   $http.get('http://localhost:1339/genero').then(function (resp) {
    $scope.groups = resp.data;
// var numero = $scope.groups.length;
// $scope.numero=numero;
// MyService.data.numero=numero;
  });
   


$scope.carga = function(){
 $http.get('http://localhost:1339/genero').then(function (resp) {
    $scope.groups = resp.data;
 });
};

    $scope.open = function (item) {
 var identificador=item._id;
    MyService.data.identificador = identificador;
// alert("servicio: " +MyService.data.identificador);
 // $http.get('http://localhost:1339/cancion/?idDisco='+MyService.data.identificador).then(function (resp) {
 //    $scope.canciones = resp.data;
 //  });
     
      // var ident = identificador;
       //alert("id:" +identificador);
      var modalInstance = $modal.open({
        templateUrl: 'myModalContent.html',
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
    //  $scope.ok = function (item) {

    //   $http.post('http://localhost:1339/api/cancion/' ,item);
    //   $modalInstance.close($scope.selected.item);
    // };
   

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
        // $scope.refreshGroups = function(group) {
         
        // return $http.get(
        //   'http://localhost:1339/api/genero'
        
        // ).then(function(response) {
        //   $scope.groups = response.data.results;
        // });
        // };

  $scope.createGroup = function(){
    var group = {name: 'Nuevo Genero'};
    group.name = $scope.checkItem(group, $scope.groups, 'name');
    $scope.groups.push(group);
  };

  $scope.checkItem = function(obj, arr, key){
    var i=0;
    angular.forEach(arr, function(item) {
      if(item[key].indexOf( obj[key] ) == 0){
        var j = item[key].replace(obj[key], '').trim();
        if(j){
          i = Math.max(i, parseInt(j)+1);
        }else{
          i = 1;
        }
      }
    });
    return obj[key] + (i ? ' '+i : '');
  };

  $scope.deleteGroup = function(item){

     $http.delete('http://localhost:1339/genero/'+item._id , item)
    $scope.groups.splice($scope.groups.indexOf(item), 1);
  };

  $scope.selectGroup = function(item){   

    MyService.data.genero=item.name;
    // alert("f"+item._id);
    angular.forEach($scope.groups, function(item) {
      item.selected = false;
    });
    $scope.group = item;
    $scope.group.selected = true;
    $scope.filter = item.name;
$http.get('http://localhost:1339/disco').then(function (resp) {
    $scope.items = resp.data;
 $scope.item = null;  
 document.getElementById('panel').style.visibility='hidden';
    // $scope.item = $filter('orderBy')($scope.items, 'genero')[0];
    $scope.item.selected = true;
  });

  
  };



  $scope.selectItem = function(item){    
    var identificador =item._id;
    MyService.data.identificador = identificador;
    angular.forEach($scope.items, function(item) {
      item.selected = false;
      item.editing = false;
    });
    $scope.item = item;
    // $scope.filter = item.id;
    // alert("iden"+item._id);
    // cancion.idDisco=item._id;

    $scope.item.selected = true;

      document.getElementById('panel').style.visibility='visible';
    // alert("id:" +item._id);

      $http.get('http://localhost:1339/cancion').then(function (resp) {
    $scope.canciones = resp.data;
    });
       // alert("pasado:"+item._id);
      var pas = item._id;
    $scope.cancionesFiltradas = $scope.canciones.filter(function (cancion) {
   
    return (cancion.idDisco == pas );
    // alert("tamaño"+$scope.cancionesFiltradas.length);
});
  

     


  };

  $scope.deleteItem = function(item){
    $http.delete('http://localhost:1339/disco/'+item._id , item)
    $scope.items.splice($scope.items.indexOf(item), 1);
    $scope.item = $filter('orderBy')($scope.items, 'nombre')[0];
    if($scope.item) $scope.item.selected = true;
  };

$scope.deleteCancion = function(cancion){
    $http.delete('http://localhost:1339/cancion/'+cancion._id , cancion)
    $scope.cancionesFiltradas.splice($scope.canciones.indexOf(cancion), 1);
    $scope.cancion = $filter('orderBy')($scope.canciones, 'nombre')[0];
    if($scope.cancion) $scope.cancion.selected = true;
  
  };
  $scope.createItem = function(){
    
    document.getElementById('boton').style.visibility='hidden';
    var item = {
     
      avatar:'img/a0.jpg'
    };
    $scope.items.push(item);
    $scope.selectItem(item);
    $scope.item.editing = true;
    $http.get('http://localhost:1339/genero').then(function (resp) {
    $scope.groups = resp.data;
 }); 

  };
    $scope.editCancion = function(cancion){

    if(cancion && cancion.selected){
      cancion.editing = true;
    }
  };


  $scope.editItem = function(item){

    if(item && item.selected){
      item.editing = true;
    }
  };
 $scope.doneEditing3 = function(cancion){
  // alert("nombre: " +item.nombre);
//  
  if (cancion.id){
     $http.put('http://localhost:1339/cancion/'+cancion.id , cancion)
   }
     else {
  $http.post('http://localhost:1339/cancion/' , cancion);
   }
   $scope.items = null;
    $scope.cancion = null;
    $scope.canciones = null;
    // $scope.item = $filter('orderBy')($scope.items, 'genero')[0];
    // $scope.item.selected = true;



  cancion.editing = false;
  };

  $scope.doneEditing2 = function(item){
  // alert("nombre: " +item.nombre);
  // var ident = item._id;
  // item._id =null;
  // alert("creado"+createdAt);
    // alert("g"+item._id);


 // MyService.data.idenGen= item._id;
 //    item._id=null;
 //    MyService.data.actualizado.name=item.name;

 //     $http.put('http://localhost:1339/genero/'+MyService.data.idenGen, MyService.data.actualizado);

 //   $scope.items = null;
 //    $scope.item = null;
 //    $scope.canciones = null;
 //    // $scope.item = $filter('orde


item.editing = false;
  var generoAct= {};

    MyService.data.idenGen= item._id;
    generoAct.name=item.name;
    item._id=null;
     generoAct.selected=item.selected;
        generoAct.editing=item.editing;
if (MyService.data.idenGen){
     $http.put('http://localhost:1339/genero/'+MyService.data.idenGen, generoAct)
}
else {
 $http.post('http://localhost:1339/genero/', generoAct)
    }
 $http.get('http://localhost:1339/genero').then(function (resp) {
    $scope.groups = resp.data;
 });

   $scope.items = null;
    $scope.item = null;
    $scope.canciones = null;
    // $scope.item = $filter('orderBy')($scope.items, 'genero')[0];
    // $scope.item.selected = true;



  
  };

  $scope.doneEditing = function(item){
  // alert("nombre: " +item.nombre);
  var discoAct = {};
  MyService.data.idenDisc=item._id;
  discoAct.nombre=item.nombre;
  discoAct.autor=item.autor;
  discoAct.genero=item.genero;
  discoAct.ubicacion=item.ubicacion;
  discoAct.avatar=item.avatar;
  // discoAct.ubicacion=item.ubicacion;
  if (MyService.data.idenDisc){
     $http.put('http://localhost:1339/disco/'+MyService.data.idenDisc , discoAct)
   }
  else {
    $http.post('http://localhost:1339/disco/', discoAct)

 // $http.get('http://localhost:1339/api/disco').then(function (resp) {
 //    $scope.items = resp.data.results;
 //    $scope.item = $filter('orderBy')($scope.items, 'genero')[0];
 //    $scope.item.selected = true;
 //  });

 //  $scope.filter = '';
  }
  $http.get('http://localhost:1339/genero').then(function (resp) {
    $scope.groups = resp.data;
// alert("grupos cargados" );
  document.getElementById('boton').style.visibility='visible';
  });


    $scope.items = null;
    $scope.item = null;
    $scope.canciones = null;
    // $scope.item = $filter('orderBy')($scope.items, 'genero')[0];
    // $scope.item.selected = true;



  item.editing = false;
  };

}]);
