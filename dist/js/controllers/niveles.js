'use strict';
app.controller('nivelesCtrl', ['$scope', '$http', '$filter', '$modal', 'MyService', 'filterFilter', function($scope, $http, $filter,$modal, MyService,filterFilter) {
$scope.nivel=MyService.data.nivel;
}]);
