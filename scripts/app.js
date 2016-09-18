(function () {
'use strict';

angular.module('Assignment1NgApp', [])

.controller('Assignment1Controller', function ($scope) {
  $scope.lunchList = "";
  $scope.totallunchitems = 0;

  $scope.caltotallunchitems = function () {    
    $scope.totallunchitems = $scope.lunchList.split(',').length;
  };

});


})();